import request from 'supertest';
import app from '@/express-src/app';
import { UserCommonAttributes, User } from '@/sequelize-src/models/user';
import { Group } from '@/sequelize-src/models/group';
import db from '@/sequelize-src/models/index';

export default describe("GroupMembersテーブルを操作するテスト", () => {
  describe("登録", () => {
    it("Groupに新しいMemberを挿入するテスト", async function() {
      await request(app)
        .post("/group/member/create")
        .send({
          groupId: 1,
          userId: 3,
        })
        .set('Accept', 'application/json')
        .then(response => {
          console.log("-----create-----");
          console.log(response.body);
          expect(response.statusCode).toBe(200);
        });
    });
  })

  // describe("参照", () => {
  // })

  // describe("削除", () => {
  // })
});
