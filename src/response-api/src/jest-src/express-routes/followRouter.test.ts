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

export default describe("Followsテーブルを操作するテスト", () => {
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
      expect(response.body.is_success).toBe(true);
      expect(response.body.created_follow.followedUserId).toBe(test_target_followed.userId);
      expect(response.body.created_follow.followerUserId).toBe(test_target_follower.userId);

      //用意したユーザが response のグループに所属しているか
      await test_target_follower.reload();
      const followed_users = await test_target_follower.getFollowed();
      const followed_userNames = followed_users.map((item: User) => {
        return item.firstName;
      })
      expect(followed_userNames).toContain('ccc');
    });

    describe("Follows挿入 validationエラー", () => {
      it("followedUserIdが空っぽ", async () => {
        const test_target_user = await db.Users.findOne({
          where: { firstName: 'yamada', }
        });
 
        const response = await request(app)
          .post("/user/follow/create")
          .send({
            followerUserId: test_target_user.userId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("followedUserId is a required field");
      });
 
      it("followerUserIdが空っぽ", async () => {
        const test_target_user = await db.Users.findOne({
          where: { firstName: 'yamada', }
        });
 
        const response = await request(app)
          .post("/user/follow/create")
          .send({ followedUserId: test_target_user.userId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("followerUserId is a required field");
      });
 
 
      it("followedUserIdが文字列", async () => {
        const test_target_user = await db.Users.findOne({
          where: { firstName: 'yamada', }
        });
 
        const response = await request(app)
          .post("/user/follow/create")
          .send({
            followedUserId: "aaa",
            followerUserId: test_target_user.userId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("followedUserId is a number");
      });
 
      it("followerUserIdが文字列", async () => {
        const test_target_user = await db.Users.findOne({
          where: { firstName: 'yamada', }
        });
 
        const response = await request(app)
          .post("/user/follow/create")
          .send({
            followedUserId: test_target_user.userId,
            followerUserId: "aaa", })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("followerUserId is a number");
      });
    });
  })

  describe("参照", () => {

    describe("read follower", () => {
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
        expect(response.body.is_success).toBe(true);

        const Johns_follower = response.body.followers.Follower.map((item: User) => {
          return item.firstName;
        })
        expect(Johns_follower).toContain('yamada');
      });

      describe("follower参照 validationエラー", () => {
        it("followerUserIdが文字列", async () => {
          const response = await request(app)
            .get("/user/follow/read/getfollower/mojitetsu")
            .set('Accept', 'application/json')

          expect(response.statusCode).toBe(400);
          expect(response.body.errors.length).toBe(1);
          expect(response.body.errors[0].msg).toBe("followedUserId is a number");
        });
      })
    })

    describe("read followed", () => {
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
        expect(response.body.is_success).toBe(true);

        const yamadas_followed = response.body.followeds.Followed.map((item: User) => {
          return item.firstName;
        })
        expect(yamadas_followed).toContain('John');
      });

      describe("followed参照 validationエラー", () => {

        it("followedUserIdが文字列", async () => {
          const response = await request(app)
            .get("/user/follow/read/getfollowed/mojitetsu")
            .set('Accept', 'application/json')
            
          expect(response.statusCode).toBe(400);
          expect(response.body.errors.length).toBe(1);
          expect(response.body.errors[0].msg).toBe("followerUserId is a number");
        });
      })
    })
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

      // supertestで通信
      const response = await request(app)
        .post("/user/follow/delete")
        .send({
          followedUserId: test_target_followed.userId,
          followerUserId: test_target_follower_quit.userId, })
        .set('Accept', 'application/json')
        
      expect(response.statusCode).toBe(200);
      expect(response.body.is_success).toBe(true);

      await test_target_followed.reload();
      const followers = await test_target_followed.getFollower();
      const follower_names = followers.map(( item: User ) => {
        return item.firstName;
      })
      //用意したユーザが response のグループに所属しているか
      expect(follower_names).toContain('yamada');
      expect(follower_names).not.toContain('ccc');
    });

    describe("Follows削除 validationエラー", () => {
      it("followedUserIdが空っぽ", async () => {
        const test_target_user = await db.Users.findOne({
          where: { firstName: 'yamada', }
        });
 
        const response = await request(app)
          .post("/user/follow/delete")
          .send({ followerUserId: test_target_user.userId, })
          .set('Accept', 'application/json')
          
        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("followedUserId is a required field");
      });
 
      it("followerUserIdが空っぽ", async () => {
        const test_target_user = await db.Users.findOne({
          where: { firstName: 'yamada', }
        });
 
        const response = await request(app)
          .post("/user/follow/delete")
          .send({ followedUserId: test_target_user.userId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("followerUserId is a required field");
      });
 
 
      it("followedUserIdが文字列", async () => {
        const test_target_user = await db.Users.findOne({
          where: { firstName: 'yamada', }
        });
 
        const response = await request(app)
          .post("/user/follow/delete")
          .send({
            followedUserId: "aaa",
            followerUserId: test_target_user.userId, })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("followedUserId is a number");
      });
 
      it("followerUserIdが文字列", async () => {
        const test_target_user = await db.Users.findOne({
          where: { firstName: 'yamada', }
        });
 
        const response = await request(app)
          .post("/user/follow/delete")
          .send({
            followedUserId: test_target_user.userId,
            followerUserId: "aaa", })
          .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.errors.length).toBe(1);
        expect(response.body.errors[0].msg).toBe("followerUserId is a number");
      });
    });
  })
});
