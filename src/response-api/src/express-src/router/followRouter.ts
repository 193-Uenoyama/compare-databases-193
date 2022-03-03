import express from 'express'
import db from '@/sequelize-src/models/index'

export const followRouter: express.Router = express.Router();

  followRouter.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  // let return_data: any = {};
  // let time_keeper = new TimeKeeper();
   
  db.Follow.create({
    followedUserId: 1,
    followingUserId: 1,
  }, {});

  res.status(200).json({msg: "foo"});

});
