import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";



@Injectable()
export class PasswordService{

    constructor(
        private readonly jwtService: JwtService,
        private configService: ConfigService
    ){}
    
    hashData(password:string){
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    async comparePassword(plain:string, hashed:string):Promise<boolean>{
        return await bcrypt.compare(plain, hashed)
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        // await this.usersService.update(userId, {
        //   refreshToken: hashedRefreshToken,
        // });
      }

      
    async getTokens(data:any) {
    
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
            {
             id:data.id,
             email:data.email
            },
            {
              secret: this.configService.get<string>('JWT_SECRET'),
              expiresIn: '2h',
            },
          ),
          this.jwtService.signAsync(
            {
                id:data.id,
                email:data.email
            },
            {
              secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: '2h',
            },
          ),
        ]);
        return {
            accessToken,
            refreshToken,
          };
    }
}