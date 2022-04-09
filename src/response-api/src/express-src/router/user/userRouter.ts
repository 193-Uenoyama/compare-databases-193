import { 
  Request, 
  Response, 
  NextFunction, 
  Router 
} from 'express';
import { body, validationResult } from 'express-validator';
import validator from 'validator';

import db from '@/sequelize-src/models/index';
import { elasticUserAttributes, userAttributes, User } from '@/sequelize-src/models/user';
import { baseResponse, validErrorResponse, cutUndefinedOutOfAnArgument } from '@/express-src/router/_modules';
import { APPMSG } from '@/express-src/modules/validation/validationMessages';

export const userRouter: Router = Router();

/** create a User ******************************************
 *
 * 送られてきたデータでユーザを作成
 *
 * @param req.body.firstName: string
 * @param req.body.lastName: string
 * @param req.body.email: string
 * @param req.body.introduction: string | undefined,
 *
 **********************************************************/
interface createUserResponse extends baseResponse {
  created_user: userAttributes; 
}
userRouter.post(
  '/create', 

  //validation
  body('firstName').notEmpty().withMessage(APPMSG.User.require.firstName),
  body('lastName').notEmpty().withMessage(APPMSG.User.require.lastName),
  body('email')
    .notEmpty()
    .withMessage(APPMSG.User.require.email)
    .bail()
    .isEmail()
    .withMessage(APPMSG.User.regular.email),

  async function(req: Request, res: Response<createUserResponse | validErrorResponse>, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array(),
        is_success: false,
      });
      return;
    }

    // 送られてきたデータを格納。
    let user_request_data: elasticUserAttributes = {
      firstName: req.body.firstName || undefined,
      lastName: req.body.lastName || undefined,
      email: req.body.email || undefined,
      introduction: req.body.introduction || undefined,
    }
    // undefinedのデータを削除
    let create_data: elasticUserAttributes = cutUndefinedOutOfAnArgument(user_request_data);

    let created_user;
    try {
      created_user = await db.Users.calculateTimeOfCreate(
        req.process_logging.log_detail, 
        create_data, {})
    }
    catch(err){
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      created_user: created_user,
      is_success: true,
    });
    next();
  }
);


/** read Users table ***************************************
 *
 * 全てのユーザを検索して返す
 * 大きなデータの取り出しをしたいのでページングはしない
 *
 * @param req.body: {}
 *
 ***********************************************************/
interface readUserResponse extends baseResponse {
  readed_users: Array< userAttributes >
}
userRouter.post(
  '/read', 

  async function(req: Request, res: Response<readUserResponse>, next: NextFunction) {
  let readed_users: User[]
  try{
    readed_users = await db.Users.calculateTimeOfFindAll(
      req.process_logging.log_detail, {})
  }
  catch(err) {
    console.log(err);
    next(err);
    return;
  }

  res.status(200).json({ 
    readed_users: readed_users,
    is_success: true,
  })
  next();
});


/** update a User ******************************************
 *
 * リクエストを受けたuserIdを持つユーザを更新する。
 *
 * @param req.body.userId: number
 * @param req.body.firstName: string | undefined
 * @param req.body.lastName: string | undefined
 * @param req.body.email: string | undefined
 * @param req.body.introduction: string | undefined
 *
 ***********************************************************/
interface updateUserResponse extends baseResponse {
  updated_user: userAttributes;
}
userRouter.post(
  '/update', 

  // = Validation ================================
  // 空か判定した後、型を判定
  body('userId')
    .notEmpty()
    .withMessage(APPMSG.User.require.userId)
    .bail()
    .isInt()
    .withMessage(APPMSG.User.regular.userId),

  // userId以外のパラメータはどれか一つでも存在すること
  body('entire').custom(( value, {req} ) => {
    if (
      typeof req.body.firstName == 'undefined' &&
      typeof req.body.lastName == 'undefined' &&
      typeof req.body.email == 'undefined' &&
      typeof req.body.introduction == 'undefined'
    ) {
      throw new Error();
    }
    return true;
  }).withMessage(APPMSG.General.notEvenTheMinimum),

  // emailが存在する場合のみemailのフォーマットをチェックをする
  body('email').custom(value => {
    if (typeof value == 'undefined') return true
    if (validator.isEmail(value)) return true 
    throw new Error();
  }).withMessage(APPMSG.User.regular.email),


  // = Processing ================================
  async function(req: Request, res: Response<updateUserResponse | validErrorResponse>, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array(),
        is_success: false,
      });
      return;
    }

    // 送られてきたデータを格納。
    let user_request_data: elasticUserAttributes = {
      firstName: req.body.firstName || undefined,
      lastName: req.body.lastName || undefined,
      email: req.body.email || undefined,
      introduction: req.body.introduction || undefined,
    }
    // undefinedのデータを削除
    let update_data: elasticUserAttributes = cutUndefinedOutOfAnArgument(user_request_data);

    try { 
      await db.Users.calculateTimeOfUpdate(
        req.process_logging.log_detail,
        update_data ,
        { where: { userId: req.body.userId, } }
      )
    }
    catch(err){
      console.log(err);
      next(err);
      return;
    }

    // 更新されたユーザを取得
    let updated_user: User 
    try{ 
      updated_user = await db.Users.findOne({
        where: {
          userId: req.body.userId
        }
      }) 
    }
    catch(err){
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      updated_user: updated_user,
      is_success: true,
    })
    next();
  }
);


/** delete user ********************************************
 *
 * リクエストを受けたuserIdを持つユーザを削除する
 * 
 * @param req.body.userId: number
 *
 ***********************************************************/
interface deleteUserResponse extends baseResponse {
  deleted_user: userAttributes;
}
userRouter.post(
  '/delete', 

  body('userId')
    .notEmpty()
    .withMessage(APPMSG.User.require.userId)
    .bail()
    .isInt()
    .withMessage(APPMSG.User.regular.userId),

  async function(req: Request, res: Response<deleteUserResponse | validErrorResponse>, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array(),
        is_success: false,
      });
      return;
    }

    // 削除対象のユーザを取り出す。
    let deletion_user;
    try {
      deletion_user = await db.Users.findOne({
        where: {
          userId: req.body.userId
        }
      });
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    // ユーザを削除する
    try {
      await db.Users.calculateTimeOfDestroy(
        req.process_logging.log_detail, {
        where: {
          userId: req.body.userId
        }
      })
    }
    catch(err){
      console.log(err);
      next(err);
      return;
    }  

    res.status(200).json({
      deleted_user: deletion_user,
      is_success: true,
    });
    next();
  }
);

