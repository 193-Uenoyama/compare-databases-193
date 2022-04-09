import fs from 'fs';
import { 
  ProcessingTimeLogFileDetail,
} from '@/express-src/modules/processingLogStore/processingLogModules';

export function RemoveLogFiles() {
  const read_files = fs.readdirSync(ProcessingTimeLogFileDetail.current_log_dir);
  read_files.forEach((file) => {
    fs.rmSync(ProcessingTimeLogFileDetail.current_log_dir + file)
  })
}
