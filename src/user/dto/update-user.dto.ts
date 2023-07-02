import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"


export class UpdateUserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNotEmpty()
    firstName:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName:string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    emailAddress:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    middleName:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    dateOfBirth:string
}