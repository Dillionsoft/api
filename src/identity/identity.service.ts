import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { BvnService } from "./bvn.service";


@Injectable()
export class IdentityService{

    constructor(
        private readonly userService: UserService,
        private readonly bvnService: BvnService,
   ){}

    async resolveBvn(bvn:string, auth:any){
        try{
            const user = await this.userService.findOne({auth:{id:auth.id}})
      
            // if(user.idNumber === bvn){
            //     throw new HttpException("Bvn is already taken", HttpStatus.NOT_FOUND)
            // }

            // const bvnData = await this.bvnService.checkBvn(bvn)

            // let telephone = ''
            
            // if(bvnData.nationality === 'Nigeria'){
            //     telephone = '234'+bvnData.phoneNumber.substring(1)
            // }
           
            // if(!bvnData){
            //     throw new HttpException("Invalid bvn", HttpStatus.NOT_FOUND)
            // }
           
            // if((telephone !== user.phoneNumber) || (user.firstName.toLocaleLowerCase() !== bvnData.firstName.toLocaleLowerCase()) || (user.lastName.toLocaleLowerCase() !== bvnData.lastName.toLocaleLowerCase()) || (user.dateOfBirth !== bvnData.dob)){
            //     throw new HttpException("Bvn data does not match", HttpStatus.BAD_REQUEST)
            // }


        }catch(error){
            throw new HttpException(error.message, error.status)
        }
    }

}