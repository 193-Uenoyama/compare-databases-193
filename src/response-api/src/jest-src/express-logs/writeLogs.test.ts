import fs from 'fs';
import request from 'supertest';

import app from '@/express-src/app'
import TimeKeeper from '@/express-src/modules/processingLogStore/writeLogs/TimeKeeper';
import { 
  ReqLogDetail,
  ProcessDetail,
  ProcessingTimeLogFileDetail,
} from '@/express-src/modules/processingLogStore/processingLogModules';

import { RemoveLogFiles } from '@/jest-src/test-reserve/removeLogFiles';

export default describe("timekeeper のテスト", () => {
  beforeEach(() => {
    RemoveLogFiles();
  })

  afterEach( async () => {
    RemoveLogFiles();
  });

  describe("実行時間を計る", () => {
    it("invokeWriter Node", () => {
      const req_log_detail: ReqLogDetail = { 
        request_id: "sample_id", 
        request_start_time: "0000-00-00T00:00:00",
        is_unneed_calculate: false,
      }
      const process_detail: ProcessDetail = {
        state: "Success", 
        name: "Node",
      }

      let time_keeper = new TimeKeeper(req_log_detail);
      // 適当な処理
      for(let i = 0; i < 100; i++) {
        let total = 0;
        try{ total += i; }
        catch(err) {}
      }
      time_keeper.invokeWriter(process_detail);

      const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
      expect(log_content.toString()).toMatch(
        /Success,0000-00-00T00:00:00,sample_id,Node,\d*/);
    })

    it("invokeWriter DB", () => {
      const req_log_detail: ReqLogDetail = { 
        request_id: "sample_id", 
        request_start_time: "0000-00-00T00:00:00",
        is_unneed_calculate: false,
      }
      const process_detail: ProcessDetail = {
        state: "Success", 
        name: "Read",
        target_table: "Users",
      }

      let time_keeper = new TimeKeeper(req_log_detail);
      // 適当な処理
      for(let i = 0; i < 100; i++) {
        let total = 0;
        total += i;
      }
      time_keeper.invokeWriter(process_detail);

      const log_content = fs.readFileSync(ProcessingTimeLogFileDetail.path());
      expect(log_content.toString()).toMatch(
        /Success,0000-00-00T00:00:00,sample_id,DB,Read,Users,\d*/);
    })
  })

  describe("実行時間を計らない", () => {
    it("calculate to unneed", () => {
      const req_log_detail: ReqLogDetail = { 
        request_id: "sample_id", 
        request_start_time: "0000-00-00T00:00:00",
        is_unneed_calculate: true,
      }
      const process_detail: ProcessDetail = {
        state: "Success", 
        name: "Read",
        target_table: "Users",
      }

      let time_keeper = new TimeKeeper(req_log_detail);
      // 適当な処理
      for(let i = 0; i < 100; i++) {
        let total = 0;
        total += i;
      }
      time_keeper.invokeWriter(process_detail);

      expect( fs.existsSync(ProcessingTimeLogFileDetail.path()) ).toBe(false);
    })

    it("404 not found favicon", async function() {
      const uncalculate_response = await request(app).post("/favicon.ico")
      expect(uncalculate_response.statusCode).toBe(404);

      expect( fs.existsSync(ProcessingTimeLogFileDetail.path()) ).toBe(false);
    });
  })
}) 
