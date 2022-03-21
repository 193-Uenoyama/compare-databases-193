import request from 'supertest';
import app from '@/express-src/app'

export default describe("Test the root path", () => {
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

  it("404 not found favicon", async function() {
    await request(app)
      .get("/favicon.ico")
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
  });
});

