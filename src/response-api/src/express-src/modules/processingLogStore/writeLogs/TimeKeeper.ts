import { ProcessDetail, ReqLogDetail } from '@/express-src/modules/processingLogStore/processingLogModules';
import ProcessingTimeLogWriter from '@/express-src/modules/processingLogStore/writeLogs/WriteProcessingTimeLog'

export default class TimeKeeper {
  timer_start_time: bigint;
  req_log_detail: ReqLogDetail;


  constructor(req_log_detail: ReqLogDetail) {
    this.req_log_detail = req_log_detail;
    this.timer_start_time = process.hrtime.bigint();
  }

  static async calculateProcessingTime<T>(
    func: Function, 
    req_log_detail: ReqLogDetail, 
    process_detail: ProcessDetail): Promise<T> {

    const processTimer = new TimeKeeper(req_log_detail);
    let value: T = await func();
    processTimer.invokeWriter(process_detail);

    return value;
  }

  // writerにログを書かせる
  invokeWriter(process_detail: ProcessDetail) {
    if (this.req_log_detail.is_unneed_calculate) {
      return;
    }

    let timer_time_now = process.hrtime.bigint();
    ProcessingTimeLogWriter.decideLogMethod(
      this.req_log_detail,
      process_detail,
      timer_time_now - this.timer_start_time,
    );
  }

}
