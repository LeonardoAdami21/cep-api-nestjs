import { Module } from '@nestjs/common';
import { CepModule } from './cep/cep.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({}), CepModule],
})
export class AppModule {}
