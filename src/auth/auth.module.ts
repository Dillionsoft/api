import { Module } from "@nestjs/common";
import { AuthRepository } from "./repositories/auth.repository";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from "./auth.service";
import { PasswordService } from "./password.service";
import { AuthController } from "../customer/controllers/auth.controller";
import { AccessTokenStrategy } from "./strategy/accessToken.strategy";
import { RefreshTokenStrategy } from "./strategy/refreshToken.strategy";
import { OtpModule } from "src/otp/otp.module";
import { NotificationModule } from "src/notification/notification.module";
import { NotificationConfigRepository } from "./repositories/notification-config.repository";


@Module({
    imports:[UserModule,
        PassportModule.register({
            defaultStrategy:'jwt',
            property:'user',
            session:false
        }),
        JwtModule.register({}),
    OtpModule, NotificationModule],
    providers:[AuthRepository,NotificationConfigRepository, AuthService, PasswordService, AccessTokenStrategy, RefreshTokenStrategy],
    exports:[PassportModule,JwtModule,AuthService, PasswordService],
    controllers:[]
})
export class AuthModule{}