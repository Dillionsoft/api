import { Module } from "@nestjs/common";
import { IdentityService } from "./identity.service";
import { UserModule } from "src/user/user.module";
import { BvnService } from "./bvn.service";



@Module({
    imports:[UserModule],
    providers:[IdentityService, BvnService],
    exports:[IdentityService, BvnService],
    controllers:[]
})
export class IdentityModule{}