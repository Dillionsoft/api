import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OtpService } from "../../otp/otp.service";
import { ApiTags } from "@nestjs/swagger";
import { SendOtpDto } from "../../otp/dto/create-otp-dto";


@ApiTags("Customers")
@Controller("customers/otp")
export class OtpController{
    constructor(private readonly otpService: OtpService){}

    @Get(":otp")
    verify(@Param("otp") otp:string){
        return this.otpService.getOtp(otp)
    }

    @Post("send")
    send(@Body() dto:SendOtpDto){
        return this.otpService.send(dto.type, dto.receipient)
    }
}