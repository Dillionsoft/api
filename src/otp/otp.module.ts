import { Module } from "@nestjs/common";
import { OtpRepository } from "./repositories/otp.repository";
import { OtpService } from "./otp.service";
import { NotificationModule } from "src/notification/notification.module";


@Module({
    providers:[OtpRepository, OtpService],
    exports:[OtpService],
    imports:[NotificationModule],
    controllers:[]
})
export class OtpModule{}