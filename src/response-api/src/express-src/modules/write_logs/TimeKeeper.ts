import { 
  hrTime, 
  ProcessDetail,
} from '@/express-src/modules/write_logs/_modules';
import WriteProcessingTimeLog from '@/express-src/modules/write_logs/WriteProcessingTimeLog'

export default class TimeKeeper {
  timer_start: hrTime = process.hrtime();
  timer_split_or_end: hrTime = [-1, -1];

  request_id: string = Math.random().toString(32).substring(2);
  start_time: string = this.Get_FullDateString(new Date());

  writer: WriteProcessingTimeLog;

  constructor() {
    this.writer = new WriteProcessingTimeLog(this.request_id, this.start_time);
  }

  invokeWriter(process_detail: ProcessDetail) {
    this.timer_split_or_end = process.hrtime(this.timer_start);
    if( process_detail.name == "Node" ) {
      this.writer.WriteNodeLog(
        process_detail.state,
        process_detail.name,
        this.timer_split_or_end
      );
    }
    else {
      this.writer.WriteDbLog(
        process_detail.state,
        process_detail.name, 
        process_detail.target_table, 
        this.timer_split_or_end
      );
    }
  }

  // 日付データ(now)を文字列に変換する
  Get_FullDateString(now: Date): string {
    now.setTime(now.getTime() + 1000 * 60 * 60 * 9);
    let year:string = this.AdjustDigits(now.getFullYear(), 4);
    let month:string = this.AdjustDigits(( now.getMonth() + 1 ), 2);
    let date:string = this.AdjustDigits(now.getDate(), 2);
    let hours:string = this.AdjustDigits(now.getHours(), 2);
    let minutes:string = this.AdjustDigits(now.getMinutes(), 2);
    let seconds:string = this.AdjustDigits(now.getSeconds(), 2);
    return year+"-"+month+"-"+date+"T"+hours+":"+minutes+":"+seconds;
  }
  // target の 桁数が digits より小さかったらその分だけ0を入れる
  AdjustDigits(target: number, digits: number): string {
    return ( Array(digits + 1).join('0') + target.toString() ).slice(-digits);
  }

}
