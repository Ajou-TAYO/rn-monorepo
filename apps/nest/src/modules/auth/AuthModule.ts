import { Module } from '@nestjs/common';
import { DTOMapperModule } from '@/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '@/modules/member/entities';
import { AuthController } from '@/modules/auth/AuthController';
import { AuthService } from '@/modules/auth/AuthService';
import { JwtStrategy } from '@/modules/auth/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: '1m',
        },
      }),
    }),
    DTOMapperModule,
    TypeOrmModule.forFeature([Member]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [TypeOrmModule, AuthService],
})
export class AuthModule {}
