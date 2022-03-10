import { 
  Request, 
  Response, 
  NextFunction, 
  Router } from 'express'
import { param, body, validationResult } from 'express-validator';

import db from '@/sequelize-src/models/index'
import { reqMsg, cutUndefinedOutOfAnArgument } from '@/express-src/router/_modules';
import { GroupCommonAttributes, GroupAttributes, Group } from '@/sequelize-src/models/group';
import { User } from '@/sequelize-src/models/user';
import GroupMembers from '@/sequelize-src/models/groupmember';
import { APPMSG } from '@/express-src/modules/validation/validationMessages';

export const belongsToGroupRouter: Router = Router();

// TODO 型宣言ちゃんとするよん。あとで。
/** create belongsToGroup **********************************
 *
 * 送られてきたgroupIdのグループにuserIdのユーザを所属させる
 *
 * @param req.body.groupId: number
 * @param req.body.userId: number
 *
 **********************************************************/
belongsToGroupRouter.post(
  '/create', 

  body('userId')
    .notEmpty()
    .withMessage(APPMSG.User.require.userId)
    .bail()
    .isInt()
    .withMessage(APPMSG.User.regular.userId),

  body('groupId')
    .notEmpty()
    .withMessage(APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Group.regular.groupId),

  async function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
      return;
    }

    //TODO groupName を || undefined やめる
    let group_request_data = {
      groupId: req.body.groupId,
      memberId: req.body.userId
    }
    // undefinedのデータを削除
    let create_data = cutUndefinedOutOfAnArgument(group_request_data);

    let result;
    try {
      result = await db.GroupMembers.create(create_data);
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      group: result,
    });
  }
);


/** read belongsToGroup members ****************************
 *
 * 送られてきたgroupIdのグループに所属しているメンバーを返却
 *
 * @param req.body.groupId: number
 *
 **********************************************************/
belongsToGroupRouter.get(
  '/read/:groupId', 

  param('groupId')
    .notEmpty()
    .withMessage(APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Group.regular.groupId),

  async function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
      return;
    }

    let targetGroup: Group;
    try {
      targetGroup = await db.Groups.findOne({
        where: {
          groupId: req.params.groupId,
        },
        include: [ db.Users ],
      });
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      group: targetGroup,
    });
  }
);


/** delete belongsToGroup **********************************
 *
 * 送られてきたデータでグループを作成
 *
 * @param req.body.groupId: number
 * @param req.body.userId: number
 *
 **********************************************************/
belongsToGroupRouter.post(
  '/delete', 

  body('userId')
    .notEmpty()
    .withMessage(APPMSG.User.require.userId)
    .bail()
    .isInt()
    .withMessage(APPMSG.User.regular.userId),

  body('groupId')
    .notEmpty()
    .withMessage(APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Group.regular.groupId),

  async function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
      return;
    }

    let result;
    try {
      result = await db.GroupMembers.destroy({
        where: {
          groupId: req.body.groupId,
          memberId: req.body.userId,
        }
      });
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      group: result,
    });
  }
);



