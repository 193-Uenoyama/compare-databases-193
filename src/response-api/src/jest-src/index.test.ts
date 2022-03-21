import appTest from '@/jest-src/express-routes/app.test';
import userTest from '@/jest-src/express-routes/user.test';
import groupTest from '@/jest-src/express-routes/group.test';
import belongsToGroupTest from '@/jest-src/express-routes/groupmember.test';
import followTest from '@/jest-src/express-routes/follow.test';

import writeLogTest from '@/jest-src/express-logs/writelogs.test';

// 同期的にテストを実行する
describe("compare-databases-serv-test", () => {
  appTest
  userTest
  groupTest
  belongsToGroupTest
  followTest

  writeLogTest
});
