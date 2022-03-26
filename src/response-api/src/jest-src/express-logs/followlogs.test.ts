import fs from 'fs';
import request from 'supertest';
import app from '@/express-src/app';
import { UserCommonAttributes, User } from '@/sequelize-src/models/user';
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

  it("userがuserをフォローする", async function() {
    // ユーザを二人用意
    const test_target_follower = await db.Users.findOne({
      where: { firstName: 'yamada', }
    });
    const test_target_followed = await db.Users.findOne({
      where: { firstName: 'ccc', }
    });

    // supertestで通信
    const response = await request(app)
      .post("/user/follow/create")
      .send({
        followedUserId: test_target_followed.userId,
        followerUserId: test_target_follower.userId, })
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(200);

    const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
    const log_content_lines = log_content.toString();
    expect(log_content_lines).toMatch(/Success/);
    expect(log_content_lines).toMatch(/Create/);
    expect(log_content_lines).not.toMatch(/Error/);
    expect(log_content_lines.match(/\n/g)).toBe(null);
  });

  it("指定したユーザのフォロワーを参照するテスト", async function() {
    const test_target_followed = await db.Users.findOne({
      where: { firstName: 'John', }
    });
    const test_target_follower = await db.Users.findOne({
      where: { firstName: 'yamada'}
    })
    await test_target_followed.addFollower(test_target_follower);

    // supertestで通信
    const response = await request(app)
      .get("/user/follow/read/getfollower/" + test_target_followed.userId)
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(200);

    const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
    const log_content_lines = log_content.toString();
    expect(log_content_lines).toMatch(/Success/);
    expect(log_content_lines).toMatch(/Read/);
    expect(log_content_lines).not.toMatch(/Error/);
    expect(log_content_lines.match(/\n/g)).toBe(null);
  });

  it("指定したユーザがフォローしているユーザを参照するテスト", async function() {
    const test_target_followed = await db.Users.findOne({
      where: { firstName: 'John', }
    });
    const test_target_follower = await db.Users.findOne({
      where: { firstName: 'yamada'}
    })
    await test_target_followed.addFollower(test_target_follower);

    // supertestで通信
    const response = await request(app)
      .get("/user/follow/read/getfollowed/" + test_target_follower.userId)
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(200);

    const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
    const log_content_lines = log_content.toString();
    expect(log_content_lines).toMatch(/Success/);
    expect(log_content_lines).toMatch(/Read/);
    expect(log_content_lines).not.toMatch(/Error/);
    expect(log_content_lines.match(/\n/g)).toBe(null);
  });

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

    // supertestで通信
    const response = await request(app)
      .post("/user/follow/delete")
      .send({
        followedUserId: test_target_followed.userId,
        followerUserId: test_target_follower_quit.userId, })
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
