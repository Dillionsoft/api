import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { IdentityService } from "./identity.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/core/guards/accessToken.guard";

@ApiTags("Identity")
@ApiBearerAuth("access-token")
@UseGuards(AccessTokenGuard)
@Controller("identity")
export class IdentityController{
    constructor(private readonly identityService: IdentityService){}

    @Patch(":bvn")
    resolveBvn(@Param("bvn") bvn:string, @Req() req:any){
        return this.identityService.resolveBvn(bvn, req.user)
    }
}