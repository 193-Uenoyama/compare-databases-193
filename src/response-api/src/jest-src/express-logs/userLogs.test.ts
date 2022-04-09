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

  describe("登録", () => {

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
      expect(log_content.toString()).toMatch(/Success,\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2},[^,]*,DB,Create,Users,\d*/);
      expect(log_content.toString()).toMatch(/Success,\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2},[^,]*,Node,\d*/);
      expect(log_content_str).not.toMatch(/Error/);

      const log_content_lines = log_content_str.match(/\n/g)
      const log_content_num_lines = log_content_lines == null? 0 : log_content_lines.length;
      expect(log_content_num_lines).toBe(2);
    });

    it("is_unneed_calculateがtrueの時、時間を測らない", async function() {
      const response = await request(app)
        .post("/user/create")
        .send({
          firstName: "happy",
          lastName: "boy",
          email: "happy@gmail.com",
          introduction: "Hello! I am happy!",
          is_unneed_calculate: true, })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      expect( fs.existsSync(ProcessingTimeLogFileDetail.path()) ).toBe(false);
    });
  })

  describe("参照", () => {
    it("Userを読み込むテスト", async function() {
      const response = await request(app)
        .post("/user/read")
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
      const log_content_str = log_content.toString();
      expect(log_content.toString()).toMatch(/Success,\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2},[^,]*,DB,Read,Users,\d*/);
      expect(log_content.toString()).toMatch(/Success,\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2},[^,]*,Node,\d*/);
      expect(log_content_str).not.toMatch(/Error/);

      const log_content_lines = log_content_str.match(/\n/g)
      const log_content_num_lines = log_content_lines == null? 0 : log_content_lines.length;
      expect(log_content_num_lines).toBe(2);
    });

    it("is_unneed_calculateがtrueの時、時間を測らない", async function() {
      const response = await request(app)
        .post("/user/read")
        .send({ is_unneed_calculate: true })
        .set('Accept', 'application/json');
          
      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      expect( fs.existsSync(ProcessingTimeLogFileDetail.path()) ).toBe(false);
    });
  })

  describe("更新", () => {
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
      expect(log_content.toString()).toMatch(/Success,\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2},[^,]*,DB,Update,Users,\d*/);
      expect(log_content.toString()).toMatch(/Success,\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2},[^,]*,Node,\d*/);
      expect(log_content_str).not.toMatch(/Error/);

      const log_content_lines = log_content_str.match(/\n/g)
      const log_content_num_lines = log_content_lines == null? 0 : log_content_lines.length;
      expect(log_content_num_lines).toBe(2);
    })

    it("is_unneed_calculateがtrueの時、時間を測らない", async function() {
      const will_update_user: User = await db.Users.findOne({
        where: { firstName: "aaa" }
      });

      const response = await request(app)
        .post("/user/update")
        .send({
          userId: will_update_user.userId,
          lastName: 'kousaku',
          is_unneed_calculate: true, })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      expect( fs.existsSync(ProcessingTimeLogFileDetail.path()) ).toBe(false);
    });
  })

  describe("削除", () => {
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
      expect(log_content.toString()).toMatch(/Success,\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2},[^,]*,DB,Delete,Users,\d*/);
      expect(log_content.toString()).toMatch(/Success,\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2},[^,]*,Node,\d*/);
      expect(log_content_str).not.toMatch(/Error/);

      const log_content_lines = log_content_str.match(/\n/g)
      const log_content_num_lines = log_content_lines == null? 0 : log_content_lines.length;
      expect(log_content_num_lines).toBe(2);
    });

    it("is_unneed_calculateがtrueの時、時間を測らない", async function() {
      const will_delete_user: User = await db.Users.findOne({
        where: { firstName: "yamada", }
      });

      const response = await request(app)
        .post("/user/delete")
        .send({ 
          userId: will_delete_user.userId,
          is_unneed_calculate: true, })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      expect( fs.existsSync(ProcessingTimeLogFileDetail.path()) ).toBe(false);
    });
  });
});
