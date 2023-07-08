import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { NotificationConfig } from "../entities/notification-config.entity";


@Injectable()
export class NotificationConfigRepository extends Repository<NotificationConfig>{
    constructor(private readonly dataSource: DataSource){
        super(NotificationConfig, dataSource.createEntityManager())
    }
}