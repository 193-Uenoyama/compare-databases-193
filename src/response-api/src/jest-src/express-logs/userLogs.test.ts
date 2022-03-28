import fs from 'fs';
import request from 'supertest';
import { ValidationError } from 'express-validator';
import app from '@/express-src/app';
import { User } from '@/sequelize-src/models/user';
import { 
  ProcessingTimeLogFileDetail,
} from '@/express-src/modules/processingLogStore/processingLogModules';
import db from '@/sequelize-src/models/index';
import { Seeding } from '@/jest-src/test-reserve/seeding'
import { CleanUp } from '@/jest-src/test-reserve/cleanup'
import { RemoveLogFiles } from '@/jest-src/test-reserve/removeLogFiles';


export default describe("Userを操作するときに実行時間を計測する", () =>{
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

  it("Userを読み込むテスト", async function() {
    const response = await request(app) .get("/user/read")

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
