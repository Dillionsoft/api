import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Wallet } from "../entities/wallet.entity";

@Injectable()
export class WalletRepository extends Repository<Wallet>{
    constructor(private readonly dataSource: DataSource){
        super(Wallet, dataSource.createEntityManager())
    }
}