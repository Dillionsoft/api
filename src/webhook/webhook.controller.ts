import { Controller, Post,Body } from "@nestjs/common";


@Controller("webhook")
export class WebhookController{

    @Post()
    getBridge(@Body() dto:any){
        console.log(dto)
    }

}