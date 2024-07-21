import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Key } from 'src/entity/key.entity';
import { CreateKeyDto } from './dto/create-key.dto';
import { KeyDetailsDto } from './dto/key-details.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { KeyService } from './key.service';

@Controller('key')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async generateKey(@Body() createKeyDto: CreateKeyDto): Promise<Key> {
    return this.keyService.generateKey(createKeyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteKey(@Param('id') keyId: string): Promise<boolean> {
    return this.keyService.deleteKey(keyId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateKey(
    @Param('id') keyId: string,
    @Body() updateKeyDto: UpdateKeyDto,
  ): Promise<Key | undefined> {
    return this.keyService.updateKey(keyId, updateKeyDto);
  }

  @Get(':id')
  async getKeyDetails(
    @Param('id') keyId: string,
  ): Promise<KeyDetailsDto | undefined> {
    return this.keyService.getKeyDetails(keyId);
  }

  @Put(':id/disable')
  async disableKey(@Param('id') keyId: string): Promise<boolean> {
    return this.keyService.disableKey(keyId);
  }
}
