import { 
  Response, 
  Request,
  NextFunction, 
  Router,
} from 'express'

export const postprocessingRouter: Router = Router();

postprocessingRouter.use( '/', function(req: Request, res: Response, next: NextFunction) {
  if (res.statusCode == 200) {
    req.time_keeper.invokeWriter({state: "Success", name: "Node"});
    return;
  }
  else {
    req.time_keeper.invokeWriter({state: "Error", name: "Node"});
    return;
  }
})
