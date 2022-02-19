import request from 'supertest';
import app from '@/express-src/app';
import { UserCommonAttributes, User } from '@/sequelize-src/models/user';
import { Group } from '@/sequelize-src/models/group';
import db from '@/sequelize-src/models/index';

const userSeed = require('@/sequelize-src/seeders/20220103140603-demo-user');
const groupSeed = require('@/sequelize-src/seeders/20220205114635-demo-group');
const groupMemberSeed = require('@/sequelize-src/seeders/20220205114644-demo-group-member');
const relationSeed = require('@/sequelize-src/seeders/20220205114654-demo-relation');

// // seeding
// beforeAll(() => {
//   return async function() {
//     await userSeed.up(db.sequelize.getQueryInterface(), db.sequelize);
//     await groupSeed.up(db.sequelize.getQueryInterface(), db.sequelize);
//     await groupMemberSeed.up(db.sequelize.getQueryInterface(), db.sequelize);
//     await relationSeed.up(db.sequelize.getQueryInterface(), db.sequelize);
//   }
// });

// // delete data
// afterAll(() => {
//   return async function() {
//     await relationSeed.down();
//     await groupMemberSeed.down();
//     await groupSeed.down();
//     await userSeed.down();
//   }
// });

describe("Groupsテーブルを操作するテスト", () =>{

  it("Groupを読み込むテスト", async function() {
    request(app)
      .get("/group/read")
      .then(response => {
        expect(response.statusCode).toBe(200);
        let test_target_group: Group = response.body.groups.find(( item: Group ) => {
          return item.groupName == 'kitamura\'s';
        });
        expect(test_target_group.groupIntroduction).toBe('we love oyatsu');
      });
  });

  it("Groupに新しいデータを挿入するテスト", async function() {
    await request(app)
      .post("/group/create")
      .send({
        groupName: 'new! team',
      })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/.*success!.*/)
        expect(response.body.createdGroup.groupName).toBe("new! team");
      });
  });

  it("Groupを更新するテスト", async function() {
    let test_target_group: Group = await db.Groups.findOne({
      where: {
        groupName: 'new! team',
      }
    });
    await request(app)
      .post("/group/update")
      .send({
        groupId: test_target_group.groupId,
        groupIntroduction: 'We are team!'
      })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/.*success!.*/)
        expect(response.body.updatedGroup.groupIntroduction).toBe('We are team!');
      });
  })

  it("Groupを削除するテスト", async function() {
    let test_target_group: Group = await db.Groups.findOne({
      where: {
        groupName: 'new! team',
      }
    });
    await request(app)
      .post("/group/delete")
      .send({
        groupId: test_target_group.groupId
      })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/.*success!.*/)
        expect(response.body.deletedGroup.groupId).toBe(test_target_group.groupId);
      });
  })
})
