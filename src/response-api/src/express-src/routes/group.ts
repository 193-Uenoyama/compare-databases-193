import express from 'express'
import db from '@/sequelize-src/models/index'
import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper';

export const groupRouter: express.Router = express.Router();

groupRouter.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  // let return_data: any = {};
  // let time_keeper = new TimeKeeper();

  let groupName: string = Math.random().toString(32).substring(2);
  let groupIntroduction: string = Math.random().toString(32).substring(2);
  db.Groups.create({
    groupName: groupName,
    groupIntroduction: groupIntroduction,
  }, {});

  res.status(200).json({msg: "foo"});

});
