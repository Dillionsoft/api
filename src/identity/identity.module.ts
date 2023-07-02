import { Module } from "@nestjs/common";
import { IdentityService } from "./identity.service";
import { IdentityController } from "./identity.controller";
import { UserModule } from "src/user/user.module";
import { BvnService } from "./bvn.service";
import { WalletModule } from "src/wallet/wallet.module";



@Module({
    imports:[UserModule, WalletModule],
    providers:[IdentityService, BvnService],
    exports:[IdentityService, BvnService],
    controllers:[IdentityController]
})
export class IdentityModule{}