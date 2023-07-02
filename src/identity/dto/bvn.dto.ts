import { Length } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"



export class BvnDto{
    @ApiProperty({
        required:true,
        nullable:false
    })
    @Length(11)
    @IsNotEmpty()
    bvn:string

    @ApiProperty({
        required:true,
        nullable:false
    })
    @IsString()
    @IsNotEmpty()
    dob:string
}

export class ValidateOtp{
    @ApiProperty({
        required:true,
        nullable:false
    })
    @IsNotEmpty()
    code:string

    @ApiProperty({
        required:true,
        nullable:false
    })
    @IsString()
    @IsNotEmpty()
    phoneNumber:string
}