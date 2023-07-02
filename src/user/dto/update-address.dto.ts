import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"


export class UpdateUserAddressDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNotEmpty()
    address1:string

    @ApiProperty()
    @IsString()
    @IsOptional()
    address2:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    city:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    state:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    postalCode:string

}