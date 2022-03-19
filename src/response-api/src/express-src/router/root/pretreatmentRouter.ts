import { 
  Response, 
  Request,
  NextFunction, 
  Router,
} from 'express'
import TimeKeeper from '@/express-src/modules/writeLogs/TimeKeeper'
import ReqLogDetailHolder from '@/express-src/modules/writeLogs/ReqDetailHolderForLog';
import { ReqLogDetail } from '@/express-src/modules/writeLogs/_modules';

export const pretreatmentRouter: Router = Router();

pretreatmentRouter.use( '/',

  // TimeKeeperを設定
  function(req: Request, res: Response, next: NextFunction) {
    const req_log_detail: ReqLogDetail = new ReqLogDetailHolder().transferReqDetail();

    req.process_logging = {
      log_detail: req_log_detail,
      time_keeper: new TimeKeeper(req_log_detail)
    }

    req.is_return_res = false;
    next();
  },

  // HTMLのエスケープ処理をする
  function(req: Request, res: Response, next: NextFunction) {
    Object.keys(req.body).forEach(key => {
      if(typeof req.body[key] == "number") {
        req.body[key] = String(req.body[key]);
      }
      req.body[key] = escapeHTML(req.body[key]);
    });
    next();
  },

  // ステータスコードを0に設定。
  function(req: Request, res: Response, next: NextFunction) {
    res.statusCode=0;
    next();
  }

);


function escapeHTML(reqString: string){
  return reqString.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27');
}
