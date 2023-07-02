import { Module } from "@nestjs/common";
import { SudoService } from "./sudo/sudo.service";
import { MapleradService } from "./maplerad/maplerad.service";
import { TermiiService } from "./termii/services/termii.service";
import { BridgecardsAccountService } from "./bridgecards/account.service";
import { BridgecardsCardService } from "./bridgecards/card.service";


@Module({
    providers:[SudoService,MapleradService, TermiiService, BridgecardsAccountService, BridgecardsCardService],
    exports:[SudoService,MapleradService, TermiiService,BridgecardsAccountService,BridgecardsCardService]
})
export class ThirdPartyModule{}