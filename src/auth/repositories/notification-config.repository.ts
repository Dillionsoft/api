import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { NotiticationConfig } from "../entities/notification-config.entity";


@Injectable()
export class NotiticationConfigRepository extends Repository<NotiticationConfig>{
    constructor(private readonly dataSource: DataSource){
        super(NotiticationConfig, dataSource.createEntityManager())
    }
}