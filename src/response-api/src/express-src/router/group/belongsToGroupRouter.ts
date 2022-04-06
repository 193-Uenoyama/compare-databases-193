import { 
  Request, 
  Response, 
  NextFunction, 
  Router } from 'express'
import { param, body, validationResult } from 'express-validator';

import db from '@/sequelize-src/models/index'
import { baseResponse, validErrorResponse, cutUndefinedOutOfAnArgument } from '@/express-src/router/_modules';
import { GroupAttributes, Group } from '@/sequelize-src/models/group';
import { APPMSG } from '@/express-src/modules/validation/validationMessages';

export const belongsToGroupRouter: Router = Router();

/** create belongsToGroup **********************************
 *
 * 送られてきたgroupIdのグループにuserIdのユーザを所属させる
 *
 * @param req.body.groupId: number
 * @param req.body.userId: number
 *
 **********************************************************/
interface createGroupMemberResponse extends baseResponse {
  belonged_group: GroupAttributes;
}
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

  async function(req: Request, res: Response<createGroupMemberResponse | validErrorResponse>, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array(),
        is_success: false,
      });
      return;
    }

    let group_request_data = {
      groupId: req.body.groupId,
      memberId: req.body.userId
    }
    // undefinedのデータを削除
    let create_data = cutUndefinedOutOfAnArgument(group_request_data);

    let result;
    try {
      result = await db.GroupMembers.calculateTimeOfCreate(
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
      belonged_group: result,
      is_success: true,
    });
    next();
  }
);


/** read belongsToGroup members ****************************
 *
 * 送られてきたgroupIdのグループに所属しているメンバーを返却
 *
 * @param req.body.groupId: number
 *
 **********************************************************/
interface readGroupMemberResponse extends baseResponse {
  readed_group: GroupAttributes,
}
belongsToGroupRouter.get(
  '/read/:groupId', 

  param('groupId')
    .notEmpty()
    .withMessage(APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Group.regular.groupId),

  async function(req: Request, res: Response<readGroupMemberResponse | validErrorResponse>, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array(),
        is_success: false,
      });
      return;
    }

    let targetGroup: Group;
    try {
      targetGroup = await db.Groups.calculateTimeOfFindOne(req.process_logging.log_detail, {
        where: {
          groupId: req.params.groupId,
        },
        include: [ 'Members' ],
      });
    }
    catch(err) {
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({
      readed_group: targetGroup,
      is_success: true,
    });
    next();
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
interface deleteMemberResponse extends baseResponse {
  // left ... leaveの過去形
  left_group: GroupAttributes,
}
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

  async function(req: Request, res: Response<deleteMemberResponse | validErrorResponse>, next: NextFunction) {
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
      result = await db.GroupMembers.calculateTimeOfDestroy(req.process_logging.log_detail, {
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
      left_group: result,
      is_success: true,
    });
    next();
  }
);

