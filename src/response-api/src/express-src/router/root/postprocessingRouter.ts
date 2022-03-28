import { 
  Response, 
  Request,
  NextFunction, 
  Router,
} from 'express'

export const postprocessingRouter: Router = Router();

postprocessingRouter.use( '/', function(req: Request, res: Response, next: NextFunction) {
  // console.log(
  //   "code: " + res.statusCode + " | " + 
  //   "path: " + req.path);

  if (res.statusCode == 200 || res.statusCode == 304) {
    req
      .process_logging
      .time_keeper
      .invokeWriter({state: "Success", name: "Node"});
    return;
  }

  // favicon の場合は時間は測らない
  if (req.path == '/favicon.ico') {
    next();
    return;
  }

  req
    .process_logging
    .time_keeper
    .invokeWriter({state: "Error", name: "Node"});
  next();
  return;
})
