// hrtime 関数で出力されるデータを 型宣言
export type hrTime = [ number, number ]

export type Process_Server = "Node";
export type Process_CRUD = "Create" | "Read" | "Update" | "Delete";
export type Process_State = "Success" | "Error"
// export type TargetTable = "Users" | "Groups" | "GroupMembers" | "Relations";

// ログファイル上の process 全体を管理する
export type ProcessDetail = 
  { state: Process_State, name: Process_Server } |
  { state: Process_State, name: Process_CRUD, target_table: string } 

// ナノ秒をミリ秒に変換
export function ConvertToMsFromNs(ns: number): number {
  return Math.trunc( ns * 0.000001 );
}

