export interface reqMsg {
  message: string,
  isConnectDatabase: boolean,
}

export function cutUndefinedOutOfAnArgument<T>(argument: T): T {
  for(const key in argument) {
    if(argument[key] === undefined) {
      delete argument[key];
    }
  }
  return argument;
}
