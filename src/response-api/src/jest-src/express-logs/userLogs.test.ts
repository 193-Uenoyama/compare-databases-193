import fs from 'fs';
import request from 'supertest';
import { ValidationError } from 'express-validator';
import app from '@/express-src/app';
import { UserCommonAttributes, User } from '@/sequelize-src/models/user';
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

    const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
    const log_content_lines = log_content.toString();
    expect(log_content_lines).toMatch(/Success/);
    expect(log_content_lines).toMatch(/Create/);
    expect(log_content_lines).not.toMatch(/Error/);
    expect(log_content_lines.match(/\n/g)).toBe(null);
  });

  it("Userを読み込むテスト", async function() {
    const response = await request(app) .get("/user/read")
    expect(response.statusCode).toBe(200);

    const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
    const log_content_lines = log_content.toString();
    expect(log_content_lines).toMatch(/Success/);
    expect(log_content_lines).toMatch(/Read/);
    expect(log_content_lines).not.toMatch(/Error/);
    expect(log_content_lines.match(/\n/g)).toBe(null);
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

    const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
    const log_content_lines = log_content.toString();
    expect(log_content_lines).toMatch(/Success/);
    expect(log_content_lines).toMatch(/Update/);
    expect(log_content_lines).not.toMatch(/Error/);
    expect(log_content_lines.match(/\n/g)).toBe(null);
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

    const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
    const log_content_lines = log_content.toString();
    expect(log_content_lines).toMatch(/Success/);
    expect(log_content_lines).toMatch(/Delete/);
    expect(log_content_lines).not.toMatch(/Error/);
    expect(log_content_lines.match(/\n/g)).toBe(null);
  });

});
