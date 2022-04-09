import { ValidationError } from 'express-validator';

export interface baseResponse {
  is_success: boolean;
}

export interface validErrorResponse extends baseResponse {
  errors: ValidationError[];
}

export function cutUndefinedOutOfAnArgument<T>(argument: T): T {
  for(const key in argument) {
    if(argument[key] === undefined) {
      delete argument[key];
    }
  }
  return argument;
}
