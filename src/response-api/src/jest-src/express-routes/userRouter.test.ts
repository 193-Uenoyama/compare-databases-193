import request from 'supertest';
import { ValidationError } from 'express-validator';
import app from '@/express-src/app';
import { User } from '@/sequelize-src/models/user';
import db from '@/sequelize-src/models/index';
import { Seeding } from '@/jest-src/test-reserve/seeding'
import { CleanUp } from '@/jest-src/test-reserve/cleanup'


export default describe("Usersテーブルを操作するテスト", () =>{
  // seeding
  beforeEach( async () => {
    await Seeding();
  });

  // delete data
  afterEach( async () => {
    await CleanUp();
  });

  describe("登録", () => {
    it("Userに新しいデータを挿入するテスト", async function() {
      const response = await request(app)
        .post("/user/create")
        .send({
          firstName: "happy",
          lastName: "boy",
          email: "happy@gmail.com",
          introduction: "Hello! I am happy!" })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      const response_user: User = response.body.created_user;
      const created_user: User = await db.Users.findOne({
        where: { userId: response_user.userId}
      })
      expect(created_user.lastName).toBe("boy");
    });

    describe("Userを作成するときに間違ったリクエストを送信する", () => {
      it("firstName,lastName未入力+emailフォーマット異常", async function() {
        expect.assertions(6);

        const response = await request(app)
          .post("/user/create")
          .send({
            email: "email",
            introduction: "Hello! I am happy!" })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
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

      it("email入力忘れ", async function() {
        const response = await request(app)
          .post("/user/create")
          .send({
            firstName: "test",
            lastName: "tarou", })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("E-mail is a required field");
      });
    })
  })

  describe("参照", () => {
    it("Userを読み込むテスト", async function() {
      const response = await request(app).post("/user/read")

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      const will_read_user = await db.Users.findOne({
        where: { firstName: 'Kitamura' }
      })
      const readed_user: User = response.body.readed_users.find(( user: User ) => {
        return user.firstName == 'Kitamura';
      });

      expect(will_read_user.firstName).toBe(readed_user.firstName);
      expect(will_read_user.lastName).toBe(readed_user.lastName);
      expect(will_read_user.email).toBe(readed_user.email);
    });
  })


  describe("更新", () => {
    it("Userを更新するテスト", async function() {
      const will_update_user: User = await db.Users.findOne({
        where: { firstName: "aaa" }
      });

      const response = await request(app)
        .post("/user/update")
        .send({
          userId: will_update_user.userId,
          lastName: 'kousaku' })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      await will_update_user.reload();
      expect(response.body.updated_user.userId).toBe(will_update_user.userId);
      expect(response.body.updated_user.lastName).toBe(will_update_user.lastName);
    })

    describe("Userを更新するときに間違ったリクエストを送信する", function() {
      it("正しいメールアドレス + userIdなし", async function() {
        const response = await request(app)
          .post("/user/update")
          .send({
            email: "email@gmail.com",
            introduction: "Hello! I am happy!" })
          .set("Accept", "application/json")

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("UserID is a required field");
      })

      it("間違ったメールアドレス", async function() {
        expect.assertions(5);

        const response = await request(app)
          .post("/user/update")
          .send({ email: "email" })
          .set("Accept", "application/json")

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(2);

        response.body.errors.forEach((error: ValidationError) => {
          switch ( error.param ) {
            case 'userId':
              expect(error.msg).toBe("UserID is a required field");
              break;
            case 'email':
              expect(error.msg).toBe("The format of the E-mail is incorrect");
              break;
            default:
              console.log(error);
          }
        });
      })

      it("更新するフィールドが存在しない", async function() {
        const will_update_user: User = await db.Users.findOne({
          where: { firstName: "aaa" }
        });

        const response = await request(app)
          .post("/user/update")
          .send({ userId: will_update_user.userId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("could not find parameter to update");
      })
    });
  })

  describe("削除", () => {
    it("Userを削除するテスト", async function() {
      const will_delete_user: User = await db.Users.findOne({
        where: { firstName: "yamada", }
      });

      const response = await request(app)
        .post("/user/delete")
        .send({ userId: will_delete_user.userId })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);
      expect(response.body.deleted_user.userId).toBe(will_delete_user.userId);

      const deleted_user: User = await db.Users.findOne({
        where: { firstName: "yamada", }
      });
      expect(deleted_user).toBe(null);
    });

    describe("Userの削除に失敗する", () => {
      it("ユーザID入力なし", async function() {
        const response = await request(app)
          .post("/user/delete")
          .send({ })
          .set('Accept', 'application/json')
          
        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("UserID is a required field");
      });

      it("ユーザIDに文字列を入力", async function() {
        const response = await request(app)
          .post("/user/delete")
          .send({ userId: "aaa" })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("UserID is a number");
      });
    })

  });
});
