import db from '@/sequelize-src/models/index';

const userSeed = require('@/sequelize-src/seeders/20220103140603-demo-user');
const groupSeed = require('@/sequelize-src/seeders/20220205114635-demo-group');
const groupMemberSeed = require('@/sequelize-src/seeders/20220205114644-demo-group-member');
const relationSeed = require('@/sequelize-src/seeders/20220205114654-demo-follow');

export async function Seeding() {
  await userSeed.up(db.sequelize.getQueryInterface(), db.sequelize);
  await groupSeed.up(db.sequelize.getQueryInterface(), db.sequelize);
  await groupMemberSeed.up(db.sequelize.getQueryInterface(), db.sequelize);
  await relationSeed.up(db.sequelize.getQueryInterface(), db.sequelize);
}
