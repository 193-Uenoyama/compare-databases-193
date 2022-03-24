import { 
  Request, 
  Response, 
  NextFunction, 
  Router } from 'express'
import { param, body, validationResult } from 'express-validator';
import db from '@/sequelize-src/models/index'
import { reqMsg, cutUndefinedOutOfAnArgument } from '@/express-src/router/_modules';
import { APPMSG } from '@/express-src/modules/validation/validationMessages';
import { User } from '@/sequelize-src/models/user';

export const followRouter: Router = Router();

/** create follow ******************************************
 *
 * followedUserをfollowingUserがフォローする
 *
 * @param req.body.followedUserId: number
 * @param req.body.followerUserId: number
 *
 **********************************************************/
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

  async function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
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
      follow: result,
    });
  }
)


/** read follower ******************************************
 *
 * 対象ユーザ(followedUser)をフォローしているユーザを取り出す
 *
 * @param req.body.followedUserId: number
 *
 **********************************************************/
followRouter.get(
  '/read/getfollower/:followedUserId',

  param('followedUserId')
    .notEmpty()
    .withMessage(APPMSG.Follows.require.followedUserId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Follows.regular.followedUserId),

  async function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
      return;
    }

    let targetUser: User;
    try {
      targetUser = await db.Users.calculateTimeOfFindOne( req.process_logging.log_detail, {
        where: {
          userId: req.params.followedUserId,
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
      user: targetUser,
    });
  }
)


/** read follower ******************************************
 *
 * 対象ユーザ(followerUser)がフォローしているユーザを取り出す
 *
 * @param req.body.followerUserId: number
 *
 **********************************************************/
followRouter.get(
  '/read/getfollowed/:followerUserId',

  param('followerUserId')
    .notEmpty()
    .withMessage(APPMSG.Follows.require.followerUserId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Follows.regular.followerUserId),

  async function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
      return;
    }

    let targetUser: User;
    try {
      targetUser = await db.Users.calculateTimeOfFindOne( req.process_logging.log_detail, {
        where: {
          userId: req.params.followerUserId,
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
      user: targetUser,
    });
  }
)


/** delete follow ******************************************
 *
 * followingUserがfollowedUserのフォローを外す
 *
 * @param req.body.followedUserId: number
 * @param req.body.followerUserId: number
 *
 **********************************************************/
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

  async function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
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
      user: result,
    });
  }
)
