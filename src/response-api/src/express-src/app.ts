import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from '@/express-src/router/userRouter';
import { groupRouter } from '@/express-src/router/groupRouter';
import { belongsToGroupRouter } from '@/express-src/router/belongsToGroupRouter';
import { followRouter } from '@/express-src/router/followRouter';
import { rootRouter } from '@/express-src/router/rootRouter'

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', rootRouter);
app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/group-member', belongsToGroupRouter);
app.use('/follow', followRouter);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.is_return_res) {
    req.time_keeper.invokeWriter({state: "Success", name: "Node"});
    return;
  }
  next();
})

app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(err);
  let message: string = '500 server error : ' + req.path
  console.log(message);

  res.status(500).json({message: message});
  return
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  let message: string = '404 notfound request : ' + req.path
  console.log(message);

  res.status(404).json({message: message});
  return
})


export default app
