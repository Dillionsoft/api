import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { IdentityModule } from "src/identity/identity.module";
import { OtpModule } from "src/otp/otp.module";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./controllers/auth.controller";
import { UserController } from "./controllers/user.controller";
import { IdentityController } from "./controllers/identity.controller";
import { OtpController } from "./controllers/otp.controller";


@Module({
    imports:[AuthModule, UserModule,IdentityModule,OtpModule],
    controllers:[AuthController,UserController,IdentityController,OtpController]
})
export class CustomerModule{}