import { Controller, Post, Body, Get, Patch } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ApiTags } from "@nestjs/swagger";
import { RegisterAuthDto } from "./dto/register.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController{

    constructor(private readonly authService: AuthService){}

    @Get()
    all(){
        return this.authService.findAll()
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