import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from '@/express-src/routes/user';
import { groupRouter } from '@/express-src/routes/group';
import { groupMemberRouter } from '@/express-src/routes/group-member';
import { relationRouter } from '@/express-src/routes/relation';

export const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(200).json({msg: "hello world"});
});

app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/group-member', groupMemberRouter);
app.use('/relation', relationRouter);


app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  let message: string = '404 notfound request : ' + req.path
  console.log(message);

  res.status(404);
  res.json({msg: message});
})

app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
  let message: string = '500 server error : ' + req.path
  console.log(message);

  res.status(500);
  res.json({msg: message});
});

