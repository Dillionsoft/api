import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"


export class RegisterAuthDto{
    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    country:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    otp:string
}