import { Controller } from '@nestjs/common';
import { AuthService } from '@/modules/auth/AuthService';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
