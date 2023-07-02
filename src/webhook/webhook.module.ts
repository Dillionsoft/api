import {Module} from '@nestjs/common'
import { WebhookController } from './webhook.controller';


@Module({
    providers:[],
    controllers:[WebhookController]
})
export class WebhookModule{}