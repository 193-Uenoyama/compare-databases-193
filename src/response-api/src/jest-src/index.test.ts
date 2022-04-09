import appTest from '@/jest-src/express-routes/app.test';

import userRouter from '@/jest-src/express-routes/userRouter.test';
import groupRouter from '@/jest-src/express-routes/groupRouter.test';
import belongsToGroupRouter from '@/jest-src/express-routes/groupMemberRouter.test';
import followRouter from '@/jest-src/express-routes/followRouter.test';

import writeLogs from '@/jest-src/express-logs/writeLogs.test';
import userLogs from '@/jest-src/express-logs/userLogs.test';
import groupLogs from '@/jest-src/express-logs/groupLogs.test';
import groupMemberLogs from '@/jest-src/express-logs/groupMemberLogs.test';
import followLogs from '@/jest-src/express-logs/followLogs.test';

// 同期的にテストを実行する
describe("compare-databases-serv-test", () => {
  appTest

  userRouter
  groupRouter
  belongsToGroupRouter
  followRouter 
                      
  writeLogs 
  userLogs 
  groupLogs 
  groupMemberLogs 
  followLogs 
});
