import { Body, Controller, Get, Param, Post, Put, Req, Session, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/core/guards/accessToken.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateUserAddressDto } from "./dto/update-address.dto";

@ApiTags("Users")
@ApiBearerAuth("access-token")
@UseGuards(AccessTokenGuard)
@Controller("users")
export class UserController{
    constructor(private readonly userService: UserService){}

    @Get()
    getAll(){
        return this.userService.findMany()
    }

    @Get("me")
    me(@Req() req:any){
        return this.userService.me(req.user)
    }

    @Get(":id")
    getById(@Param("id") id:string){
        return this.userService.getById(id)
    }

    @Put()
    updateUser(@Body() dto:UpdateUserDto, @Req() req:any){
        return this.userService.updateUser(dto, req.user)
    } 
}