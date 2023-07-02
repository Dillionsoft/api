import { BaseEntity } from "src/core/entity.core";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Address extends BaseEntity{
    @Column({nullable:true})
    address1:string

    @Column({nullable:true})
    address2:string

    @Column({nullable:true})
    city:string

    @Column({nullable:true})
    state:string

    @Column()
    country:string

    @Column({nullable:true})
    postalCode:string

    @ManyToOne(()=>User, (user)=>user.address,{onDelete:"CASCADE"})
    user:User
}