import { BaseEntity } from "src/core/entity.core";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Document } from "./document.entity";
import { Address } from "./address.entity";
import { Auth } from "src/auth/entities/auth.entity";


export enum UserType{
    INDIVIDUAL='Individual',
    COMPANY='Company'
}

export enum IdentityType{
    BVN='BVN',
    NIN='NIN'
}

@Entity()
export class User extends BaseEntity{
    @Column({
        nullable:true
    })
    firstName:string

    @Column({
        nullable:true
    })
    lastName:string

    @Column({
        nullable:true
    })
    middleName:string

    @Column({
        nullable:true
    })
    phoneNumber:string

    @Column({
        nullable:true
    })
    emailAddress:string

    @Column({
        nullable:true
    })
    dateOfBirth:string

    @Column({
        nullable:true
    })
    idNumber:string

    @Column({
        default:false
    })
    isIdVerified:boolean

    @Column({
        type:'enum',
        enum:IdentityType,
        default:IdentityType.BVN
    })
    idType:IdentityType

    @Column({
        type:"enum",
        enum:UserType,
        default:UserType.INDIVIDUAL
    })
    type:UserType

    @OneToOne(()=>Auth)
    @JoinColumn()
    auth: Auth

    @OneToMany(()=>Document, (document)=>document.user, {cascade:true})
    document?:Document[]

    @OneToMany(()=>Address, (address)=>address.user, {cascade:true})
    address:Address[]
}