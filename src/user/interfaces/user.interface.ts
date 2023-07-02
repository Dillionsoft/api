
export interface IIdentity{
    type:string
    number:string
}

export interface IDocument{
    idFrontUrl?:string
    idBackUrl?:string
    incorporationCertificateUrl?:string
    addressVerificationUrl?:string
}


interface IBillingAddress{
    address1:string,
    address2?:string
    city:string
    state:string
    country:string,
    postalCode:string
}

export enum UserType {
    INDIVIDUAL='Individual',
    COMPANY='Company'
}


export interface IUser{
    firstName:string,
    lastName:string
    emailAddress?:string
    phoneNumber?:string
    dob?:string
    gender?:string
    address?:IBillingAddress,
    document?:IDocument,
    identity?:IIdentity
}
