import fs from 'fs';
import { 
  Process_Server,
  Process_CRUD,
  Process_State,
} from '@/express-src/modules/writeLogs/_modules';

export default class ProcessingTimeLogWriter {
  readonly WRITTEN_FILE_DIRECTORY: string = process.env.LOG_PATH || "/home/logs/new/";
  readonly WRITTEN_FILE_NAME: string = 
    process.env.DATABASE_SYSTEM + "_" +
    process.env.NODE_ENV + ".log";
  readonly WRITTEN_FILE_PATH: string = this.WRITTEN_FILE_DIRECTORY + this.WRITTEN_FILE_NAME;

  request_id: string;
  request_time: string;

  constructor(request_id: string, request_time: string) {
    this.request_id = request_id;
    this.request_time = request_time;
    this.ifNotExist_CreateDirectory();
  }

  WriteNodeLog(
    process_state: Process_State, 
    request_name: Process_Server, 
    processing_time: bigint) {

    try {
      fs.appendFileSync(
        this.WRITTEN_FILE_PATH, 
        process_state + "," +
        this.request_time + "," + 
        this.request_id + ","  +
        request_name + "," +
        processing_time + "\n"
      );
    }
    catch(err) {
      console.log(err);
    }
  }

  WriteDbLog(
    process_state: Process_State, 
    request_name: Process_CRUD, 
    target_table: string, 
    processing_time: bigint) {

    try{
      fs.appendFileSync(
        this.WRITTEN_FILE_PATH, 
        process_state + "," +
          this.request_time + "," + 
          this.request_id + "," +
          "DB" + "," +
          request_name + "," +
          target_table + "," +
          processing_time + "\n"
      );
    }
    catch(err) {
      console.log(err);
    }
  }

  ifNotExist_CreateDirectory() {
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
