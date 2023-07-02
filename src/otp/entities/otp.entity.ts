import { BaseEntity } from "src/core/entity.core";
import { Column, Entity } from "typeorm";



@Entity()
export class Otp extends BaseEntity{
    @Column()
    otp:string

    @Column()
    channel:string

    @Column()
    receipient:string
}