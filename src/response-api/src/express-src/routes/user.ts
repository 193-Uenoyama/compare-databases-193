import { 
  Request, 
  Response, 
  NextFunction, 
  Router } from 'express'
import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper';
import db from '@/sequelize-src/models/index'
import { excludedPersonalInfomationUserAttributes, UserCommonAttributes, User } from '@/sequelize-src/models/user'
import { reqMsg, cutUndefinedOutOfAnArgument } from '@/express-src/routes/_modules'

export const userRouter: Router = Router();

userRouter.get('/', async function(req: Request, res: Response, next: NextFunction) {
  let return_data: any = {};
  let time_keeper = new TimeKeeper();

  let firstName: string = Math.random().toString(32).substring(2);
  let lastName: string = Math.random().toString(32).substring(2);
  let email: string = Math.random().toString(32).substring(2);
  await db.Users.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
  }, {}).catch((err: Error) => {
      res.status(500).json({msg: err});
  });

  return_data = await db.Users.findAll({
    where: {
      userId: 82, 
    }
  })  
  .catch((err: Error) => {
    res.status(500).json({msg: err});
  })

  res.status(200).json(return_data);
});


// --------------- create a User ---------------
interface reqUserRead extends reqMsg {
  createdUser: excludedPersonalInfomationUserAttributes
}
userRouter.post('/create', async function(req: Request, res: Response<reqUserRead | reqMsg>, next: NextFunction) {
  // 送られてきたデータを格納。
  let user_request_data: UserCommonAttributes = {
    firstName: req.body.firstName || undefined,
    lastName: req.body.lastName || undefined,
    email: req.body.email || undefined,
    introduction: req.body.introduction || undefined,
  }
  // undefinedのデータを削除
  let create_data: UserCommonAttributes = cutUndefinedOutOfAnArgument(user_request_data);

  let created_user = await db.Users.create(create_data, {}).catch((err: Error) => {
    console.log(err);
    res.status(500).json({
      message: "sorry... fail connect to database.",
      isConnectDatabase: false
    });
  })

  res.status(200).json({
    createdUser: created_user,
    message: "success! create " + created_user.firstName + " " + created_user.lastName,
    isConnectDatabase: true,
  });
});


// --------------- read Users table ---------------
interface reqUserRead extends reqMsg {
  users: Array< excludedPersonalInfomationUserAttributes >
}
userRouter.get('/read', async function(req: Request, res: Response<reqUserRead | reqMsg>, next: NextFunction) {
  let time_keeper = new TimeKeeper();
  let readed_users: User[] = await db.Users.findAll({})
    .catch((err: Error) => {
      console.log(err);
      res.status(500).json({
        message: "sorry... fail connect to database.",
        isConnectDatabase: false
      });
    });

  res.status(200).json({ 
    users: readed_users,
    message: "success connect database",
    isConnectDatabase: true 
  })
  
});


// --------------- update a User ---------------
interface reqUserUpdate extends reqMsg {
  updatedUser: excludedPersonalInfomationUserAttributes
}
userRouter.post('/update', async function(req: Request, res: Response<reqUserUpdate | reqMsg>, next: NextFunction) {
  // 送られてきたデータを格納。
  let user_request_data: UserCommonAttributes = {
    firstName: req.body.firstName || undefined,
    lastName: req.body.lastName || undefined,
    email: req.body.email || undefined,
    introduction: req.body.introduction || undefined,
  }
  // undefinedのデータを削除
  let update_data: UserCommonAttributes = cutUndefinedOutOfAnArgument(user_request_data);

  // 更新
  await db.Users.update( update_data ,{
    where: {
      userId: req.body.userId,
    }
  }).catch((err: Error) => {
    console.log(err);
    res.status(500).json({
      message: "sorry... fail connect to database.",
      isConnectDatabase: false,
    });
  })

  // 更新されたユーザを取得
  let updated_user: User = await db.Users.findOne({
    where: {
      UserId: req.body.userId
    }
  }).catch((err: Error) => {
    console.log(err);
    res.status(500).json({
      message: "sorry... fail connect to database.",
      isConnectDatabase: false,
    });
  })

  res.status(200).json({
    updatedUser: updated_user,
    message: "success! update " + updated_user.firstName + " " + updated_user.lastName,
    isConnectDatabase: true,
  })
});


// --------------- delete user ---------------
interface reqUserDelete extends reqMsg {
  deletedUser: excludedPersonalInfomationUserAttributes
}
userRouter.post('/delete', async function(req: Request, res: Response< reqUserDelete | reqMsg >, next: NextFunction) {
  let deletion_user: User = await db.Users.findOne({
    where: {
      UserId: req.body.userId
    }
  }).catch((err: Error) => {
    console.log(err);
    res.status(500).json({
      message: "sorry... fail connect to database.",
      isConnectDatabase: false,
    });
    return;
  })

  await db.Users.destroy({
    where: {
      UserId: req.body.userId
    }
  }).catch((err: Error) => {
    console.log(err);
    res.status(500).json({
      message: "sorry... fail connect to database.",
      isConnectDatabase: false,
    });
    return;
  })
  
  res.status(200).json({
    deletedUser: deletion_user,
    message: "success! deleted " + deletion_user.firstName + " " + deletion_user.lastName,
    isConnectDatabase: true,
  });
});


