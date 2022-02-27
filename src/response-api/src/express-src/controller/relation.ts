import express from 'express'
import db from '@/sequelize-src/models/index'
import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper';

export const relationRouter: express.Router = express.Router();

 relationRouter.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  // let return_data: any = {};
  // let time_keeper = new TimeKeeper();
   
  db.Relations.create({
    followedUserId: 1,
    followingUserId: 1,
  }, {});

  res.status(200).json({msg: "foo"});

});
