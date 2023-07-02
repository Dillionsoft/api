import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosService } from "src/core/axios/axios.service";


@Injectable()
export class BvnService extends AxiosService{
    constructor(private readonly configService: ConfigService){
        super(configService.get<string>('MAPLERAD_URL'),{
            Authorization:'Bearer '+configService.get<string>('MAPLERAD_APIKEY')
        })
    }

    async checkBvn(bvn:string){
        try{
            const result = await this.instance.request({
                method:"POST",
                url:"/identity/bvn",
                data:{
                    bvn
                }
            })

            const {first_name,last_name,middle_name,title,email,gender, dob,
                phone_number,residential_address,lga_of_origin,image,
                state_of_origin,lga_of_residence,state_of_residence,marital_status,nationality
            } = result?.data?.data || {}

            return {
                    bvn,
                    firstName:first_name,
                    lastName:last_name,
                    middleName:middle_name,
                    title,
                    email,
                    gender,
                    dob,
                    phoneNumber:phone_number,
                    residentialAddress:residential_address,
                    lgaOfOrigin: lga_of_origin,
                    stateOfOrigin:state_of_origin,
                    lgaOfResidence:lga_of_residence,
                    stateOfResidence:state_of_residence,
                    maritalStatus:marital_status,
                    nationality,
                    image
                }

        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }
}