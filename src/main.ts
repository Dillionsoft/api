import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata"
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 5000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Dillionpay')
                      .setDescription("Dillionpay")
                      .setVersion('v1')
                      .addBearerAuth({ 
                        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
                        name: 'Authorization',
                        bearerFormat: 'Bearer',
                        scheme: 'Bearer',
                        type: 'http',
                        in: 'Header'
                      },
                      'access-token')
                      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    origin:["http://localhost:3000"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  })
  await app.listen(PORT);
}

bootstrap();