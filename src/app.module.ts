import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './core/config/typeorm.config';
import { NotificationModule } from './notification/notification.module';
import { OtpModule } from './otp/otp.module';
import { IdentityModule } from './identity/identity.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
    isGlobal:true
    }),
    TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
    UserModule,
    AuthModule, 
    IdentityModule,
    NotificationModule,
    OtpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
