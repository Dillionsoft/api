import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"


export class LoginDto{
    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string
}