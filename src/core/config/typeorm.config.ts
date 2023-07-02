import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Wallet } from "src/wallet/entities/wallet.entity";
import { Auth } from "src/auth/entities/auth.entity";
import { Otp } from "src/otp/entities/otp.entity";
import { Address } from "src/user/entities/address.entity";
import { Document } from "src/user/entities/document.entity";
import { User } from "src/user/entities/user.entity";
import { Card } from "src/card/entities/card.entity";




@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory{
    
    constructor(
        private readonly configService:ConfigService
    ){}
   
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return{
            type:'postgres',
            host:this.configService.get<string>('DB_HOST'),
            port:this.configService.get<number>('DB_PORT'),
            username:this.configService.get<string>('DB_USER'),
            password:this.configService.get<string>('DB_PASSWORD'),
            database:this.configService.get<string>('DB_NAME'),
            entities:[User,Auth,Document, Address, Otp, Wallet, Card],
            synchronize:true,
            logging:false
        }
    }

}