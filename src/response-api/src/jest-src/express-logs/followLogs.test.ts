import fs from 'fs';
import request from 'supertest';
import app from '@/express-src/app';
import { User } from '@/sequelize-src/models/user';
import { Group } from '@/sequelize-src/models/group';
import db from '@/sequelize-src/models/index';
import { 
  ProcessingTimeLogFileDetail,
} from '@/express-src/modules/processingLogStore/processingLogModules';
import { Seeding } from '@/jest-src/test-reserve/seeding'
import { CleanUp } from '@/jest-src/test-reserve/cleanup'
import { RemoveLogFiles } from '@/jest-src/test-reserve/removeLogFiles';

export default describe("Followsを操作するときに実行時間を計測する", () => {
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
    it("userがuserをフォローする", async function() {
      const test_target_follower = await db.Users.findOne({
        where: { firstName: 'yamada', }
      });
      const test_target_followed = await db.Users.findOne({
        where: { firstName: 'ccc', }
      });

      const response = await request(app)
        .post("/user/follow/create")
        .send({
          followedUserId: test_target_followed.userId,
          followerUserId: test_target_follower.userId, })
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
      const log_content_num_lines = log_content_lines == null? 0 : log_content_lines.length;
      expect(log_content_num_lines).toBe(2);
    });

    it("is_unneed_calculateがtrueの時、時間を測らない", async function() {
      const test_target_follower = await db.Users.findOne({
        where: { firstName: 'yamada', }
      });
      const test_target_followed = await db.Users.findOne({
        where: { firstName: 'ccc', }
      });

      const response = await request(app)
        .post("/user/follow/create")
        .send({
          followedUserId: test_target_followed.userId,
          followerUserId: test_target_follower.userId,
          is_unneed_calculate: true, })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      expect( fs.existsSync(ProcessingTimeLogFileDetail.path()) ).toBe(false);
    });
  })

  describe("参照", () => {
    it("指定したユーザのフォロワーを参照するテスト", async function() {
      const test_target_followed = await db.Users.findOne({
        where: { firstName: 'John', }
      });
      const test_target_follower = await db.Users.findOne({
        where: { firstName: 'yamada'}
      })
      await test_target_followed.addFollower(test_target_follower);

      const response = await request(app)
        .post("/user/follow/read/getfollower")
        .send({ followedUserId: test_target_followed.userId, })
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
      const log_content_num_lines = log_content_lines == null? 0 : log_content_lines.length;
      expect(log_content_num_lines).toBe(2);
    });

    it("is_unneed_calculateがtrueの時、時間を測らない", async function() {
      const test_target_followed = await db.Users.findOne({
        where: { firstName: 'John', }
      });
      const test_target_follower = await db.Users.findOne({
        where: { firstName: 'yamada'}
      })
      await test_target_followed.addFollower(test_target_follower);

      const response = await request(app)
        .post("/user/follow/read/getfollower")
        .send({
          followedUserId: test_target_followed.userId,
          is_unneed_calculate: true, })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      expect( fs.existsSync(ProcessingTimeLogFileDetail.path()) ).toBe(false);
    });

    it("指定したユーザがフォローしているユーザを参照するテスト", async function() {
      const test_target_followed = await db.Users.findOne({
        where: { firstName: 'John', }
      });
      const test_target_follower = await db.Users.findOne({
        where: { firstName: 'yamada'}
      })
      await test_target_followed.addFollower(test_target_follower);

      const response = await request(app)
        .post("/user/follow/read/getfollowed")
        .send({ followerUserId: test_target_follower.userId, })
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
      const log_content_num_lines = log_content_lines == null? 0 : log_content_lines.length;
      expect(log_content_num_lines).toBe(2);
    });

    it("is_unneed_calculateがtrueの時、時間を測らない", async function() {
      const test_target_followed = await db.Users.findOne({
        where: { firstName: 'John', }
      });
      const test_target_follower = await db.Users.findOne({
        where: { firstName: 'yamada'}
      })
      await test_target_followed.addFollower(test_target_follower);

      const response = await request(app)
        .post("/user/follow/read/getfollowed")
        .send({ 
          followerUserId: test_target_follower.userId,
          is_unneed_calculate: true, })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      expect( fs.existsSync(ProcessingTimeLogFileDetail.path()) ).toBe(false);
    });
  })

  describe("削除", () => {
    it("フォローを解除するテスト", async function() {
      const test_target_followed = await db.Users.findOne({
        where: { firstName: 'John', }
      });
      const test_target_follower_continue = await db.Users.findOne({
        where: { firstName: 'yamada'}
      })
      const test_target_follower_quit = await db.Users.findOne({
        where: { firstName: 'ccc'}
      })
      await test_target_followed.addFollower(test_target_follower_continue);
      await test_target_followed.addFollower(test_target_follower_quit);

      const response = await request(app)
        .post("/user/follow/delete")
        .send({
          followedUserId: test_target_followed.userId,
          followerUserId: test_target_follower_quit.userId, })
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
      const log_content_num_lines = log_content_lines == null? 0 : log_content_lines.length;
      expect(log_content_num_lines).toBe(2);
    });

    it("is_unneed_calculateがtrueの時、時間を測らない", async function() {
      const test_target_followed = await db.Users.findOne({
        where: { firstName: 'John', }
      });
      const test_target_follower_continue = await db.Users.findOne({
        where: { firstName: 'yamada'}
      })
      const test_target_follower_quit = await db.Users.findOne({
        where: { firstName: 'ccc'}
      })
      await test_target_followed.addFollower(test_target_follower_continue);
      await test_target_followed.addFollower(test_target_follower_quit);

      const response = await request(app)
        .post("/user/follow/delete")
        .send({
          followedUserId: test_target_followed.userId,
          followerUserId: test_target_follower_quit.userId,
          is_unneed_calculate: true, })
        .set('Accept', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      expect( fs.existsSync(ProcessingTimeLogFileDetail.path()) ).toBe(false);
    });
  })
});
