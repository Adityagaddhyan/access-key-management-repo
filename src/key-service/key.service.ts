import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { KeyDetailsDto } from './dto/key-details.dto';
import { Key } from 'src/entity/key.entity';

@Injectable()
export class KeyService {
  constructor(
    @Inject('KEY_REPOSITORY')
    private keyRepo: Repository<Key>,
  ) {}

  async generateKey(createKeyDto: CreateKeyDto): Promise<Key> {
    const key = this.keyRepo.create(createKeyDto);
    return this.keyRepo.save(key);
  }

  async deleteKey(keyId: string): Promise<boolean> {
    const result = await this.keyRepo.delete(keyId);
    return result.affected > 0;
  }

  async updateKey(
    keyId: string,
    updateKeyDto: UpdateKeyDto,
  ): Promise<Key | undefined> {
    await this.keyRepo.update(keyId, updateKeyDto);
    return this.keyRepo.findOneBy({ id: keyId });
  }

  async getKeyDetails(keyId: string): Promise<KeyDetailsDto | undefined> {
    const key = await this.keyRepo.findOneBy({ id: keyId });
    if (key) {
      return {
        id: key.id,
        userId: key.userId,
        rateLimit: key.rateLimit,
        expiresAt: key.expiresAt,
        isActive: key.isActive,
      };
    }
    return undefined;
  }

  async disableKey(keyId: string): Promise<boolean> {
    const result = await this.keyRepo.update(keyId, { isActive: false });
    return result.affected > 0;
  }
}
