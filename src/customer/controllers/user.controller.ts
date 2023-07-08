import { Body, Controller, Get, Put, Req, UseGuards } from "@nestjs/common";
import { UserService } from "../../user/user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/core/guards/accessToken.guard";
import { UpdateUserDto } from "../../user/dto/update-user.dto";
import { UpdateUserAddressDto } from "../../user/dto/update-address.dto";
import { UserAddressService } from "../../user/address.service";

@ApiTags("Customers")
@ApiBearerAuth("access-token")
@UseGuards(AccessTokenGuard)
@Controller("customers")
export class UserController{
    constructor(private readonly userService: UserService,
        private readonly addressService: UserAddressService){}

    @Get("profile")
    me(@Req() req:any){
        return this.userService.me(req.user)
    }

    @Put()
    updateUser(@Body() dto:UpdateUserDto, @Req() req:any){
        return this.userService.updateUser(dto, req.user)
    } 

    @Get("address")
    userAddress(@Req() req:any){
        return this.addressService.getOne(req.user)
    }

    @Put("address")
    updateAddress(@Body() dto:UpdateUserAddressDto, @Req() req:any){
        return this.addressService.update(dto, req.user)
    } 
}