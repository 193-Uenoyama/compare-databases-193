import express from 'express'
import db from '@/sequelize-src/models/index'
import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper';

export const userRouter: express.Router = express.Router();

let time_keeper = new TimeKeeper();

userRouter.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  let return_data: any = {};

  create_users(1);
  find_all_users()
    .then((all_users: any) => {
      res.status(200).json(all_users);
      time_keeper.StoreNodeEnd_IfPossibleOutLog();
    })
    .catch((err) => {
      res.status(500).json({msg: err});
    });
});

/**
 * insert a randomly named user into the user table in amount of "size" param
 * @param size number of inserts into users table
 */
function create_users(size: number) {
  for (let i = 0; i < size; i++) {
    let firstName: string = Math.random().toString(32).substring(2);
    let lastName: string = Math.random().toString(32).substring(2);
    let email: string = Math.random().toString(32).substring(2);
    db.Users.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {});
  }
}

/**
 *
 */
// TODO why return promise?
async function find_all_users() {
  let all_users: any;
  await db.Users.findAll({})
    .then((instances: any) => {
      all_users = instances;
      time_keeper.StoreDbEnd_IfPossibleOutLog();
    })
    // TODO err の型調べる
    .catch((err: any) => {
      console.log(err);
      throw new Error("エラーだよ。");
    })
  return all_users;
}
