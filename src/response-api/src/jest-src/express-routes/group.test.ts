import request from 'supertest';
import app from '@/express-src/app';
import { UserCommonAttributes, User } from '@/sequelize-src/models/user';
import { Group } from '@/sequelize-src/models/group';
import db from '@/sequelize-src/models/index';

export default describe("Groupsテーブルを操作するテスト", () =>{

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
