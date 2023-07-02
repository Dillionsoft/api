import { BaseEntity } from "src/core/entity.core";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";



@Entity()
export class Card extends BaseEntity{
    
    @Column()
    refId:string

    @Column()
    currency:string

    @Column()
    brand:string

    @Column()
    type:string

    @ManyToOne(()=>User, (user)=>user.cards)
    user:User
}