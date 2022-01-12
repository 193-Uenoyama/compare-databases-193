import express from 'express';

import { psqlRouter } from './routes/psql';

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(200).json({msg: "hello world"});
});
app.use('/psql', psqlRouter);

app.listen(3000, () => console.log('listening on port 3000!'));
