import { 
  Response, 
  Request,
  NextFunction, 
  Router,
} from 'express'

export const postprocessingRouter: Router = Router();

postprocessingRouter.use( '/', function(req: Request, res: Response, next: NextFunction) {
  console.log(res.statusCode);
  if (res.statusCode == 200 || res.statusCode == 304) {
    req
      .process_logging
      .time_keeper
      .invokeWriter({state: "Success", name: "Node"});
    return;
  }
  else {
    req
      .process_logging
      .time_keeper
      .invokeWriter({state: "Error", name: "Node"});
    next();
    return;
  }
})
