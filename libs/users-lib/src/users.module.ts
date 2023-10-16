import { Module } from '@nestjs/common';
import { UsersService } from './services';
import { UsersDbProviders } from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'libs/utils-lib';
import { UsersEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), UtilsModule],
  providers: [UsersService, ...UsersDbProviders],
  exports: [UsersService],
})
export class UsersModule {}
