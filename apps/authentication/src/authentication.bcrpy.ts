import * as bcrypt from "bcrypt";
export class AuthenticationBcrypt {
  constructor() {}

  compare(cmp1: string, cmp2: string) {
    return bcrypt.compareSync(cmp1, cmp2);
  }

  hash(payload: string) {
    return bcrypt.hashSync(payload, 10);
  }
}
