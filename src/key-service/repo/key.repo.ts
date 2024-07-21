import { Key } from 'src/entity/key.entity';
import { DataSource } from 'typeorm';

export const keyProviders = [
  {
    provide: 'KEY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Key),
    inject: ['DATA_SOURCE'],
  },
];
