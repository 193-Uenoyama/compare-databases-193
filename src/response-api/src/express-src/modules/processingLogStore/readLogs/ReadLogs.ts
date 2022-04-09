import fs from 'fs';
import { ProcessingTimeLogFileDetail } from '@/express-src/modules/processingLogStore/processingLogModules';

type CompletelyLogData = {
  [log_file_name: string]: string[][];
}

export default class ReadLogs {
  read_dir: string;
  read_dir_path: string;

  constructor(dir: string) {
    this.read_dir = dir;
    this.read_dir_path = 
      ProcessingTimeLogFileDetail.logs_home_dir +
      this.read_dir + "/"
  }

  completelyLogDetail(): CompletelyLogData {
    const log_files: string[] = this.getTargetFiles();

    let completelyLogData: CompletelyLogData = {};

    log_files.forEach((log_file) => {
      const log_file_path = this.read_dir_path + log_file;
      completelyLogData[log_file] = this.csvFileConvertToArray(log_file_path);
    })

    return completelyLogData;
  }

  csvFileConvertToArray(log_file_path: string): string[][] {
    const log_content = fs.readFileSync(log_file_path);
    const log_content_lines = log_content.toString().split('\n');
    const records: string[][] = [];

    for(const line of log_content_lines) {
      if (line == "")
        continue;

      records.push(line.split(','))
    }

    return records;
  }

  getTargetFiles(): string[] {
    let read_files: string[] = [];
    try {
      read_files = fs.readdirSync(
        this.read_dir_path
      );
    }
    catch(err) {
      console.log(err);
    }

    return read_files;
  }

}
