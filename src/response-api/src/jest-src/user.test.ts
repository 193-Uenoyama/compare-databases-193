import request from 'supertest';
import app from '@/express-src/app'
import { UserCommonAttributes, User } from '@/sequelize-src/models/user'
import db from '@/sequelize-src/models/index'

describe("user test", () =>{

  it("read user", async function() {
    request(app)
      .get("/user/read")
      .then(response => {
        expect(response.statusCode).toBe(200);
        let John: User = response.body.find(( item: User ) => {
          return item.firstName == 'John';
        });
        expect(John.lastName).toBe('Doe');
      });
  });

  it("create user", async function() {
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
        expect(response.body.msg).toBe("create!");
      });

    await User.findAll({})
      // TODO anyにしないとfindできない。　なんでじゃ。
      .then((user_instances: any) => {
        let created_user = user_instances.find(( item: any ) => {
          return item.firstName == 'happy'
        });
        expect(created_user.lastName).toBe("boy")
      });
  });

  it("update user", async function() {
    await request(app)
      .post("user/update")
      .send({
        userId: 1,
        firstName: 'Joi'
      })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe("update!");
      });

    await User.findAll({})
      .then((user_instances: any) => {
        let updated_user = user_instances.find((item: any) => {
          return item.userId == 1
        });
        expect(updated_user.firstName).toBe('Joi');
      })
  })

})
