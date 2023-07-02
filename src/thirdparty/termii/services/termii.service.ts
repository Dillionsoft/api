import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosService } from "src/core/axios/axios.service";


@Injectable()
export class TermiiService extends AxiosService{
    private apiKey:string
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
                    from:"Flashpay",
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

    async sendBulk(to:string[], message:string){
        try{
            const result = await this.instance.request({
                url:'/sms/send',
                method:"POST",
                data:{
                    to,
                    from:"Flashpay",
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
    
}