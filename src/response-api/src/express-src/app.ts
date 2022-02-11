import express from 'express';
import bodyParser from 'body-parser'
import { userRouter } from '@/express-src/routes/user';
import { groupRouter } from '@/express-src/routes/group';
import { groupMemberRouter } from '@/express-src/routes/group-member';
import { relationRouter } from '@/express-src/routes/relation';

const app: express.Express = express();

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

app.listen(8000, () => console.log('listening on port 8000!'));
