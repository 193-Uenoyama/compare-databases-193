import { 
  Response, 
  Request,
  NextFunction, 
  Router,
} from 'express'
import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper'

export const rootRouter: Router = Router();

rootRouter.use( '/',

  // TimeKeeperを設定
  function(req: Request, res: Response, next: NextFunction) {
    req.time_keeper = new TimeKeeper();
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
  }

);


function escapeHTML(reqString: string){
  return reqString.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27');
}
