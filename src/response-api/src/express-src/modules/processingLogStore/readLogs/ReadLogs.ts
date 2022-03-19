import fs from 'fs';
import { ProcessingTimeLogFileDetail } from '@/express-src/modules/processingLogStore/processingLogModules';

type CompletelyLogData = {
  [log_file_name: string]: string[][];
}

export default class ReadLogs {
  wanted_dir: string;
  wanted_dir_path: string;

  constructor(dir: string) {
    this.wanted_dir = dir;
    this.wanted_dir_path = 
      ProcessingTimeLogFileDetail.logs_home_dir +
      this.wanted_dir + "/"
  }

  completelyLogDetail(): CompletelyLogData {
    const log_files: string[] = this.getTargetFiles();

    let completelyLogData: CompletelyLogData = {};

    log_files.forEach((log_file) => {
      const log_file_path = this.wanted_dir_path + log_file;
      completelyLogData[log_file] = this.csvFileConvertToArray(log_file_path);
    })

    // this.parser.end();
    return completelyLogData;
  }

  csvFileConvertToArray(log_file_path: string): string[][] {
    const log_content = fs.readFileSync(log_file_path);
    const log_content_lines = log_content.toString().split('\n');
    const records: string[][] = [];

    for(const line of log_content_lines) {
      records.push(line.split(','))
    }

    return records;
  }

  getTargetFiles(): string[] {
    let read_files: string[] = [];
    try {
      read_files = fs.readdirSync(
        this.wanted_dir_path
      );
    }
    catch(err) {
      console.log(err);
    }

    return read_files;
  }

}
