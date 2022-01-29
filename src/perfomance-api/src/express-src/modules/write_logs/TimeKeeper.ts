import { DEFAULT_HRTIME, hrTime, ConvertToMsFromNs } from '@/express-src/modules/write_logs/_modules';
import WriteProcessingTimeLog from '@/express-src/modules/write_logs/WriteProcessingTimeLog'


export default class TimeKeeper {
  timer_start: hrTime;
  timer_db_end: hrTime;
  timer_node_end: hrTime;

  is_store_timer_db_end: boolean;
  is_store_timer_node_end: boolean;

  start_time: Date;
  write_logs: WriteProcessingTimeLog;

  constructor() {
    this.timer_start = process.hrtime();
    this.timer_db_end = DEFAULT_HRTIME;
    this.timer_node_end = DEFAULT_HRTIME;

    this.is_store_timer_db_end = false;
    this.is_store_timer_node_end = false;

    this.start_time = new Date();
    this.write_logs = new WriteProcessingTimeLog();
  }

  StoreDbEnd_IfPossibleOutLog() {
    this.timer_db_end = process.hrtime(this.timer_start);
    this.is_store_timer_db_end = true;
    this.IfPossibleOutLog();
  }
  StoreNodeEnd_IfPossibleOutLog() {
    this.timer_node_end = process.hrtime(this.timer_start);
    this.is_store_timer_node_end = true;
    this.IfPossibleOutLog();
  }

  IfPossibleOutLog() {
    // 処理時間を2つとも(node, db)取得できていなければ return
    console.log(
      this.is_store_timer_db_end,
      this.is_store_timer_node_end
    )
    let is_not_stored_yet: boolean = !(this.is_store_timer_node_end && this.is_store_timer_db_end);
    if (is_not_stored_yet) {
      return;
    }

    // 処理時間をログとして出力
    console.log(
      "database access ... " + this.timer_db_end[1] + "ナノ秒 " + 
        ConvertToMsFromNs(this.timer_db_end[1]) + "ミリ秒\n" +
      "nodejs process  ... " + this.timer_node_end[1] + "ナノ秒 " +
        ConvertToMsFromNs(this.timer_node_end[1]) + "ミリ秒"
    );

    // 処理時間をログファイルに書き込み
    this.write_logs.WriteLog(this.timer_db_end, this.timer_node_end, this.start_time);
  }

}
