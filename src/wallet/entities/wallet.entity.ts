import { BaseEntity } from "src/core/entity.core";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";


@Entity()
export class Wallet extends BaseEntity{
    @Column({nullable:true})
    refId:string

    @Column({nullable:false})
    accountNumber:string

    @Column({nullable:false})
    accountName:string

    @Column({nullable:false})
    bankCode:string

    @Column({default:0})
    balance:number

    @Column({nullable:true})
    provider:string

    @OneToOne(()=>User)
    @JoinColumn()
    user: User
}