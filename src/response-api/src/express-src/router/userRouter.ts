import { 
  Request, 
  Response, 
  NextFunction, 
  Router 
} from 'express'
import db from '@/sequelize-src/models/index'
import { excludedPersonalInfomationUserAttributes, UserCommonAttributes, User } from '@/sequelize-src/models/user'
import { reqMsg, cutUndefinedOutOfAnArgument } from '@/express-src/router/_modules'

export const userRouter: Router = Router();

userRouter.get('/', async function(req: Request, res: Response, next: NextFunction) {
  let return_data: any = {};

  let firstName: string = Math.random().toString(32).substring(2);
  let lastName: string = Math.random().toString(32).substring(2);
  let email: string = Math.random().toString(32).substring(2);
  await db.Users.calculateTimeOfCreate(req.time_keeper, {
    firstName: firstName,
    lastName: lastName,
    email: email,
  }, {}).catch((err: Error) => {
    next(err);
    return
  });

  return_data = await db.Users.calculateTimeOfFindAll(req.time_keeper, {})  
  .catch((err: Error) => {
    next(err);
    return
  })

  res.status(200).json(return_data);
  req.is_return_res = true;
  next();
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

  let created_user = await db.Users.calculateTimeOfCreate(req.time_keeper, create_data, {}).catch((err: Error) => {
    console.log(err.stack);
    next(err);
    return;
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
  let readed_users: User[] = await db.Users.calculateTimeOfFindAll(req.time_keeper, {})
    .catch((err: Error) => {
      console.log(err.stack);
      next(err);
      return;
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
  await db.Users.calculateTimeOfUpdate(req.time_keeper, update_data ,{
    where: {
      userId: req.body.userId,
    }
  }).catch((err: Error) => {
    console.log(err.stack);
    next(err);
    return;
  })

  // 更新されたユーザを取得
  let updated_user: User = await db.Users.findOne({
    where: {
      userId: req.body.userId
    }
  }).catch((err: Error) => {
    console.log(err.stack);
    next(err);
    return;
  });

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
      userId: req.body.userId
    }
  }).catch((err: Error) => {
    console.log(err.stack);
    next(err);
    return;
  })

  await db.Users.calculateTimeOfDelete(req.time_keeper, {
    where: {
      UserId: req.body.userId
    }
  }).catch((err: Error) => {
    console.log(err.stack);
    next(err);
    return;
  })
  
  res.status(200).json({
    deletedUser: deletion_user,
    message: "success! deleted " + deletion_user.firstName + " " + deletion_user.lastName,
    isConnectDatabase: true,
  });
});


