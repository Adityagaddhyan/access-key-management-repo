import { Module } from '@nestjs/common';
import { KeyService } from './key.service';
import { KeyController } from './key.controller';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { keyProviders } from './repo/key.repo';

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [...keyProviders, KeyService, JwtAuthGuard],
  controllers: [KeyController],
})
export class KeyModule {}
