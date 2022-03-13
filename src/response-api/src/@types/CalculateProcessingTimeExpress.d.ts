import { ReqLogDetail } from '@/express-src/modules/writeLogs/_modules';
import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper'

declare global{
  namespace Express {
    export interface Request {
      process_logging: {
        time_keeper: TimeKeeper;
        log_detail: ReqLogDetail;
      },
      is_return_res: boolean;
    }
  }
}
