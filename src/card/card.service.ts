import { HttpException, Injectable } from "@nestjs/common";
import { CardRepository } from "./repositories/card.repository";
import { UserService } from "src/user/user.service";
import { BridgecardsCardService } from "src/thirdparty/bridgecards/card.service";


@Injectable()
export class CardService{
    constructor(private readonly cardRepository: CardRepository,
        private readonly userService:UserService,
        private readonly bridgecardCard: BridgecardsCardService){}

    async createVirtual(userId:string, type:string, brand:string, refId:string, currency:string){
        return await this.cardRepository.insert({
            type,
            brand,
            refId,
            currency,
            user:{id:userId}
        })
    }

    async getMyCards(auth:any){
       try{
        const user = await this.userService.findOne({auth:{id:auth.id}})
        return await this.cardRepository.findBy({user})
       }catch(error:any){
        throw new HttpException(error.message, error.status)
       }
    }

    async getCardDetail(auth:any){
       try{
            const user = await this.userService.findOne({auth:{id:auth.id}})
            const card = await this.cardRepository.findOneBy({user:{id:user.id}})
            const cardData = await this.bridgecardCard.getCardDetails(card.refId)
            const {card_type,is_active, card_id, card_number, expiry_month, expiry_year,billing_address, cvv, last_4, card_currency, brand, ...rest} = cardData

            const {
                billing_address1,billing_city, billing_country, billing_zip_code,country_code, state,state_code
            } = billing_address
           
            
        return{
            id:card_id,
            cardNumber: card_number,
            expiryMonth: expiry_month,
            expiryYear: expiry_year,
            cvv,
            last4Digit: last_4,
            currency: card_currency,
            brand,
            type:card_type,
            isActive:is_active,
            billingAddress:{
                address1: billing_address1,
                city: billing_city,
                state,
                stateCode: state_code,
                countryCode:country_code,
                country: billing_country,
                zipCode: billing_zip_code

            }
        }
        }catch(error:any){
            throw new HttpException(error.message, error.status)
       }
    }
}