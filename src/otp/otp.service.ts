import { HttpException, Injectable } from "@nestjs/common";
import * as otpGenerator from 'otp-generator'
import { OtpRepository } from "./repositories/otp.repository";
import { SmsService } from "src/notification/sms/sms.service";

@Injectable()
export class OtpService{

    constructor(private readonly otpRepository: OtpRepository,
        private readonly smsService: SmsService){}

    generateOtp(){
      return otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false })
    }

    async getOtp(receipient:string){
        return await this.otpRepository.findOneBy({receipient})
    }

    async all(){
        return await this.otpRepository.find()
    }

    async send(channel:string, receipient:string){
        try{
            const otp = this.generateOtp()
            const newOtp = this.otpRepository.create({
                channel,
                receipient,
                otp
            })

            await this.otpRepository.insert(newOtp)

            await this.smsService.send(receipient, `Hi, use this code ${otp}`)
            
            return{
                message: `Otp sent to ${channel === 'SMS' ? ' your phone number':' email address'}`,
            }

        }catch(error){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async delete(receipient:string){
        await this.otpRepository.delete({receipient})
    }

}