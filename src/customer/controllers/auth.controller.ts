import { Controller, Post, Body, Get, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { LoginDto } from "../../auth/dto/login.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RegisterAuthDto } from "../../auth/dto/register.dto";
import { AccessTokenGuard } from "src/core/guards/accessToken.guard";

@ApiTags("Customers")
@Controller("customers/auth")
export class AuthController{

    constructor(private readonly authService: AuthService){}

    @ApiBearerAuth("access-token")
    @UseGuards(AccessTokenGuard)
    @Get("config")
    getConfig(@Req() req:any){
        return this.authService.getConfig(req.user)
    }

    @Post("login")
    login(@Body() dto:LoginDto){
        return this.authService.login(dto.phoneNumber, dto.password)
    }

    @Post("register")
    register(@Body() dto:RegisterAuthDto){
        return this.authService.register(dto.country, dto.phoneNumber, dto.password, dto.otp)
    }


}