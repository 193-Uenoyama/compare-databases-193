import request from 'supertest';
import app from '@/express-src/app';
import { UserCommonAttributes, User } from '@/sequelize-src/models/user';
import { Group } from '@/sequelize-src/models/group';
import db from '@/sequelize-src/models/index';

export default describe("Groupsテーブルを操作するテスト", () =>{

  describe("登録", () => {
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

    describe("Group登録validationエラー", () => {
      it("GroupNameが空っぽ", async function() {
        await request(app)
          .post("/group/create")
          .send({})
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(1);
            expect(response.body.errors[0].msg).toBe("GroupName is a required field");
          });
      });
    })
  })

  describe("参照", () => {
    it("Groupを読み込むテスト", async function() {
      await request(app)
        .get("/group/read")
        .then(response => {
          expect(response.statusCode).toBe(200);
          let test_target_group: Group = response.body.groups.find(( item: Group ) => {
            return item.groupName == 'new! team';
          });
          expect(test_target_group.groupIntroduction).toBe(null);
        });
    });
  })

  describe("更新", () => {
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

    describe("Group更新 validationエラー", () => {
      it("groupIdが空", async function() {
        await request(app)
          .post("/group/update")
          .send({
            groupIntroduction: 'We are team!'
          })
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(1);
            expect(response.body.errors[0].msg).toBe("GroupID is a required field");
          });
      })

      it("groupIdが文字列", async function() {
        await request(app)
          .post("/group/update")
          .send({
            groupId: "moji",
            groupIntroduction: 'We are team!'
          })
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(1);
            expect(response.body.errors[0].msg).toBe("GroupID is a number");
          });
      })

      it("groupId以外が空", async function() {
        await request(app)
          .post("/group/update")
          .send({
            groupId: 5,
          })
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(1);
            expect(response.body.errors[0].msg).toBe("could not find parameter to update");
          });
      })

    })
  })

  describe("削除", () => {
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

    describe("Group削除 validationエラー", () => {
      it("groupId入力なし", async function() {
        await request(app)
          .post("/group/delete")
          .send({})
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(1);
            expect(response.body.errors[0].msg).toBe("GroupID is a required field");
          });
      })

      it("groupId文字列入力", async function() {
        await request(app)
          .post("/group/delete")
          .send({
            groupId: "aaa"
          })
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.errors.length).toBe(1);
            expect(response.body.errors[0].msg).toBe("GroupID is a number");
          });
      })
    })
  })
})
