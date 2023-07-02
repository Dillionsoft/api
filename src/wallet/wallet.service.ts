import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserAddressService } from "src/user/address.service";
import { UserService } from "src/user/user.service";
import { BridgecardsAccountService } from "src/thirdparty/bridgecards/account.service";
import { WalletRepository } from "./repositories/wallet.repository";
import { BridgecardsCardService } from "src/thirdparty/bridgecards/card.service";
import { CardService } from "src/card/card.service";


@Injectable()
export class WalletService{
    constructor(
        private readonly bridgeCard: BridgecardsAccountService,
        private readonly bridgeCardIssuing: BridgecardsCardService,
        private readonly userService: UserService,
        private readonly addressService: UserAddressService,
        private readonly walletRepository: WalletRepository,
        private readonly cardService: CardService){}

    async create(auth:any, bvn:string){
        try{

            const user = await this.userService.findOneByAuth(auth)

            const existingAccount = await this.walletRepository.findOneBy({user:{id:user.id}})
            
            if(existingAccount){
                throw new HttpException("Account already exist for user", HttpStatus.CONFLICT)
            }
     
            const address = await this.addressService.getOneByUser(user)

            const account = await this.bridgeCard.createAccount({
                firstName:user.firstName,
                lastName:user.lastName,
                phoneNumber: user.phoneNumber,
                emailAddress:user.emailAddress,
                address:{
                    address1:address.address1,
                    city:address.city,
                    state:address.state,
                    country:address.country,
                    postalCode:address.postalCode
                },
                identity:{
                    number:bvn,
                    type:user.idType
                }
            })

            const card = await this.bridgeCardIssuing.createNairaCard(account.holderId,'virtual','Mastercard','NGN')

            await this.cardService.createVirtual(user.id, 'virtual', 'Mastercard',card.card_id,'NGN')

            const {holderId, ...rest} = account

            await this.walletRepository.insert({
                refId:account.holderId,
                provider:'bridgecard.co',
                user,
                ...rest

            })

            

            await this.userService.updateIdentity(bvn, user.id)

            return {
                message:"Account created successfully"
            }

        }catch(error){
            throw new HttpException(error.message, error.status)
        }
    }

    async getOne(auth:any){
        try{
            const user = await this.userService.findOne({auth:{id:auth.id}})

            const wallet = await this.walletRepository.findOneBy({user:{id:user.id}})

            const {createdAt, updatedAt, provider, refId, deletedAt, ...rest} = wallet

            return {
                ...rest
            }
        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }
}