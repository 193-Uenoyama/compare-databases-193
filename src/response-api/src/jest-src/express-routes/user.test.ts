import request from 'supertest';
import { ValidationError } from 'express-validator';
import app from '@/express-src/app';
import { UserCommonAttributes, User } from '@/sequelize-src/models/user';
import db from '@/sequelize-src/models/index';

export default describe("Usersテーブルを操作するテスト", () =>{

  describe("登録", () => {
    it("Userに新しいデータを挿入するテスト", async function() {
      await request(app)
        .post("/user/create")
        .send({
          firstName: "happy",
          lastName: "boy",
          email: "happy@gmail.com",
          introduction: "Hello! I am happy!" })
        .set('Accept', 'application/json')
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toMatch(/.*success!.*/)
          expect(response.body.createdUser.lastName).toBe("boy");
        });
    });

    describe("Userを作成するときに間違ったリクエストを送信する", () => {
      it("firstName,lastName未入力+emailフォーマット異常", async function() {
        await request(app)
          .post("/user/create")
          .send({
            email: "email",
            introduction: "Hello! I am happy!" 
          })
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(3);
            response.body.errors.forEach((item: ValidationError) => {
              switch ( item.param ) {
                case 'firstName':
                  expect(item.msg).toBe("FirstName is a required field");
                  break;
                case 'lastName':
                  expect(item.msg).toBe("LastName is a required field");
                  break;
                case 'email':
                  expect(item.msg).toBe("The format of the E-mail is incorrect");
                  break;
                default:
                  console.log(item);
              }
            });
          });
      });

      it("email入力忘れ", async function() {
        await request(app)
          .post("/user/create")
          .send({
            firstName: "test",
            lastName: "tarou",
          })
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(1);
            expect(response.body.errors[0].msg).toBe("E-mail is a required field");
          });
      });
    })
  })

  describe("参照", () => {
    it("Userを読み込むテスト", async function() {
      await request(app)
        .get("/user/read")
        .then(response => {
          expect(response.statusCode).toBe(200);
          let test_target_user: User = response.body.users.find(( item: User ) => {
            return item.firstName == 'Kitamura';
          });
          expect(test_target_user.lastName).toBe('193');
        });
    });
  })


  describe("更新", () => {
    it("Userを更新するテスト", async function() {
      let delection_user: User = await db.Users.findOne({
        where: {
          firstName: "aaa"
        }
      });
      await request(app)
        .post("/user/update")
        .send({
          userId: delection_user.userId,
          lastName: 'kousaku'
        })
        .set('Accept', 'application/json')
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toMatch(/.*success!.*/)
          expect(response.body.updatedUser.lastName).toBe('kousaku');
        });
    })

    describe("Userを更新するときに間違ったリクエストを送信する", function() {
      it("正しいメールアドレス + userIdなし", async function() {
        await request(app)
          .post("/user/update")
          .send({
            email: "email@gmail.com",
            introduction: "Hello! I am happy!" 
          })
          .set("Accept", "application/json")
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(1);
            expect(response.body.errors[0].msg).toBe("UserID is a required field");
          });
      })

      it("間違ったメールアドレス", async function() {
        await request(app)
          .post("/user/update")
          .send({
            email: "email",
          })
          .set("Accept", "application/json")
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(2);
            response.body.errors.forEach((item: ValidationError) => {
              switch ( item.param ) {
                case 'userId':
                  expect(item.msg).toBe("UserID is a required field");
                  break;
                case 'email':
                  expect(item.msg).toBe("The format of the E-mail is incorrect");
                  break;
                default:
                  console.log(item);
              }
            });
          });
      })

      it("更新するフィールドが存在しない", async function() {
        let delection_user: User = await db.Users.findOne({
          where: {
            firstName: "aaa"
          }
        });
        await request(app)
          .post("/user/update")
          .send({
            userId: delection_user.userId,
          })
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(1);
            expect(response.body.errors[0].msg).toBe("could not find parameter to update");
          });
      })
    });
  })

  describe("削除", () => {
    it("Userを削除するテスト", async function() {
      let delection_user: User = await db.Users.findOne({
        where: {
          firstName: "yamada",
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
    });

    describe("Userの削除に失敗する", () => {
      it("ユーザID入力なし", async function() {
        await request(app)
          .post("/user/delete")
          .send({ })
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(1);
            expect(response.body.errors[0].msg).toBe("UserID is a required field");
          });
      });

      it("ユーザIDに文字列を入力", async function() {
        await request(app)
          .post("/user/delete")
          .send({
            userId: "aaa"
          })
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(1);
            expect(response.body.errors[0].msg).toBe("UserID is a number");
          });
      });
    })

  });
});
