import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";import { AxiosService } from "src/core/axios/axios.service";



@Injectable()
export class BridgecardsCardService extends AxiosService{

    constructor(private readonly configService: ConfigService){
        super(configService.get<string>('BRIDGECARDS_URL'),{
            token: `Bearer ${configService.get<string>('BRIDGECARDS_TOKEN')}`
        })
    }


    async createNairaCard(cardHolderId: string, type:string, brand:string,currency:string): Promise<any> {
        try{
            const result = await this.instance.request({
                method:'POST',
                url:'/cards/create_card',
                data:{
                    cardholder_id:cardHolderId,
                    card_type:type,
                    card_brand:brand,
                    card_currency:currency
                }
            })

            return result?.data?.data

        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }

    async getCardDetails(cardId:string): Promise<any> {
        try{
            const result = await this.instance.request({
                method:'GET',
                url:'/cards/get_card_details',
                params:{
                    card_id:cardId
                }
            })

            return result?.data?.data

        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }

   
}