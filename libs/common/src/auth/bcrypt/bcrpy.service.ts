import * as bcrypt from "bcrypt";
import { BcryptService } from "./bcrpy.interface";

export class BcryptServiceImpl implements BcryptService {
  constructor() {}
  compare(cmp1: string, cmp2: string) {
    return bcrypt.compareSync(cmp1, cmp2);
  }

  hash(payload: string) {
    return bcrypt.hashSync(payload, 10);
  }
}
