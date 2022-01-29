import fs from 'fs';
import { hrTime, ConvertToMsFromNs } from '@/express-src/modules/write_logs/_modules';

export default class WriteProcessingTimeLog {
  readonly WRITTEN_FILE_DIRECTORY: string = process.env.LOG_PATH || "/home/logs/";
  readonly WRITTEN_FILE_NAME: string = process.env.DATABASE_SYSTEM + ".log";
  readonly WRITTEN_FILE_PATH: string = this.WRITTEN_FILE_DIRECTORY + this.WRITTEN_FILE_NAME;

  constructor() {
  }

  WriteLog(timer_db_end: hrTime, timer_node_end: hrTime, created_time: Date) {
    fs.appendFileSync( 
      this.WRITTEN_FILE_PATH, 
      created_time.toDateString() + "," + 
      timer_db_end[1] + "," + 
      timer_node_end[1] + "\n",
    );
  }

  // FormattingToJson_hrTime(timer_db_end: hrTime, timer_node_end: hrTime): string { let log_data = {
  //     processing_db_ns: timer_db_end[1],
  //     processing_db_ms: ConvertToMsFromNs(timer_db_end[1]),
  //     processing_node_ns: timer_node_end[1],
  //     processing_node_ms: ConvertToMsFromNs(timer_node_end[1]),
  //   }
  //   return JSON.stringify(log_data, null, '  ');
  // }

  // // 定数の INDENT を全ての行のはじめに挿入する(インデントを入れる)
  // AddIndent(target_str: string): string {
  //   let reg: RegExp = new RegExp("\n", 'g');
  //   // 改行コードの後にインデントを挿入
  //   target_str = target_str.replace(reg, '\n' + this.INDENT);
  //   // 一番最初の位置にインデントを挿入
  //   target_str = this.INDENT + target_str
  //   return target_str;
  // }

  // DeleteLastBracket() {
  //   let file_contents: string | Buffer = fs.readFileSync(this.WRITTEN_FILE_PATH, 'utf-8');
  //   let line = file_contents.split('\n').pop();
  // }
  // AddLastBracket() {
  //   // fs.writeFileSync(this.WRITTEN_FILE_PATH, "]", {flag: "a"});
  // }
}
