import { Module } from "@nestjs/common";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { CardRepository } from "./repositories/card.repository";
import { UserModule } from "src/user/user.module";
import { ThirdPartyModule } from "src/thirdparty/thirdparty.module";


@Module({
    imports:[UserModule, ThirdPartyModule],
    providers:[CardService, CardRepository],
    controllers:[CardController],
    exports:[CardService]
})
export class CardModule{}