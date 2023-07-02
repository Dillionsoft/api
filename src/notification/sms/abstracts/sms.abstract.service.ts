import { AxiosService } from "src/core/axios/axios.service";




export abstract class SmsServiceAbstract extends AxiosService{

    constructor(baseUrl:string, header:any){
        super(baseUrl,header)
    }

        abstract send(to:string, message:string):void

        abstract sendBulk(to:string[], message:string):void

        abstract sendOtp(to:string):void
}