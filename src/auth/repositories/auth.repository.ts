import { DataSource, Repository } from "typeorm";
import { Auth } from "../entities/auth.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthRepository extends Repository<Auth>{
    constructor(private readonly dataSource: DataSource){
        super(Auth, dataSource.createEntityManager())
    }
}