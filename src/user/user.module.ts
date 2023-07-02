import { Module } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { AddressRepository } from "./repositories/address.repository";
import { DocumentRepository } from "./repositories/document.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ThirdPartyModule } from "src/thirdparty/thirdparty.module";
import { NotificationModule } from "src/notification/notification.module";
import { OtpModule } from "src/otp/otp.module";
import { UserAddressService } from "./address.service";
import { AddressController } from "./address.controller";


@Module({
    imports:[ThirdPartyModule, NotificationModule, OtpModule],
    providers:[UserRepository,AddressRepository, DocumentRepository,UserAddressService, UserService],
    exports:[UserService,UserAddressService],
    controllers:[UserController, AddressController]
})

export class UserModule{}