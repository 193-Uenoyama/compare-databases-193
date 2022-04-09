import fs from 'fs';
import request from 'supertest';
import app from '@/express-src/app';
import { 
  ProcessingTimeLogFileDetail,
} from '@/express-src/modules/processingLogStore/processingLogModules';
import db from '@/sequelize-src/models/index';
import { Seeding } from '@/jest-src/test-reserve/seeding'
import { CleanUp } from '@/jest-src/test-reserve/cleanup'

export default describe("GroupMembersテーブルを操作するテスト", () => {
  // seeding
  beforeEach( async () => {
    await Seeding();
  });

  // delete data
  afterEach( async () => {
    await CleanUp();
  });

  describe("登録", () => {
    it("Groupに新しいMemberを挿入するテスト", async function() {
      // ユーザとグループを用意
      const test_target_group = await db.Groups.findOne({
        where: { groupName: 'A project team', }
      });
      const test_target_user = await db.Users.findOne({
        where: { firstName: 'yamada', }
      });

      // supertestで通信
      const response = await request(app)
        .post("/group/member/create")
        .send({
          groupId: test_target_group.groupId,
          userId: test_target_user.userId, })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      //用意したユーザが response のグループに所属しているか
      const belonged_to_group = await db.Groups.findAll({
        where: { groupId: response.body.belonged_group.groupId },
        include: [ 'Members' ],
      });
      expect(belonged_to_group[0].Members[0].firstName).toBe('yamada');
    });

    describe("GroupMember挿入 validationエラー", () => {
      it("userIdが空っぽ", async () => {
        const test_target_group = await db.Groups.findOne({
          where: { groupName: 'A project team', }
        });

        const response = await request(app)
          .post("/group/member/create")
          .send({ groupId: test_target_group.groupId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("UserID is a required field");
      });

      it("groupIdが空っぽ", async () => {
        const test_target_user = await db.Users.findOne({
          where: { firstName: 'yamada', }
        });

        const response = await request(app)
          .post("/group/member/create")
          .send({ userId: test_target_user.userId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("GroupID is a required field");
      });

      it("userIdが文字列", async () => {
        const test_target_group = await db.Groups.findOne({
          where: { groupName: 'A project team', }
        });

        const response = await request(app)
          .post("/group/member/create")
          .send({
            userId: "aaa",
            groupId: test_target_group.groupId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("UserID is a number");
      });

      it("groupIdが文字列", async () => {
        const test_target_user = await db.Users.findOne({
          where: { firstName: 'yamada', }
        });

        const response = await request(app)
          .post("/group/member/create")
          .send({
            userId: test_target_user.userId,
            groupId: "aaa", })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("GroupID is a number");
      });
    });
  })

  describe("参照", () => {
    it("groupのmemberを参照するテスト", async function() {
      const test_target_group = await db.Groups.findOne({
        where: { groupName: 'kitamura\'s', }
      });

      const response = await request(app)
        .post("/group/member/read")
        .send({ groupId: test_target_group.groupId,})
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      expect(response.body.readed_group.Members[0].firstName).toBe('John');
      expect(response.body.readed_group.Members[1].firstName).toBe('Kitamura');
    });

    describe("GroupMember参照 validationエラー", () => {
      it("groupIdが文字列", async () => {
        const response = await request(app)
          .post("/group/member/read")
          .send({ groupId: "mojitetsu",})
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("GroupID is a number");
      });

    })
  })

  describe("削除", () => {
    it("groupからmemberを削除するテスト", async function() {
      const test_target_group = await db.Groups.findOne({
        where: { groupName: 'kitamura\'s', }
      });
      const test_target_user = await db.Users.findOne({
        where: { firstName: 'John', }
      });

      const response = await request(app)
        .post("/group/member/delete")
        .send({
          groupId: test_target_group.groupId,
          userId: test_target_user.userId, })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      //用意したユーザが response のグループに所属しているか
      const member_reduced_group = await db.Groups.findAll({
        where: { groupId: test_target_group.groupId, },
        include: [ 'Members' ],
      });
      expect(member_reduced_group[0].Members[0].firstName).toBe('Kitamura');
      expect(member_reduced_group[0].Members[1]).toBe(undefined);
    });

    describe("GroupMember削除 validationエラー", () => {
      it("userIdが空っぽ", async () => {
        const test_target_group = await db.Groups.findOne({
          where: { groupName: 'A project team', }
        });

        const response = await request(app)
          .post("/group/member/delete")
          .send({ groupId: test_target_group.groupId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("UserID is a required field");
      });

      it("groupIdが空っぽ", async () => {
        const test_target_user = await db.Users.findOne({
          where: { firstName: 'yamada', }
        });

        const response = await request(app)
          .post("/group/member/delete")
          .send({ userId: test_target_user.userId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("GroupID is a required field");
      });

      it("userIdが文字列", async () => {
        const test_target_group = await db.Groups.findOne({
          where: { groupName: 'A project team', }
        });

        const response = await request(app)
          .post("/group/member/delete")
          .send({
            userId: "moji",
            groupId: test_target_group.groupId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("UserID is a number");
      });

      it("groupIdが文字列", async () => {
        const test_target_user = await db.Users.findOne({
          where: { firstName: 'yamada', }
        });

        const response = await request(app)
          .post("/group/member/delete")
          .send({
            userId: test_target_user.userId,
            groupId: "moji", })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("GroupID is a number");
      });
    });
  })
});
