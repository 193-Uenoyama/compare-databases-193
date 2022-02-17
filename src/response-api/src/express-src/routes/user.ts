import express from 'express'
import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper';
import db from '@/sequelize-src/models/index'
import { UserCommonAttributes, User } from '@/sequelize-src/models/user'

export const userRouter: express.Router = express.Router();

userRouter.get('/', async function(req: express.Request, res: express.Response, next: express.NextFunction) {
  let return_data: any = {};
  let time_keeper = new TimeKeeper();

  let firstName: string = Math.random().toString(32).substring(2);
  let lastName: string = Math.random().toString(32).substring(2);
  let email: string = Math.random().toString(32).substring(2);
  db.Users.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
  }, {});

  await db.Users.findAll({})
    .then((instances: any) => {
      return_data = instances;
      time_keeper.StoreDbEnd_IfPossibleOutLog();
    })

  res.status(200).json(return_data);
});



// read Users table
userRouter.get('/read', async function(req: express.Request, res: express.Response, next: express.NextFunction) {
  let all_users: any;
  await db.Users.findAll({})
    .then((instances: any) => {
      all_users = instances;
    })
  
  res.status(200).json(all_users);
});


// create a User
userRouter.post('/create', async function(req: express.Request, res: express.Response, next: express.NextFunction) {
  db.Users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    introduction: req.body.introduction,
  }, {}).catch((err: Error) => {
    return new Error("fail create user" + req.body.firstName);
  })
  res.status(200).json({msg: "create!"});
});


// update User
userRouter.post('/update', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  let user_common_request_data: UserCommonAttributes = {
    firstName: req.body.firstName || undefined,
    lastName: req.body.lastName || undefined,
    email: req.body.email || undefined,
    introduction: req.body.introduction || undefined,
  }
  let update_data: UserCommonAttributes = cutUndefinedOutOfAnArgument(user_common_request_data);

  db.Users.update({
    update_data
  },{
    where: {
      userId: req.body.userId,
    }
  }).then(() => {
    res.status(200).json({msg: "update"});
  }).catch((err: Error) => {
    new Error("fail update")
  })
});


// delete user
userRouter.post('/delete', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.status(200).json({msg: "delete"});
});

function cutUndefinedOutOfAnArgument<T>(argument: T): T {
  for(const key in argument) {
    if(argument[key] === undefined) {
      delete argument[key];
    }
  }
  return argument;
}

