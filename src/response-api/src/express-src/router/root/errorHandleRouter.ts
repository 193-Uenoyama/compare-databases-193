import { 
  Response, 
  Request,
  NextFunction, 
  Router,
  ErrorRequestHandler,
} from 'express'

export const errorHandleRouter: Router = Router();

errorHandleRouter.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  let message: string = '500 server error : ' + req.path
  console.log(message);

  res.status(500).json({message: message});
  return
});

errorHandleRouter.use((req: Request, res: Response, next: NextFunction) => {
  let message: string = '404 notfound request : ' + req.path
  console.log(message);

  res.status(404).json({message: message});
  return
})
