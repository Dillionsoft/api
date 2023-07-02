import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/core/guards/accessToken.guard";
import { CardService } from "./card.service";

@ApiTags("Cards")
@ApiBearerAuth("access-token")
@UseGuards(AccessTokenGuard)
@Controller("cards")
export class CardController{
    constructor(private readonly cardService: CardService){}

    @Get()
    myCards(@Req() req:any){
        return this.cardService.getCardDetail(req.user)
    }

}