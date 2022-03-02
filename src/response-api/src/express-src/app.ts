import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from '@/express-src/controller/user';
import { groupRouter } from '@/express-src/controller/group';
import { groupMemberRouter } from '@/express-src/controller/group-member';
import { relationRouter } from '@/express-src/controller/relation';
import { rootRouter } from '@/express-src/controller/root'

const app: express.Express = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', rootRouter);
app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/group-member', groupMemberRouter);
app.use('/relation', relationRouter);

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

  res.status(500).json({msg: message});
  return
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  let message: string = '404 notfound request : ' + req.path
  console.log(message);

  res.status(404).json({msg: message});
  return
})


export default app
