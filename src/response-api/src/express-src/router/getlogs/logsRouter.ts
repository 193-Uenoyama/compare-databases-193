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

    res.status(200).json({ 
      dirs: read_dirs,
      is_success: true,
    });
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
    const read_logs = new ReadLogs(req.params.dir);

    res.status(200).json({ 
      completely_log_data: read_logs.completelyLogDetail(),
      is_success: true,
    });
    next();
  }
)


/***********************************************************
 *
 * 指定された条件でログを加工、返却
 *
 * @param req.params.dir: string // ディレクトリの名前
 * @param req.params.status: string
 * @param req.params.statement: string
 * @param req.params.target: string
 *
 **********************************************************/
getLogsRouter.get(
  '/:dir/:status/:statement/:target',

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

  param('status')
    .custom(value => {
      const correct_status = ['Success', 'Error', 'All'];
      const isInclude = correct_status.includes(value);
      return isInclude;
    })
    .withMessage(APPMSG.General.statusNotFound),

  param('statement')
    .custom(value => {
      const correct_statements = ['Create', 'Read', 'Update', 'Delete', 'Node', 'All'];
      const isInclude = correct_statements.includes(value);
      return isInclude;
    })
    .withMessage(APPMSG.General.statementNotFound),

  param('target')
    .custom(value => {
      const correct_targets = ['Users', 'Groups', 'GroupMembers', 'Follows', 'All'];
      const isInclude = correct_targets.includes(value);
      return isInclude;
    })
    .withMessage(APPMSG.General.targetNotFound),
    
  async function(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()});
      return;
    }
    const read_logs = new ReadLogs(req.params.dir);

    const extractLogData = read_logs.extractLogData(
      req.params.status,
      req.params.statement,
      req.params.target,); 
    res.status(200).json({
      extract_log_data: extractLogData,
      is_success: true,
    });
    next();
  }
)

