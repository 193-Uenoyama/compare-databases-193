import express from 'express';
import { userRouter } from '@/express-src/routes/user';

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(200).json({msg: "hello world"});
});
app.use('/user', userRouter);

app.listen(3000, () => console.log('listening on port 3000!'));
