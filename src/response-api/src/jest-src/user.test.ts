import request from 'supertest';
import app from '@/express-src/app';
import { UserCommonAttributes, User } from '@/sequelize-src/models/user';
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

describe("Usersテーブルを操作するテスト", () =>{

  it("Userを読み込むテスト", async function() {
    request(app)
      .get("/user/read")
      .then(response => {
        expect(response.statusCode).toBe(200);
        let test_target_user: User = response.body.users.find(( item: User ) => {
          return item.firstName == 'John';
        });
        expect(test_target_user.lastName).toBe('Doe');
      });
  });

  it("Userに新しいデータを挿入するテスト", async function() {
    await request(app)
      .post("/user/create")
      .send({
        firstName: "happy",
        lastName: "boy",
        email: "happy@ha.ppy",
        introduction: "Hello! I am happy!" })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/.*success!.*/)
        expect(response.body.createdUser.lastName).toBe("boy");
      });
  });

  it("Userを更新するテスト", async function() {
    let delection_user: User = await db.Users.findOne({
      where: {
        firstName: "happy"
      }
    });
    await request(app)
      .post("/user/update")
      .send({
        userId: delection_user.userId,
        lastName: 'girl'
      })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/.*success!.*/)
        expect(response.body.updatedUser.lastName).toBe('girl');
      });
  })

  it("Userを削除するテスト", async function() {
    let delection_user: User = await db.Users.findOne({
      where: {
        firstName: "happy",
      }
    });
    await request(app)
      .post("/user/delete")
      .send({
        userId: delection_user.userId
      })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/.*success!.*/)
        expect(response.body.deletedUser.userId).toBe(delection_user.userId);
      });
  })
})
