import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthenticationDomain {

    constructor() {}
    
    async CheckPassword(cmp1:string, cmp2:string) {
        return await bcrypt.compare(cmp1,cmp2);
    }
}