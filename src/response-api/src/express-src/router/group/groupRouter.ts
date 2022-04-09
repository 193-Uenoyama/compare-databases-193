import { 
  Request, 
  Response, 
  NextFunction, 
  Router } from 'express'
import { body, validationResult } from 'express-validator';

import db from '@/sequelize-src/models/index'
import { baseResponse, validErrorResponse, cutUndefinedOutOfAnArgument } from '@/express-src/router/_modules';
import { elasticGroupAttributes, GroupAttributes, Group } from '@/sequelize-src/models/group';
import { APPMSG } from '@/express-src/modules/validation/validationMessages';

export const groupRouter: Router = Router();


/** create a Group *****************************************
 *
 * 送られてきたデータでグループを作成
 *
 * @param req.body.groupName: string
 * @param req.body.groupIntroduction?: string
 *
 **********************************************************/
interface createGroupResponse extends baseResponse {
  created_group: GroupAttributes
}
groupRouter.post(
  '/create', 

  body('groupName').notEmpty().withMessage(APPMSG.Group.require.groupName),

  async function(req: Request, res: Response<createGroupResponse | validErrorResponse>, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array(),
        is_success: false,
      });
      return;
    }

    let group_request_data: elasticGroupAttributes = {
      groupName: req.body.groupName,
      groupIntroduction: req.body.groupIntroduction || undefined,
    }
    // undefinedのデータを削除
    let create_data: elasticGroupAttributes = cutUndefinedOutOfAnArgument(group_request_data);

    let created_group: Group
    try{
      created_group = await db.Groups.calculateTimeOfCreate(req.process_logging.log_detail, create_data, {})
    }
    catch(err) {
      console.log(err);
      next(err);
      return
    }

    res.status(200).json({
      created_group: created_group,
      is_success: true,
    });
    next();
  }
)


/** read Groups table **************************************
 *
 * 全てのグループを検索して返す
 * 大きなデータの取り出しをしたいのでページングはしない
 *
 * @param req.body: {}
 *
 ***********************************************************/
interface readGroupResponse extends baseResponse {
  readed_groups: Array< GroupAttributes >
}
groupRouter.post(
  '/read', 

  async function(req: Request, res: Response<readGroupResponse | validErrorResponse>, next: NextFunction) {
    let readed_groups: Group[];
    try{
      readed_groups = await db.Groups.calculateTimeOfFindAll(
        req.process_logging.log_detail, {})
    }
    catch(err){
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({ 
      readed_groups: readed_groups,
      is_success: true 
    })
    next();
  }
)


/** update a Group *****************************************
 *
 * リクエストを受けたgroupIdを持つグループを更新する。
 *
 * @param req.body.groupId: number
 * @param req.body.groupName: string | undefined
 * @param req.body.groupIntroduction: string | undefined
 *
 ***********************************************************/
interface updateGroupResponse extends baseResponse {
  updated_group: GroupAttributes
}
groupRouter.post(
  '/update', 

  // = Validation ================================
  // 空か判定した後、型を判定
  body('groupId')
    .notEmpty()
    .withMessage(APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Group.regular.groupId),

  // groupId以外のパラメータはどれか一つでも存在すること
  body('entire').custom(( value, {req} ) => {
    if (
      typeof req.body.groupName == 'undefined' &&
      typeof req.body.groupIntroduction == 'undefined'
    ) {
      throw new Error();
    }
    return true;
  }).withMessage(APPMSG.General.notEvenTheMinimum),

  // = Processing ================================
  async function(req: Request, res: Response<updateGroupResponse | validErrorResponse>, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array(),
        is_success: false,
      });
      return;
    }

    // 送られてきたデータを格納。
    let group_request_data: elasticGroupAttributes = {
      groupName: req.body.groupName || undefined,
      groupIntroduction: req.body.groupIntroduction || undefined,
    }
    // undefinedのデータを削除
    let update_data: elasticGroupAttributes = cutUndefinedOutOfAnArgument(group_request_data);

    // 更新
    try{
      await db.Groups.calculateTimeOfUpdate( req.process_logging.log_detail, update_data ,{
        where: {
          groupId: req.body.groupId,
        }
      })
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    // 更新されたグループを取得
    let updated_group: Group 
    try{
      updated_group = await db.Groups.findOne({
        where: {
          groupId: req.body.groupId,
        }
      })
    }
    catch(err){
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      updated_group: updated_group,
      is_success: true,
    })
    next();
  }
)


/** delete a group *****************************************
 *
 * リクエストを受けたuserIdを持つユーザを削除する
 * 
 * @param req.body.groupId: number
 *
 ***********************************************************/
interface deleteGroupResponse extends baseResponse {
  deleted_group: GroupAttributes
}
groupRouter.post(
  '/delete', 

  body('groupId')
    .notEmpty()
    .withMessage(APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Group.regular.groupId),

  async function(req: Request, res: Response<deleteGroupResponse | validErrorResponse>, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array(),
        is_success: false,
      });
      return;
    }

    // 削除対象のグループを取り出す。
    let deletion_group: Group
    try{
      deletion_group = await db.Groups.findOne({
        where: {
          groupId: req.body.groupId
        }
      })
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    // グループを削除する
    try{
      await db.Groups.calculateTimeOfDestroy(req.process_logging.log_detail, {
        where: {
          groupId: req.body.groupId
        }
      })    
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      deleted_group: deletion_group,
      is_success: true,
    });
    next();
  }
)
