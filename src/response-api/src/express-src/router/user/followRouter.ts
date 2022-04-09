import { 
  Request, 
  Response, 
  NextFunction, 
  Router } from 'express'
import { param, body, validationResult } from 'express-validator';
import db from '@/sequelize-src/models/index'
import { baseResponse, validErrorResponse, cutUndefinedOutOfAnArgument } from '@/express-src/router/_modules';
import { APPMSG } from '@/express-src/modules/validation/validationMessages';
import { userAttributes, User } from '@/sequelize-src/models/user';

export const followRouter: Router = Router();

/** create follow ******************************************
 *
 * followedUserをfollowingUserがフォローする
 *
 * @param req.body.followedUserId: number
 * @param req.body.followerUserId: number
 *
 **********************************************************/
interface createFollowResponse extends baseResponse {
  created_follow: userAttributes;
}
followRouter.post(
  '/create',

  body('followedUserId')
    .notEmpty()
    .withMessage(APPMSG.Follows.require.followedUserId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Follows.regular.followedUserId),

  body('followerUserId')
    .notEmpty()
    .withMessage(APPMSG.Follows.require.followerUserId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Follows.regular.followerUserId),

  async function(req: Request, res: Response<createFollowResponse | validErrorResponse>, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array(),
        is_success: false,
      });
      return;
    }

    let group_request_data = {
      followedUserId: req.body.followedUserId,
      followerUserId: req.body.followerUserId
    }
    // undefinedのデータを削除
    let create_data = cutUndefinedOutOfAnArgument(group_request_data);

    let result;
    try {
      result = await db.Follows.calculateTimeOfCreate(
        req.process_logging.log_detail, 
        create_data
      );
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      created_follow: result,
      is_success: true,
    });
    next();
  }
)


/** read follower ******************************************
 *
 * 対象ユーザ(followedUser)をフォローしているユーザを取り出す
 *
 * @param req.body.followedUserId: number
 *
 **********************************************************/
interface readFollowerResponse extends baseResponse {
  followers: userAttributes,
}
followRouter.post(
  '/read/getfollower',

  body('followedUserId')
    .notEmpty()
    .withMessage(APPMSG.Follows.require.followedUserId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Follows.regular.followedUserId),

  async function(req: Request, res: Response<readFollowerResponse | validErrorResponse>, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array(),
        is_success: false,
      });
      return;
    }

    let targetUser: User;
    try {
      targetUser = await db.Users.calculateTimeOfFindOne( req.process_logging.log_detail, {
        where: {
          userId: req.body.followedUserId,
        },
        include: [ 'Follower' ],
      });
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      followers: targetUser,
      is_success: true,
    });
    next();
  }
)


/** read follower ******************************************
 *
 * 対象ユーザ(followerUser)がフォローしているユーザを取り出す
 *
 * @param req.body.followerUserId: number
 *
 **********************************************************/
interface readFollowedResponse extends baseResponse {
  followeds: userAttributes,
}
followRouter.post(
  '/read/getfollowed',

  body('followerUserId')
    .notEmpty()
    .withMessage(APPMSG.Follows.require.followerUserId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Follows.regular.followerUserId),

  async function(req: Request, res: Response<readFollowedResponse | validErrorResponse>, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array(),
        is_success: false,
      });
      return;
    }

    let targetUser: User;
    try {
      targetUser = await db.Users.calculateTimeOfFindOne( req.process_logging.log_detail, {
        where: {
          userId: req.body.followerUserId,
        },
        include: [ 'Followed' ],
      });
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      followeds: targetUser,
      is_success: true,
    });
    next();
  }
)


/** read belongsToGroup members count **********************
 *
 * groupMembersテーブルのレコード数を返却する
 *
 **********************************************************/
interface readFollowsCountResponse extends baseResponse {
  follows_count: number,
}
followRouter.post(
  '/read/rows', 

  async function(req: Request, res: Response<readFollowsCountResponse | validErrorResponse>, next: NextFunction) {
    let follows_count: number;
    try {
      follows_count = await db.Follows.count({});
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      follows_count: follows_count,
      is_success: true,
    });
    next();
  }
);


/** delete follow ******************************************
 *
 * followingUserがfollowedUserのフォローを外す
 *
 * @param req.body.followedUserId: number
 * @param req.body.followerUserId: number
 *
 **********************************************************/
// TODO 要素の名前変える
interface deleteFollowResponse extends baseResponse {
  deleted_followed: userAttributes,
}
followRouter.post(
  '/delete',

  body('followedUserId')
    .notEmpty()
    .withMessage(APPMSG.Follows.require.followedUserId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Follows.regular.followedUserId),

  body('followerUserId')
    .notEmpty()
    .withMessage(APPMSG.Follows.require.followerUserId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Follows.regular.followerUserId),

  async function(req: Request, res: Response<deleteFollowResponse | validErrorResponse>, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array(),
        is_success: false,
      });
      return;
    }

    let result;
    try {
      result = await db.Follows.calculateTimeOfDestroy(req.process_logging.log_detail,{
        where: {
          followedUserId: req.body.followedUserId,
          followerUserId: req.body.followerUserId
        }
      });
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      deleted_followed: result,
      is_success: true,
    });
    next();
  }
)
