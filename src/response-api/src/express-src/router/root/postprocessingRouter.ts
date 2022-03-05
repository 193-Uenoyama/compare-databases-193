import { 
  Response, 
  Request,
  NextFunction, 
  Router,
} from 'express'

export const postprocessingRouter: Router = Router();

postprocessingRouter.use( '/', function(req: Request, res: Response, next: NextFunction) {
  if (req.is_return_res) {
    req.time_keeper.invokeWriter({state: "Success", name: "Node"});
    return;
  }
  next();
})
