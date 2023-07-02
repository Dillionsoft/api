import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ITransferSameParty, ITransferThirdParty, IVerifyAccountNumber } from "src/wallet/interfaces/bank-account.interface";
import { AxiosService } from "src/core/axios/axios.service";
import { IAuth } from "src/core/interface";
import { IUser } from "src/user/interfaces/user.interface";


@Injectable()
export class BridgecardsAccountService extends AxiosService{

    constructor(private readonly configService: ConfigService){
        super(configService.get<string>('BRIDGECARDS_URL'),{
            token: `Bearer ${configService.get<string>('BRIDGECARDS_TOKEN')}`
        })
    }


    async createHolder(user: IUser): Promise<any> {
       
            const result = await this.instance.request({
                method:'POST',
                url:'/cardholder/register_cardholder_synchronously',
                data:{
                    first_name:user.firstName,
                    last_name: user.lastName,
                    address:{
                        address: user.address.address1,
                        city: user.address.city,
                        state: user.address.state,
                        country: user.address.country,
                        postal_code: user.address.postalCode,
                        house_no:'10'
                    },
                    phone: user.phoneNumber,
                    email_address: user.emailAddress,
                    identity:{
                        id_type: user.identity.type === 'BVN' ? 'NIGERIAN_BVN_VERIFICATION':'',
                        bvn:user.identity.number
                    }
                }
            })

            return result?.data?.data

    }

    async createWallet(holderId:string): Promise<any> {
        const result = await this.instance.request({
            method:'POST',
            url:'/naira_cards/create_naira_virtual_account',
            data:{
                cardholder_id:holderId
            }
        })

        return result?.data?.data
    }



    async createAccount(user:IUser){
        try{

            const holder = await this.createHolder(user)
            const wallet = await this.createWallet(holder.cardholder_id)

            return{
                holderId:holder.cardholder_id,
                accountNumber: wallet.account_nuban,
                accountName: wallet.account_name,
                bankCode:wallet.bank_code
            }

        }catch(error:any){
            throw new HttpException(error.response.data.message, error.status)
        }
    }

    
    checkBalance<K extends IAuth>(auth: K): Promise<any> {
        throw new Error("Method not implemented.");
    }
    verifyAccountNumber<T extends IVerifyAccountNumber, K extends IAuth>(data: T, auth: K): Promise<any> {
        throw new Error("Method not implemented.");
    }
    transferToThirdParty<T extends ITransferThirdParty, K extends IAuth>(data: T, auth: K): Promise<any> {
        throw new Error("Method not implemented.");
    }
    transferToSameParty<T extends ITransferSameParty, K extends IAuth>(data: T, auth: K): Promise<any> {
        throw new Error("Method not implemented.");
    }

   
}