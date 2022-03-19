import fs from 'fs';
import { 
  Process_Server,
  Process_CRUD,
  Process_State,
  ProcessDetail,
  ReqLogDetail,
} from '@/express-src/modules/writeLogs/_modules';

export default class ProcessingTimeLogWriter {
  static readonly WRITTEN_FILE_DIRECTORY: string = 
    process.env.LOG_PATH || "/home/logs/new";

  static readonly WRITTEN_FILE_NAME: string = 
    process.env.DATABASE_SYSTEM + "_" +
    process.env.NODE_ENV + ".log";

  static readonly WRITTEN_FILE_PATH: string = 
    this.WRITTEN_FILE_DIRECTORY + "/" +
    this.WRITTEN_FILE_NAME;

  static decideLogMethod(
    log_detail: ReqLogDetail,
    process_detail: ProcessDetail,
    processing_time: bigint
  ): void {
    if( process_detail.name == "Node" ) {
      this.WriteNodeLog(
        process_detail.state,
        log_detail.request_id,
        log_detail.request_start_time,
        process_detail.name,
        processing_time,
      );
    }
    else {
      this.WriteDbLog(
        process_detail.state,
        log_detail.request_id,
        log_detail.request_start_time,
        process_detail.name, 
        process_detail.target_table, 
        processing_time,
      );
    }
  }

  static WriteNodeLog(
    process_state: Process_State, 
    request_id: string,
    request_time: string,
    process_name: Process_Server, 
    processing_time: bigint) {

    try {
      fs.appendFileSync(
        this.WRITTEN_FILE_PATH, 
        process_state + "," +
        request_time + "," + 
        request_id + ","  +
        process_name + "," +
        processing_time + "\n"
      );
    }
    catch(err) {
      console.log(err);
    }
  }

  static WriteDbLog(
    process_state: Process_State, 
    request_id: string,
    request_time: string,
    process_name: Process_CRUD, 
    target_table: string, 
    processing_time: bigint) {

    try{
      fs.appendFileSync(
        this.WRITTEN_FILE_PATH, 
        process_state + "," +
        request_time + "," + 
        request_id + "," +
        "DB" + "," +
        process_name + "," +
        target_table + "," +
        processing_time + "\n"
      );
    }
    catch(err) {
      console.log(err);
    }
  }

  // ログを格納するためのディレクトリを用意する (サーバーが立ち上がるとき)
  static reservWriteLog() {
    try{
      if(!fs.existsSync(this.WRITTEN_FILE_DIRECTORY)) {
        fs.mkdirSync(this.WRITTEN_FILE_DIRECTORY);
      }
    }
    catch(err) {
      console.log(err);
    }
  }

}
