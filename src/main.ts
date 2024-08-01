import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envoriment } from './env/envoriment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CEP API')
    .setDescription('API para buscar CEP')
    .setVersion('1.0')
    .addTag('cep')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(envoriment.appPort || 3000, () => {
    console.log(
      `Server running on port http://localhost:${envoriment.appPort}/api-docs`,
    );
  });
}
bootstrap();
