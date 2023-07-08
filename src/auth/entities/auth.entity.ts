import { BaseEntity } from "src/core/entity.core";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { NotificationConfig } from "./notification-config.entity";


@Entity()
export class Auth extends BaseEntity{
    @Column()
    phoneNumber:string

    @Column()
    password:string

    @Column({default:false})
    status:boolean
    
    @Column({default:false})
    isRevoked:boolean

    @OneToOne(()=>User, (user)=>user.auth)
    user:User

    @OneToOne(()=>NotificationConfig, (notificationConfig)=>notificationConfig.auth)
    notificationConfig: NotificationConfig
}