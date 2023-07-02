import { DataSource, Repository } from "typeorm";
import { Document } from "../entities/document.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DocumentRepository extends Repository<Document>{
    constructor(private readonly dataSource: DataSource){
        super(Document, dataSource.createEntityManager())
    }
}