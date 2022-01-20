import express from 'express'
import db from '../../sequelize/models/index'

export const userRouter: express.Router = express.Router();

userRouter.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  create_users(1);
  console.log(find_all_users().then((all_users: any) => {
    return all_users;
  }));
  res.status(200).json(find_all_users().then((all_users: any) => {
    return all_users;
  }));
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
  all_users = await db.Users.findAll({}).then((instances: any) => {
    return instances;
  });
  return all_users;
}
