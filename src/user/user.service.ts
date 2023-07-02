import { HttpException, Injectable } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";

@Injectable()
export class UserService{

    constructor(
        private readonly userRepository: UserRepository){}

    async insertUser(auth:any, phoneNumber:string){
       

        const user = this.userRepository.create({
            auth,
            phoneNumber
        })

        await this.userRepository.insert(user)

        return user
    }

    async createUser(data:any){
        const {line1, city, state, country, ...userData} = data 

        const user = await this.userRepository.save({...userData})

        return user
    }

    async findOneByAuth(auth:any){
        return await this.userRepository.findOneBy({auth:{id:auth.id}})
    }

    async findMany(){
        try{
            const users = await this.userRepository.find()
            return{
                message:"Users fetched successfully",
                data:users
            }
        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }

    async getById(id:string){
        try{
            return await this.userRepository.findOneBy({id})
        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }

    async me(auth:any){
        return await this.userRepository.findOneBy({auth:{id:auth.id}})
    }

    async findOne(data:any){
        return await this.userRepository.findOneBy(data)
    }


    async updateUser(data:any, auth:any){
        try{
            const user = await this.userRepository.update({auth:{id:auth.id}},data)
     
            return {
                message:"User updated",
                data
            }
        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
        
    }

    async updateIdentity(idNumber:string, userId:string){
        try{
            await this.userRepository.update({id:userId},{idNumber, isIdVerified:true})
        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }
}