import { 
  Request, 
  Response, 
  NextFunction, 
  Router } from 'express'
import { body, validationResult } from 'express-validator';

import db from '@/sequelize-src/models/index'
import { reqMsg, cutUndefinedOutOfAnArgument } from '@/express-src/router/_modules';
import { GroupCommonAttributes, GroupAttributes, Group } from '@/sequelize-src/models/group';
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
interface reqGroupCreate extends reqMsg {
  createdGroup: GroupAttributes
}
groupRouter.post(
  '/create', 

  body('groupName').notEmpty().withMessage(APPMSG.Group.require.groupName),

  async function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
      return;
    }

    let group_request_data: GroupCommonAttributes = {
      groupName: req.body.groupName,
      groupIntroduction: req.body.groupIntroduction || undefined,
    }
    // undefinedのデータを削除
    let create_data: GroupCommonAttributes = cutUndefinedOutOfAnArgument(group_request_data);

    let created_group: Group
    try{
      created_group = await db.Groups.create(create_data, {})
    }
    catch(err) {
      console.log(err);
      next(err);
      return
    }

    res.status(200).json({
      createdGroup: created_group,
      message: "success! create " + created_group.groupName,
      isConnectDatabase: true,
    });
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
interface reqGroupRead extends reqMsg {
  groups: Array< GroupAttributes >
}
groupRouter.get(
  '/read', 

  async function(req: Request, res: Response, next: NextFunction) {
    let readed_groups: Group[];
    try{
      readed_groups = await db.Groups.findAll({})
    }
    catch(err){
      console.log(err);
      next(err);
      return;
    }

    res.status(200).json({ 
      groups: readed_groups,
      message: "success connect database",
      isConnectDatabase: true 
    })
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
interface reqGroupUpdate extends reqMsg {
  updatedGroup: GroupAttributes
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
  async function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
      return;
    }

    // 送られてきたデータを格納。
    let group_request_data: GroupCommonAttributes = {
      groupName: req.body.groupName || undefined,
      groupIntroduction: req.body.groupIntroduction || undefined,
    }
    // undefinedのデータを削除
    let update_data: GroupCommonAttributes = cutUndefinedOutOfAnArgument(group_request_data);

    // 更新
    try{
      await db.Groups.update( update_data ,{
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
      updatedGroup: updated_group,
      message: "success! update " + updated_group.groupName,
      isConnectDatabase: true,
    })
  }
)


/** delete a group *****************************************
 *
 * リクエストを受けたuserIdを持つユーザを削除する
 * 
 * @param req.body.groupId: number
 *
 ***********************************************************/
interface reqGroupDelete extends reqMsg {
  deletedGroup: GroupAttributes
}
groupRouter.post(
  '/delete', 

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
      await db.Groups.destroy({
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
      deletedGroup: deletion_group,
      message: "success! deleted " + deletion_group.groupName,
      isConnectDatabase: true,
    });
  }
)
