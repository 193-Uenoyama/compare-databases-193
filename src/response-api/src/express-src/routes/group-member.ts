import express from 'express'
import db from '@/sequelize-src/models/index'
import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper';

export const groupMemberRouter: express.Router = express.Router();

 groupMemberRouter.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  // let return_data: any = {};
  // let time_keeper = new TimeKeeper();
   //
  let groupName: string = Math.random().toString(32).substring(2);
  let groupIntroduction: string = Math.random().toString(32).substring(2);
  db.GroupMembers.create({
    groupId: 1,
    memberId: 1,
  }, {});

  res.status(200).json({msg: "foo"});

});
