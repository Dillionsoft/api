
interface IUser{
    id:string
    firstName:string
    lastName:string
    emailAddress:string
    phoneNumber:string
    idType:string
    idNumber:string
}


export interface IAuth{
    id:string
    phoneNumber:string,
    status:boolean
    user:IUser
}