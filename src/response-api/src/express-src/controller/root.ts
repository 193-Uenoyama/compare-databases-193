import { 
  Request, 
  Response, 
  NextFunction, 
  Router 
} from 'express'
import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper'

export const rootRouter: Router = Router();

rootRouter.all( '/',

  // HTMLのエスケープ処理をする
  function(req: Request, res: Response, next: NextFunction) {
    Object.keys(req.body).forEach(key => {
      req.body[key] = escapeHTML(req.body[key]);
    });
    next();
  }

  // TimeKeeperを設定
  // function(req: Request, res: Response, next: NextFunction) {
  //   req.body.time_keeper = new TimeKeeper();
  //   next();
  // }

);


function escapeHTML(reqString: string){
  return reqString.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27');
}
