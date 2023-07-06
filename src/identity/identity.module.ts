import { Module } from "@nestjs/common";
import { IdentityService } from "./identity.service";
import { IdentityController } from "./identity.controller";
import { UserModule } from "src/user/user.module";
import { BvnService } from "./bvn.service";



@Module({
    imports:[UserModule],
    providers:[IdentityService, BvnService],
    exports:[IdentityService, BvnService],
    controllers:[IdentityController]
})
export class IdentityModule{}