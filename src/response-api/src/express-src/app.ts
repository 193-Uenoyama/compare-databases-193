import express from 'express';
import bodyParser from 'body-parser';

import { pretreatmentRouter } from '@/express-src/router/root/pretreatmentRouter'
import { userRouter } from '@/express-src/router/user/userRouter';
import { followRouter } from '@/express-src/router/user/followRouter';
import { groupRouter } from '@/express-src/router/group/groupRouter';
import { belongsToGroupRouter } from '@/express-src/router/group/belongsToGroupRouter';
import { postprocessingRouter } from '@/express-src/router/root/postprocessingRouter'
import { errorHandleRouter } from '@/express-src/router/root/errorHandleRouter'

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', pretreatmentRouter);

app.use('/user', userRouter);
app.use('/user/follow', followRouter);

app.use('/group', groupRouter);
app.use('/group/member', belongsToGroupRouter);

app.use('/', postprocessingRouter);
app.use('/', errorHandleRouter);


export default app
