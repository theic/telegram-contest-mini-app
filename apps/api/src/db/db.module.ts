import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mikroOrmConfig from '../config/mikro-orm';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        ...mikroOrmConfig(),
        allowGlobalContext: true,
        schemaGenerator: {
          disableForeignKeys: false,
        },
        autoLoadEntities: true,
      }),
    }),
  ],
  exports: [MikroOrmModule],
})

export class DbModule {}
