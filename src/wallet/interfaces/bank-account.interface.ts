import { IAuth } from "src/core/interface"
import { IUser } from "src/user/interfaces/user.interface"


export interface IVerifyAccountNumber{
    accountNumber:string
    bankCode:string
}

export interface ITransferThirdParty{
    destinationAccount:string
    amount:string
    narration:string
    refId:string
}

export interface ITransferSameParty{
    destinationAccount:string
    amount:string
    narration:string
    refId:string
}


export interface IAuthBankAccount{

    createAccount<T extends IUser, K extends IAuth>(user:T, auth:K):Promise<any>

    checkBalance<K extends IAuth>(auth:K):Promise<any>

    verifyAccountNumber<T extends IVerifyAccountNumber, K extends IAuth>(data:T, auth:K):Promise<any>

    transferToThirdParty<T extends ITransferThirdParty, K extends IAuth>(data: T, auth:K):Promise<any>

    transferToSameParty<T extends ITransferSameParty, K extends IAuth>(data: T, auth:K):Promise<any>

}