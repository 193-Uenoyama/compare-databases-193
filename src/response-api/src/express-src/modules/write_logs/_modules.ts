// hrtime 関数で出力されるデータを 型宣言
export type hrTime = [
  number,
  number
]

// hrtime 変数の初期値
export const DEFAULT_HRTIME: hrTime = [-1, -1];

// ナノ秒をミリ秒に変換
export function ConvertToMsFromNs(ns: number): number {
  return Math.trunc( ns * 0.000001 );
}
