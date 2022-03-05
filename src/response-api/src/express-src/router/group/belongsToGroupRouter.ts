import express from 'express'
import db from '@/sequelize-src/models/index'

export const belongsToGroupRouter: express.Router = express.Router();

belongsToGroupRouter.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  let groupName: string = Math.random().toString(32).substring(2);
  let groupIntroduction: string = Math.random().toString(32).substring(2);
  db.GroupMembers.create({
    groupId: 1,
    memberId: 1,
  }, {});

  res.status(200).json({msg: "foo"});
});

/* =============== create belongsToGroup ===============
 * type request = {
 *   userId: number,
 *   groupId: number,
 * }
 */
belongsToGroupRouter.post('/create', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  next();
});



/* =============== delete belongsToGroup ===============
 * type request = {
 *   userId: number,
 *   groupId: number,
 * }
 */
belongsToGroupRouter.post('/delete', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  next();
});



