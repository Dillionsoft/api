import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SmsServiceAbstract } from "./abstracts/sms.abstract.service";


@Injectable()
export class SmsService extends SmsServiceAbstract{
    private apiKey:string
    private sendId = 'Celz3'
    constructor(private readonly configService:ConfigService){
        super(configService.get<string>('TERMII_BASEURL'),{})
        this.apiKey = configService.get<string>('TERMII_API_KEY')
    }

    async send(to:string, message:string){
        try{
           
            const result = await this.instance.request({
                url:'/sms/send',
                method:"POST",
                data:{
                    to,
                    from:this.sendId,
                    sms:message,
                    api_key:this.apiKey,
                    channel:"generic",
                    type:"plain"
                }
            })

            return result
        }catch(error:any){
            console.log(error)
            throw new HttpException(error.message, error.status)
        }
    }

    async sendBulk(to:string[], message:string){
        try{
            const result = await this.instance.request({
                url:'/sms/send',
                method:"POST",
                data:{
                    to,
                    from:this.sendId,
                    sms:message,
                    api_key:this.apiKey,
                    channel:"generic",
                    type:"plain"
                }
            })

            console.log(result)

            return result
        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }

    async sendOtp(to: string){
        try{
            let tel = ''
            if(to.charAt(0) === '0'){
                tel = '234'+to.substring(1)
            }
            const result = await this.instance.request({
                url:'/sms/otp/send',
                method:"POST",
                data:{
                    to:tel,
                    message_type:'NUMERIC',
                    pin_attempts:3,
                    pin_time_to_live:2,
                    pin_length:6,
                    from:this.sendId,
                    api_key:this.apiKey,
                    channel:"generic",
                    message_text:"Hi, this is your code",
                    pin_placeholder:"< 123456 >"
                }
            })

            return result
        }catch(error:any){
            console.log(error)
            throw new HttpException(error.message, error.status)
        }
    }
    
}