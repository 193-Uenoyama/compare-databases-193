import fs from 'fs';
import { hrTime, ConvertToMsFromNs } from '@/express-src/modules/write_logs/_modules';

export default class WriteProcessingTimeLog {
  readonly WRITTEN_FILE_DIRECTORY: string = process.env.LOG_PATH || "/home/logs/";
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

  Get_FullDateString(target: Date): string {
    target.setTime(target.getTime() + 1000 * 60 * 60 * 9);
    let year:string = this.AdjustDigits(target.getFullYear(), 4);
    let month:string = this.AdjustDigits(( target.getMonth() + 1 ), 2);
    let date:string = this.AdjustDigits(target.getDate(), 2);
    let hours:string = this.AdjustDigits(target.getHours(), 2);
    let minutes:string = this.AdjustDigits(target.getMinutes(), 2);
    let seconds:string = this.AdjustDigits(target.getSeconds(), 2);
    return year+"-"+month+"-"+date+"T"+hours+":"+minutes+":"+seconds;
  }
  AdjustDigits(target: number, digits: number): string {
    return ( Array(digits + 1).join('0') + target.toString() ).slice(-digits);
  }
}
