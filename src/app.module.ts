import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './core/config/typeorm.config';
import { ThirdPartyModule } from './thirdparty/thirdparty.module';
import { NotificationModule } from './notification/notification.module';
import { OtpModule } from './otp/otp.module';
import { IdentityModule } from './identity/identity.module';
import { SseModule } from './sse/sse.module';
import { WalletModule } from './wallet/wallet.module';
import { CardModule } from './card/card.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
    isGlobal:true
    }),
    TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
    UserModule,
    AuthModule, 
    ThirdPartyModule,
    IdentityModule,
    NotificationModule,
    OtpModule,
    SseModule,
    WalletModule,
    CardModule,
    WebhookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
