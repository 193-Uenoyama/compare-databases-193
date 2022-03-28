import fs from 'fs';
import request from 'supertest';
import app from '@/express-src/app';
import { 
  ProcessingTimeLogFileDetail,
} from '@/express-src/modules/processingLogStore/processingLogModules';
import db from '@/sequelize-src/models/index';
import { Seeding } from '@/jest-src/test-reserve/seeding'
import { CleanUp } from '@/jest-src/test-reserve/cleanup'
import { RemoveLogFiles } from '@/jest-src/test-reserve/removeLogFiles';

export default describe("GroupMembersを操作するときに実行時間を計測する", () => {
  // seeding
  beforeEach( async () => {
    await Seeding();
    RemoveLogFiles();
  });

  // delete data
  afterEach( async () => {
    await CleanUp();
    RemoveLogFiles();
  });

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

    const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
    const log_content_str = log_content.toString();
    expect(log_content_str).toMatch(/Success/);
    expect(log_content_str).toMatch(/DB/);
    expect(log_content_str).toMatch(/Create/);
    expect(log_content_str).toMatch(/Node/);
    expect(log_content_str).not.toMatch(/Error/);

    const log_content_lines = log_content_str.match(/\n/g)
    const log_content_num_lines = log_content_lines == null? 1 : log_content_lines.length + 1;
    expect(log_content_num_lines).toBe(2);
  });

  it("groupのmemberを参照するテスト", async function() {
    const test_target_group = await db.Groups.findOne({
      where: { groupName: 'kitamura\'s', }
    });

    const response = await request(app)
      .get("/group/member/read/" + test_target_group.groupId)
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(200);
    expect(response.body.is_success).toBe(true);

    const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
    const log_content_str = log_content.toString();
    expect(log_content_str).toMatch(/Success/);
    expect(log_content_str).toMatch(/DB/);
    expect(log_content_str).toMatch(/Read/);
    expect(log_content_str).toMatch(/Node/);
    expect(log_content_str).not.toMatch(/Error/);

    const log_content_lines = log_content_str.match(/\n/g)
    const log_content_num_lines = log_content_lines == null? 1 : log_content_lines.length + 1;
    expect(log_content_num_lines).toBe(2);
  });

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

    const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
    const log_content_str = log_content.toString();
    expect(log_content_str).toMatch(/Success/);
    expect(log_content_str).toMatch(/DB/);
    expect(log_content_str).toMatch(/Delete/);
    expect(log_content_str).toMatch(/Node/);
    expect(log_content_str).not.toMatch(/Error/);

    const log_content_lines = log_content_str.match(/\n/g)
    const log_content_num_lines = log_content_lines == null? 1 : log_content_lines.length + 1;
    expect(log_content_num_lines).toBe(2);
  });

});
