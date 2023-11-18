import * as bcrypt from "bcrypt";
export class AuthenticationBcrypt {
  constructor() {}

  async compare(cmp1: string, cmp2: string) {
    return await bcrypt.compare(cmp1, cmp2);
  }

  async hash(payload: string) {
    return await bcrypt.hash(payload, 10);
  }
}
