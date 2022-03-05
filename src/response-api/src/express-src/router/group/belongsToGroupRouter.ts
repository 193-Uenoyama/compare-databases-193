import { 
  Request, 
  Response, 
  NextFunction, 
  Router } from 'express'
import { body, validationResult } from 'express-validator';

import db from '@/sequelize-src/models/index'
import { APPMSG } from '@/express-src/modules/validation/validationMessages';

export const belongsToGroupRouter: Router = Router();

/** create belongsToGroup **********************************
 *
 * 送られてきたデータでグループを作成
 *
 * @param req.body.userId: number
 * @param req.body.groupId: number
 *
 **********************************************************/
belongsToGroupRouter.post(
  '/create', 

  body('userId')
    .notEmpty()
    .withMessage(APPMSG.User.require.userId)
    .bail()
    .isInt()
    .withMessage(APPMSG.User.regular.userId),

  body('groupId')
    .notEmpty()
    .withMessage(APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Group.regular.groupId),

  function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
      return;
    }
    next();
  }
);



/** delete belongsToGroup **********************************
 *
 * 送られてきたデータでグループを作成
 *
 * @param req.body.userId: number
 * @param req.body.groupId: number
 *
 **********************************************************/
belongsToGroupRouter.post(
  '/delete', 

  body('userId')
    .notEmpty()
    .withMessage(APPMSG.User.require.userId)
    .bail()
    .isInt()
    .withMessage(APPMSG.User.regular.userId),

  body('groupId')
    .notEmpty()
    .withMessage(APPMSG.Group.require.groupId)
    .bail()
    .isInt()
    .withMessage(APPMSG.Group.regular.groupId),

  function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
      return;
    }
    next();
  }
);



