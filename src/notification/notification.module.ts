import { Module } from '@nestjs/common'
import { SmsService } from './sms/sms.service';

@Module({
    providers:[SmsService],
    imports:[],
    exports:[SmsService]
})
export class NotificationModule{}