import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthRepository } from "./repositories/auth.repository";
import { PasswordService } from "./password.service";
import { UserService } from "src/user/user.service";
import { OtpService } from "src/otp/otp.service";
import { channel } from "diagnostics_channel";
import { SmsService } from "src/notification/sms/sms.service";
import { UserAddressService } from "src/user/address.service";


@Injectable()
export class AuthService{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly passwordService: PasswordService,
        private readonly userService: UserService,
        private readonly userAddressService: UserAddressService,
        private readonly otpService: OtpService
        ){}

    

    async login(phoneNumber:string, password:string){
        try{
            const auth = await this.fetchWithPhone(phoneNumber)

            if(!auth){
                throw new HttpException("Invalid credential", HttpStatus.NOT_FOUND)
            }
            const isPasswordValid = await this.passwordService.comparePassword(password, auth.password)
            
            if(!isPasswordValid){
                throw new HttpException("Invalid credential", HttpStatus.NOT_FOUND)
            }

            if(!auth.status){
                throw new HttpException("Account not verified", HttpStatus.FORBIDDEN)
            }

            if(auth.isRevoked){
                throw new HttpException("Access denied", HttpStatus.FORBIDDEN)
            }

            const tokens = await this.passwordService.getTokens(auth)

            const user = await this.userService.findOneByAuth(auth)

            delete auth.password

            return {
                message:"Login successfully",
                data:{
                    auth,
                    user,
                    tokens
                }
            }
            
        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }

    async register(country:string, phoneNumber:string, password:string, code:string){
        try{
            const auth = await this.fetchWithPhone(phoneNumber)
            if(auth){
                throw new HttpException("Account already exist for phone number", HttpStatus.CONFLICT)
            }

            const otpData = await this.otpService.getOtp(phoneNumber)

            if(!otpData && otpData?.otp !== code){
                throw new HttpException("Invalid otp", HttpStatus.BAD_REQUEST)
            }

            await this.otpService.delete(phoneNumber)

            const hashedPassword = this.passwordService.hashData(password)

            const newAuth = this.authRepository.create({phoneNumber, password:hashedPassword, status:true})
            
            await this.authRepository.insert(newAuth)
           
            
            const user = await this.userService.insertUser(newAuth, phoneNumber)
            await this.userAddressService.create(user, country)

            const token = await this.passwordService.getTokens(newAuth)

            delete newAuth.password
            delete newAuth.deletedAt


            return{
                message:"Account created successfully",
                data:{
                    ...newAuth,
                    token
                }
            }

        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }

   

    forgotPassword(email:string){}

    async fetchWithPhone(phoneNumber:string){
        return await this.authRepository.findOneBy({phoneNumber})
    }

    async findAll(){
        return await this.authRepository.find()
    }

 
}