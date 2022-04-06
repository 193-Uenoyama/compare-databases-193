import fs from 'fs';
import request from 'supertest';
import app from '@/express-src/app';
import { Group } from '@/sequelize-src/models/group';
import { 
  ProcessingTimeLogFileDetail,
} from '@/express-src/modules/processingLogStore/processingLogModules';
import db from '@/sequelize-src/models/index';
import { Seeding } from '@/jest-src/test-reserve/seeding'
import { CleanUp } from '@/jest-src/test-reserve/cleanup'
import { RemoveLogFiles } from '@/jest-src/test-reserve/removeLogFiles';

export default describe("Groupを操作するときに実行時間を計測する", () =>{
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

  it("Groupに新しいデータを挿入するテスト", async function() {
    const response = await request(app)
      .post("/group/create")
      .send({ groupName: 'new! team', })
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

  it("Groupを読み込むテスト", async function() {
    const response = await request(app).get("/group/read")

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

    const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
    const log_content_str = log_content.toString();
    expect(log_content_str).toMatch(/Success/);
    expect(log_content_str).toMatch(/DB/);
    expect(log_content_str).toMatch(/Update/);
    expect(log_content_str).toMatch(/Node/);
    expect(log_content_str).not.toMatch(/Error/);

    const log_content_lines = log_content_str.match(/\n/g)
    const log_content_num_lines = log_content_lines == null? 1 : log_content_lines.length + 1;
    expect(log_content_num_lines).toBe(2);
  })

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
  })
})
