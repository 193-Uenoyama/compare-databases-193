import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper'

declare global{
  namespace Express {
    export interface Request {
      time_keeper: TimeKeeper;
      is_return_res: boolean;
    }
  }
}
