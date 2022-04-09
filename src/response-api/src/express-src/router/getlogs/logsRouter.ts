import { 
  Request, 
  Response, 
  NextFunction, 
  Router } from 'express'
import { param, validationResult } from 'express-validator';

import fs from 'fs';
import { APPMSG } from '@/express-src/modules/validation/validationMessages';
import { ProcessingTimeLogFileDetail } from '@/express-src/modules/processingLogStore/processingLogModules';
import ReadLogs from '@/express-src/modules/processingLogStore/readLogs/ReadLogs'

export const getLogsRouter: Router = Router();

/** send log file names ************************************
 *
 * ログファイルディレクトリの一覧を送信する
 *
 **********************************************************/
getLogsRouter.get(
  '/',

  async function(req: Request, res: Response, next: NextFunction) {
    let read_dirs: string[];

    try {
      read_dirs = fs.readdirSync(
        ProcessingTimeLogFileDetail.logs_home_dir
      );
    }
    catch(err) {
      console.log(err);
      next();
      return;
    }

    res.status(200).json(read_dirs);
    next();
  }
);


/***********************************************************
 *
 * 指定されたディレクトリ内のログの詳細を返却する
 *
 * @param req.params.dir: string // ディレクトリの名前
 *
 **********************************************************/
getLogsRouter.get(
  '/:dir',

  param('dir')
    .custom(value => {
      try {
        return fs.readdirSync(
          ProcessingTimeLogFileDetail.logs_home_dir
        ).includes(value);
      }
      catch(err) {
        console.log(err);
        return;
      }
    })
    .withMessage(APPMSG.General.directoryNotFound),

  async function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
      return;
    }
    const records: string[] = [];

    const read_logs = new ReadLogs(req.params.dir);

    res.status(200).json(read_logs.completelyLogDetail());
    next();
  }
)


