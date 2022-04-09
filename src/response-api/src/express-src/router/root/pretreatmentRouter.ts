import { 
  Response, 
  Request,
  NextFunction, 
  Router,
} from 'express'
import TimeKeeper from '@/express-src/modules/processingLogStore/writeLogs/TimeKeeper'
import ReqLogDetailMaker from '@/express-src/modules/processingLogStore/writeLogs/ReqDetailHolderForLog';
import { ReqLogDetail } from '@/express-src/modules/processingLogStore/processingLogModules';

export const pretreatmentRouter: Router = Router();

pretreatmentRouter.use( '/',

  // TimeKeeperを設定
  function(req: Request, res: Response, next: NextFunction) {
    const is_unneed_calculate = req.body.is_unneed_calculate || false;
    const req_log_detail: ReqLogDetail = 
      new ReqLogDetailMaker(is_unneed_calculate).transferReqDetail();

    req.process_logging = {
      log_detail: req_log_detail,
      time_keeper: new TimeKeeper(req_log_detail)
    }

    req.is_return_res = false;
    next();
  },

  // HTMLのエスケープ処理をする
  // TODO 特定フィールドのみに絞る
  // function(req: Request, res: Response, next: NextFunction) {
  //   Object.keys(req.body).forEach(key => {
  //     if(typeof req.body[key] == "number") {
  //       req.body[key] = String(req.body[key]);
  //     }
  //     req.body[key] = escapeHTML(req.body[key]);
  //   });
  //   next();
  // },

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
