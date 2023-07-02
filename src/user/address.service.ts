import { HttpException, Injectable } from "@nestjs/common";
import { AddressRepository } from "./repositories/address.repository";
import { UserService } from "./user.service";


@Injectable()
export class UserAddressService{
    constructor(private readonly addressRepository: AddressRepository,
        private readonly userService: UserService){}

    async create(user:any,country:string){
        const address = this.addressRepository.create({user, country})
        await this.addressRepository.insert(address)
    }

    async update(data:any, auth:any){
       try{
        const user = await this.userService.findOne({auth:{id:auth.id}})
        
        await this.addressRepository.update({user},data)

        return{
            message:"Address updated successfully",
            data
        }
       }catch(error){
        throw new HttpException(error.message, error.statusCode)
       }
    }

    async getOne(auth:any){
        try{
            const user = await this.userService.findOne({auth:{id:auth.id}})
            
            const address = await this.addressRepository.findOneBy({user:{id:user.id}})
    
            return{
                message:"Address fetched successfully",
                data:address
            }
           }catch(error){
            throw new HttpException(error.message, error.statusCode)
           }
    }

    async getOneByUser(user:any){
        return await this.addressRepository.findOneBy({user:{id:user.id}})
    }
}