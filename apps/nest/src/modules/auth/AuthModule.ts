import { Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/AuthController';
import { AuthService } from '@/modules/auth/AuthService';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
