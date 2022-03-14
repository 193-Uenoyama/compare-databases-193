import request from 'supertest';
import app from '@/express-src/app'
import db from '@/sequelize-src/models/index';
import { Seeding } from '@/jest-src/test-reserve/seeding'
import { CleanUp } from '@/jest-src/test-reserve/cleanup'

export default describe("Test the root path", () => {
  // seeding
  beforeEach( async () => {
    await Seeding();
  });

  // delete data
  afterEach( async () => {
    await CleanUp();
  });

  // 一旦コメントアウト
  // it("It should response the GET method", done => {
  //   request(app)
  //     .get("/")
  //     .then(response => {
  //       expect(response.statusCode).toBe(200);
  //       done();
  //     });
  // });
  //

  it("404 not found", async function() {
    await request(app)
      .get("/notfound")
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
  });
});

