import { FindOneOptions, Repository } from "typeorm";


export abstract class CoreRepository <T> extends Repository<T | any>{


}