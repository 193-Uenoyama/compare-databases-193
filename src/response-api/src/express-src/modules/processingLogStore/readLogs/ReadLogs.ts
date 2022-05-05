import fs from 'fs';
import { ProcessingTimeLogFileDetail } from '@/express-src/modules/processingLogStore/processingLogModules';

type CompletelyLogData = {
  [log_file_name: string]: string[][];
}
type SamplingResults = {
  min: number,
  max: number,
  ave: number,
  cnt: number,
}
type ExtractLogData = {
  [log_file_name: string]: SamplingResults
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

  extractLogData(status: string, statement: string, target: string | null): ExtractLogData {
    const log_files: string[] = this.getTargetFiles();

    let extractLogData: ExtractLogData = {};

    log_files.forEach((log_file) => {
      const log_file_path = this.read_dir_path + log_file;
      extractLogData[log_file] = this.getSamplingResult(
        log_file_path,
        status,
        statement,
        target
      );
    })

    return extractLogData;
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

  getSamplingResult(
    log_file_path: string,
    status: string,
    statement: string,
    target: string | null): SamplingResults {

    const log_content = fs.readFileSync(log_file_path);
    const log_content_lines = log_content.toString().split('\n');
    const record: SamplingResults = { min: -1, max: -1, ave: -1, cnt: 0 };
    let total: number = 0;

    for(const line of log_content_lines) {
      if (line == "")
        continue;

      const split_comma_line = line.toString().split(',');
      // nodeの比較は別の機能にしたい(developmentとproduction比べたい)
      if (split_comma_line[3] == 'Node') 
        continue;

      if (split_comma_line[0] != status) 
        continue;

      switch(statement) {
        case 'All':
          break; 
        default :
          if (split_comma_line[4] != statement)
            continue;
          break;
      }

      switch(target) {
        case 'All':
          break; 
        default :
          if (split_comma_line[5] != target)
            continue;
          break;
      }

      const processing_time = Number(split_comma_line[6])
      if (record.min == -1 || processing_time < record.min ) {
        record.min = processing_time;
      }
      if (record.max == -1 || processing_time > record.max ) {
        record.max = processing_time;
      }
      record.cnt++;
      total += processing_time;
    }

    record.ave = total / record.cnt;
    return record;
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
