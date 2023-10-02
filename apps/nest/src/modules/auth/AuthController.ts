import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/modules/auth/AuthService';
import { CreateMemberRequestDTO, LoginRequestDTO } from 'src/modules/auth/dtos';
import { MemberResponseDTO } from '@/modules/auth/dtos/response';
import {DTOMapper, Roles} from '@/common/utils';

@Controller('my')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() loginRequestDTO: LoginRequestDTO) {
    return this.authService.login(loginRequestDTO);
  }

  @Post('/signup')
  async createMember(
    @Body() createMemberRequestDTO: CreateMemberRequestDTO,
  ): Promise<MemberResponseDTO> {
    const member = await this.authService.createMember(createMemberRequestDTO);
    return new MemberResponseDTO(member);
  }
}
