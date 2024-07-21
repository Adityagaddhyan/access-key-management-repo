import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { KeyModule } from './key-service/key.module';

@Module({
  imports: [KeyModule, AuthModule],
  providers: [],
})
export class AppModule {}
