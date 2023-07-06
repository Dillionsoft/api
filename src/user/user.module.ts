import { Module } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { AddressRepository } from "./repositories/address.repository";
import { DocumentRepository } from "./repositories/document.repository";
import { UserService } from "./user.service";
import { NotificationModule } from "src/notification/notification.module";
import { OtpModule } from "src/otp/otp.module";
import { UserAddressService } from "./address.service";


@Module({
    imports:[NotificationModule, OtpModule],
    providers:[UserRepository,AddressRepository, DocumentRepository,UserAddressService, UserService],
    exports:[UserService,UserAddressService],
    controllers:[]
})

export class UserModule{}