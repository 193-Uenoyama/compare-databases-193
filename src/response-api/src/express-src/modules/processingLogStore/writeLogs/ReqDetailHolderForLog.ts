import { ReqLogDetail } from '@/express-src/modules/processingLogStore/processingLogModules';

export default class ReqLogDetailMaker {
  request_id: string = Math.random().toString(32).substring(2);
  start_time: string = this.Get_FullDateString(new Date());
  is_necessary_calculate: boolean

  constructor(is_necessary_calculate: boolean) {
    this.is_necessary_calculate = is_necessary_calculate;
  }

  transferReqDetail(): ReqLogDetail {
    return { 
      request_id: this.request_id, 
      request_start_time: this.start_time,
      is_unneed_calculate: this.is_necessary_calculate,
    }
  }

  // 日付データ(now)を文字列に変換する
  Get_FullDateString(now: Date): string {
    now.setTime(now.getTime() + 1000 * 60 * 60 * 9);
    let year:string = this.AdjustDigits(now.getFullYear(), 4);
    let month:string = this.AdjustDigits(( now.getMonth() + 1 ), 2);
    let date:string = this.AdjustDigits(now.getDate(), 2);
    let hours:string = this.AdjustDigits(now.getHours(), 2);
    let minutes:string = this.AdjustDigits(now.getMinutes(), 2);
    let seconds:string = this.AdjustDigits(now.getSeconds(), 2);
    return year+"-"+month+"-"+date+"T"+hours+":"+minutes+":"+seconds;
  }
  // target の 桁数が digits より小さかったらその分だけ0を入れる
  AdjustDigits(target: number, digits: number): string {
    return ( Array(digits + 1).join('0') + target.toString() ).slice(-digits);
  }
}

