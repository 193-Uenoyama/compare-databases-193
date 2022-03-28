import request from 'supertest';
import app from '@/express-src/app';
import { Group } from '@/sequelize-src/models/group';
import db from '@/sequelize-src/models/index';
import { Seeding } from '@/jest-src/test-reserve/seeding'
import { CleanUp } from '@/jest-src/test-reserve/cleanup'

export default describe("Groupsテーブルを操作するテスト", () =>{
  // seeding
  beforeEach( async () => {
    await Seeding();
  });

  // delete data
  afterEach( async () => {
    await CleanUp();
  });

  describe("登録", () => {
    it("Groupに新しいデータを挿入するテスト", async function() {
      const response = await request(app)
        .post("/group/create")
        .send({ groupName: 'new! team', })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      const response_group: Group = response.body.created_group;
      const created_group: Group = await db.Groups.findOne({
        where: { groupId: response_group.groupId }
      });
      expect(created_group.groupName).toBe("new! team")
    });

    describe("Group登録validationエラー", () => {
      it("GroupNameが空っぽ", async function() {
        const response = await request(app)
          .post("/group/create")
          .send({})
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("GroupName is a required field");
      });
    })
  })

  describe("参照", () => {
    it("Groupを読み込むテスト", async function() {
      const response = await request(app).get("/group/read")

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      const will_read_group = await db.Groups.findOne({
        where: { groupName: 'A project team' }
      })
      const readed_group: Group = response.body.readed_groups.find(( group: Group ) => {
        return group.groupId == will_read_group.groupId
      });

      expect(will_read_group.groupName).toBe(readed_group.groupName);
      expect(will_read_group.groupIntroduction).toBe(readed_group.groupIntroduction);
    });
  })

  describe("更新", () => {
    it("Groupを更新するテスト", async function() {
      let will_update_group: Group = await db.Groups.findOne({
        where: { groupName: 'A project team', }
      });

      const response = await request(app)
        .post("/group/update")
        .send({
          groupId: will_update_group.groupId,
          groupIntroduction: 'We are team!' })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      await will_update_group.reload();
      expect(response.body.updated_group.groupIntroduction).toBe(will_update_group.groupIntroduction);
    })

    describe("Group更新 validationエラー", () => {
      it("groupIdが空", async function() {
        const response = await request(app)
          .post("/group/update")
          .send({ groupIntroduction: 'We are team!' })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("GroupID is a required field");
      })

      it("groupIdが文字列", async function() {
        const response = await request(app)
          .post("/group/update")
          .send({
            groupId: "moji",
            groupIntroduction: 'We are team!'
          })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("GroupID is a number");
      })

      it("groupId以外が空", async function() {
        const test_target_group: Group = await db.Groups.findOne({
          where: { groupName: 'A project team', }
        });

        const response = await request(app)
          .post("/group/update")
          .send({ groupId: test_target_group.groupId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("could not find parameter to update");
      })

    })
  })

  describe("削除", () => {
    it("Groupを削除するテスト", async function() {
      const will_delete_group: Group = await db.Groups.findOne({
        where: { groupName: 'A project team', }
      });

      const response = await request(app)
        .post("/group/delete")
        .send({ groupId: will_delete_group.groupId })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);
      expect(response.body.deleted_group.groupId).toBe(will_delete_group.groupId);

      const deleted_group: Group = await db.Groups.findOne({
        where: { groupName: 'A project team', }
      });
      expect(deleted_group).toBe(null);
    })

    describe("Group削除 validationエラー", () => {
      it("groupId入力なし", async function() {
        const response = await request(app)
          .post("/group/delete")
          .send({})
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("GroupID is a required field");
      })

      it("groupId文字列入力", async function() {
        const response = await request(app)
          .post("/group/delete")
          .send({ groupId: "aaa" })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("GroupID is a number");
      })
    })
  })
})
