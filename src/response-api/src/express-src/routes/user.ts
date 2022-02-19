import { 
  Request, 
  Response, 
  NextFunction, 
  Router } from 'express'
import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper';
import db from '@/sequelize-src/models/index'
import { excludedPersonalInfomationUserAttributes, UserCommonAttributes, User } from '@/sequelize-src/models/user'

export const userRouter: Router = Router();
interface reqMsg {
  message: string,
  isConnectDatabase: boolean,
}

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


// read Users table
interface reqUserRead extends reqMsg {
  users: Array< excludedPersonalInfomationUserAttributes >
}
userRouter.get('/read', async function(req: Request, res: Response< reqUserRead | reqMsg >, next: NextFunction) {
  let time_keeper = new TimeKeeper();
  let all_users: User[] = await db.Users.findAll({})
    .catch((err: Error) => {
      console.log(err);
      res.status(500).json({
        message: "sorry... fail connect to database.",
        isConnectDatabase: false
      });
    });

  res.status(200).json({ 
    users: all_users,
    message: "success connect database",
    isConnectDatabase: true 
  })
  
});


// create a User
interface reqUserRead extends reqMsg {
  createdUser: excludedPersonalInfomationUserAttributes
}
userRouter.post('/create', async function(req: Request, res: Response< reqUserRead | reqMsg >, next: NextFunction) {
  let created_user = await db.Users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    introduction: req.body.introduction,
  }, {}).catch((err: Error) => {
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


// update a User
interface reqUserUpdate extends reqMsg {
  updatedUser: excludedPersonalInfomationUserAttributes
}
userRouter.post('/update', async function(req: Request, res: Response< reqUserUpdate | reqMsg >, next: NextFunction) {
  // 送られてきたデータを格納。
  let user_request_data: UserCommonAttributes = {
    firstName: req.body.firstName || undefined,
    lastName: req.body.lastName || undefined,
    email: req.body.email || undefined,
    introduction: req.body.introduction || undefined,
  }
  // undefinedのデータを削除
  let update_data: UserCommonAttributes = cutUndefinedOutOfAnArgument(user_request_data);

  console.log(update_data);
  // 更新
  let aa = await db.Users.update( update_data ,{
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
  console.log(aa);


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


// delete user
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

function cutUndefinedOutOfAnArgument<T>(argument: T): T {
  for(const key in argument) {
    if(argument[key] === undefined) {
      delete argument[key];
    }
  }
  return argument;
}

