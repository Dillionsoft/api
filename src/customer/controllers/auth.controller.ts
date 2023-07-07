import { Controller, Post, Body, Get, Patch } from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { LoginDto } from "../../auth/dto/login.dto";
import { ApiTags } from "@nestjs/swagger";
import { RegisterAuthDto } from "../../auth/dto/register.dto";

@ApiTags("Customers")
@Controller("customers/auth")
export class AuthController{

    constructor(private readonly authService: AuthService){}

    @Post("login")
    login(@Body() dto:LoginDto){
        return this.authService.login(dto.phoneNumber, dto.password)
    }

    @Post("register")
    register(@Body() dto:RegisterAuthDto){
        return this.authService.register(dto.country, dto.phoneNumber, dto.password, dto.otp)
    }
}