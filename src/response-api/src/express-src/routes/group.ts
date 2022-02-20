import { 
  Request, 
  Response, 
  NextFunction, 
  Router } from 'express'
import db from '@/sequelize-src/models/index'
import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper';
import { reqMsg, cutUndefinedOutOfAnArgument } from '@/express-src/routes/_modules';
import { GroupCommonAttributes, GroupAttributes, Group } from '@/sequelize-src/models/group';

export const groupRouter: Router = Router();

// groupRouter.get('/', function(req: Request, res: Response, next: NextFunction) {
//   // let return_data: any = {};
//   // let time_keeper = new TimeKeeper();

//   let groupName: string = Math.random().toString(32).substring(2);
//   let groupIntroduction: string = Math.random().toString(32).substring(2);
//   db.Groups.create({
//     groupName: groupName,
//     groupIntroduction: groupIntroduction,
//   }, {});

//   res.status(200).json({msg: "foo"});
// });


// --------------- create a group ---------------
interface reqGroupCreate extends reqMsg {
  createdGroup: GroupAttributes
}
groupRouter.post('/create', async function(req: Request, res: Response<reqGroupCreate | reqMsg>, next: NextFunction) {
  let group_request_data: GroupCommonAttributes = {
    groupName: req.body.groupName || undefined,
    groupIntroduction: req.body.groupIntroduction || undefined,
  }
  // undefinedのデータを削除
  let create_data: GroupCommonAttributes = cutUndefinedOutOfAnArgument(group_request_data);

  let created_group: Group = await db.Groups.create(create_data, {}).catch((err: Error) => {
    console.log(err);
    res.status(500).json({
      message: "sorry... fail connect to database.",
      isConnectDatabase: false
    });
  })

  res.status(200).json({
    createdGroup: created_group,
    message: "success! create " + created_group.groupName,
    isConnectDatabase: true,
  });
})


// --------------- read groups ---------------
interface reqGroupRead extends reqMsg {
  groups: Array< GroupAttributes >
}
groupRouter.get('/read', async function(req: Request, res: Response<reqGroupRead | reqMsg>, next: NextFunction) {
  let readed_groups: Group[] = await db.Groups.findAll({})
    .catch((err: Error) => {
      console.log(err);
      res.status(500).json({
        message: "sorry... fail connect to database.",
        isConnectDatabase: false
      });
    });

  res.status(200).json({ 
    groups: readed_groups,
    message: "success connect database",
    isConnectDatabase: true 
  })
})


// --------------- update a group ---------------
interface reqGroupUpdate extends reqMsg {
  updatedGroup: GroupAttributes
}
groupRouter.post('/update', async function(req: Request, res: Response, next: NextFunction) {
  // 送られてきたデータを格納。
  let group_request_data: GroupCommonAttributes = {
    groupName: req.body.groupName || undefined,
    groupIntroduction: req.body.groupIntroduction || undefined,
  }
  // undefinedのデータを削除
  let update_data: GroupCommonAttributes = cutUndefinedOutOfAnArgument(group_request_data);

  // 更新
  await db.Groups.update( update_data ,{
    where: {
      groupId: req.body.groupId,
    }
  }).catch((err: Error) => {
    console.log(err);
    res.status(500).json({
      message: "sorry... fail connect to database.",
      isConnectDatabase: false,
    });
  })

  // 更新されたユーザを取得
  let updated_group: Group = await db.Groups.findOne({
    where: {
      groupId: req.body.groupId,
    }
  }).catch((err: Error) => {
    console.log(err);
    res.status(500).json({
      message: "sorry... fail connect to database.",
      isConnectDatabase: false,
    });
  })

  res.status(200).json({
    updatedGroup: updated_group,
    message: "success! update " + updated_group.groupName,
    isConnectDatabase: true,
  })
})


// --------------- delete a group ---------------
interface reqGroupDelete extends reqMsg {
  deletedGroup: GroupAttributes
}
groupRouter.post('/delete', async function(req: Request, res: Response, next: NextFunction) {
  let deletion_group: Group = await db.Groups.findOne({
    where: {
      groupId: req.body.groupId
    }
  }).catch((err: Error) => {
    console.log(err);
    res.status(501).json({
      message: "sorry... fail connect to database.",
      isConnectDatabase: false,
    });
  })

  await db.Groups.destroy({
    where: {
      groupId: req.body.groupId
    }
  }).catch((err: Error) => {
    console.log(err);
    res.status(502).json({
      message: "sorry... fail connect to database.",
      isConnectDatabase: false,
    });
  })
  
  res.status(200).json({
    deletedGroup: deletion_group,
    message: "success! deleted " + deletion_group.groupName,
    isConnectDatabase: true,
  });
})
