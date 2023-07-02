import { BaseEntity } from "src/core/entity.core";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Document extends BaseEntity{
    @Column({
        nullable:true
    })
    idFrontUrl:string

    @Column({
        nullable:true
    })
    idBackUrl:string

    @Column({
        nullable:true
    })
    incorporationCertificateUrl:string

    @Column({
        nullable:true
    })
    addressVerificationUrl:string


    @ManyToOne(()=>User, (user)=>user.document,{onDelete:"CASCADE"})
    user:User
}