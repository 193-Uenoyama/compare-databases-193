// hrtime 関数で出力されるデータを 型宣言
export type Process_Server = "Node";
export type Process_CRUD = "Create" | "Read" | "Update" | "Delete";
export type Process_State = "Success" | "Error"
// export type TargetTable = "Users" | "Groups" | "GroupMembers" | "Relations";

// ログファイル上の process 全体を管理する
export type ProcessDetail = 
  { state: Process_State, name: Process_Server } |
  { state: Process_State, name: Process_CRUD, target_table: string } 

export type ReqLogDetail = { request_id: string, request_start_time: string }

// ナノ秒をミリ秒に変換
export function ConvertToMsFromNs(ns: number): number {
  return Math.trunc( ns * 0.000001 );
}

// 書き込むログファイルの場所 processing time log file detail
export const ProcessingTimeLogFileDetail = {
  logs_home_dir: "/home/logs/",
  current_log_dir: process.env.LOG_PATH || "/home/logs/new",
  name: process.env.DATABASE_SYSTEM + "_" + process.env.NODE_ENV + ".log",
  path: () => { 
    let self = ProcessingTimeLogFileDetail; 
    return self.current_log_dir + self.name 
  }
}
