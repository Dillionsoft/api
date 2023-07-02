import { Module } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { SseModule } from "src/sse/sse.module";
import { UserModule } from "src/user/user.module";
import { ThirdPartyModule } from "src/thirdparty/thirdparty.module";
import { WalletRepository } from "./repositories/wallet.repository";
import { WalletController } from "./wallet.controller";
import { CardModule } from "src/card/card.module";


@Module({
    imports:[SseModule, UserModule, ThirdPartyModule, CardModule],
    providers:[WalletService, WalletRepository],
    controllers:[WalletController],
    exports:[WalletService]

})
export class WalletModule{}