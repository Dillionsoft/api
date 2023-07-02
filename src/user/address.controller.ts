import { Body, Controller, Get, Param, Post, Put, Req, Session, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/core/guards/accessToken.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateUserAddressDto } from "./dto/update-address.dto";
import { UserAddressService } from "./address.service";

@ApiTags("Address")
@ApiBearerAuth("access-token")
@UseGuards(AccessTokenGuard)
@Controller("address")
export class AddressController{
    constructor(private readonly addressService: UserAddressService){}


    @Get()
    me(@Req() req:any){
        return this.addressService.getOne(req.user)
    }

    @Put()
    updateAddress(@Body() dto:UpdateUserAddressDto, @Req() req:any){
        return this.addressService.update(dto, req.user)
    } 
}