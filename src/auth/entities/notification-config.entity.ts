import { BaseEntity } from "src/core/entity.core";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Auth } from "./auth.entity";



@Entity()
export class NotificationConfig extends BaseEntity{

    @Column({default:false})
    login:boolean

    @Column({default:false})
    push:boolean

    @Column({default:false})
    newsletter:boolean
    
    @Column({default:false})
    product:boolean
    
    @OneToOne(()=>Auth)
    @JoinColumn()
    auth: Auth
}