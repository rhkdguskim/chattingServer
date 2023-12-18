import {UserInfoResponse} from "@app/authentication/dto/authenticaion.dto";

export function NullCheck(payload : any) : boolean {
  return payload === null;
}

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result: any = {};
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}