import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { IdentityService } from "../../identity/identity.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/core/guards/accessToken.guard";

@ApiTags("Customers")
@ApiBearerAuth("access-token")
@UseGuards(AccessTokenGuard)
@Controller("customers/identity")
export class IdentityController{
    constructor(private readonly identityService: IdentityService){}

    @Patch(":bvn")
    resolveBvn(@Param("bvn") bvn:string, @Req() req:any){
        return this.identityService.resolveBvn(bvn, req.user)
    }
}