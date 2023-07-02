import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/core/guards/accessToken.guard";


@ApiTags("Wallet")
@ApiBearerAuth("access-token")
@UseGuards(AccessTokenGuard)
@Controller("wallet")
export class WalletController{
    constructor(private readonly walletService: WalletService){}

    @Get()
    getMyWallet(@Req() req:any){
        return this.walletService.getOne(req.user)
    }
}