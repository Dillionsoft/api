import { BaseEntity } from "src/core/entity.core";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne } from "typeorm";


@Entity()
export class NotiticationConfig extends BaseEntity{

    @Column({default:false})
    login:boolean

    @Column({default:false})
    push:boolean

    @Column({default:false})
    newsletter:boolean
    
    @Column({default:false})
    product:boolean

    @OneToOne(()=>User, (user)=>user.auth)
    user:User
}