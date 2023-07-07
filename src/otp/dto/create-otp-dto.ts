import { Length } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"


export enum OtpType {
    SMS='SMS',
    email='EMAIL'
}


export class SendOtpDto{
    @ApiProperty({
        required:true,
        nullable:false
    })
    @Length(11)
    @IsNotEmpty()
    receipient:string

    @ApiProperty({
        required:true,
        nullable:false
    })
    @IsEnum(OtpType)
    @Length(6)
    @IsNotEmpty()
    type:OtpType
}

