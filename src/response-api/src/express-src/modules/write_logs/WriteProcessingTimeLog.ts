import fs from 'fs';
import { hrTime, ConvertToMsFromNs } from '@/express-src/modules/write_logs/_modules';

export default class WriteProcessingTimeLog {
  readonly WRITTEN_FILE_DIRECTORY: string = process.env.LOG_PATH || "/home/logs/new/";
  readonly WRITTEN_FILE_NAME: string = process.env.DATABASE_SYSTEM + ".log";
  readonly WRITTEN_FILE_PATH: string = this.WRITTEN_FILE_DIRECTORY + this.WRITTEN_FILE_NAME;

  constructor() {}

  WriteLog(timer_db_end: hrTime, timer_node_end: hrTime, created_time: Date) {
    fs.appendFileSync( 
      this.WRITTEN_FILE_PATH, 
      this.Get_FullDateString( created_time ) + "," + 
      timer_db_end[1] + "," + 
      timer_node_end[1] + "\n",
    );
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
