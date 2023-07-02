import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosService } from "src/core/axios/axios.service";
import { IUser } from "src/user/interfaces/user.interface";


@Injectable()
export class SudoService extends AxiosService{
   
    constructor(private readonly configService: ConfigService){
        super(configService.get<string>('SUDO_BASEURL'),{
            Authorization:'Bearer '+configService.get<string>('SUDO_API_KEY')
        })
    }

    async createCustomer(data:IUser){
        try{
            const result = await this.instance.request({
                url:"/customers",
                method:"POST",
                data
            })

            return result.data
        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }

    async createAccount(type:string, currency:string, accountType:string, customerId:string){
        try{
            const result = await this.instance.request({
                url:"/accounts",
                method:"POST",
                data:{
                    type,
                    currency,
                    accountType, customerId
                }
            })

            return result.data
        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }
}