import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthDbProviders } from './providers';
import { RefreshTokensEntity } from './entities';
import { RefreshTokenService } from './services';
import { UsersModule } from 'libs/users-lib';
import { UtilsModule } from 'libs/utils-lib';
import { CacheModule } from 'libs/cache-lib';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokensEntity]),
    UsersModule,
    UtilsModule,
    CacheModule,
  ],
  providers: [AuthService, RefreshTokenService, ...AuthDbProviders],
  exports: [AuthService],
})
export class AuthLibModule {}
