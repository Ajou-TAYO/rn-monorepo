import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@/modules/auth/AuthService';
import {
  CreateMemberRequestDTO,
  LoginRequestDTO,
  UpdatePasswordRequestDTO,
} from 'src/modules/auth/dtos';
import {
  MemberResponseDTO,
  NicknameResponseDTO,
} from '@/modules/auth/dtos/response';
import { EmailRequestDTO } from '@/modules/auth/dtos/EmailRequestDTO';
import { TokenResponseDTO } from '@/modules/auth/dtos/response/TokenResponseDTO';
import { AuthGuard } from '@nestjs/passport';
import { UpdateNicknameRequestDTO } from '@/modules/auth/dtos/UpdateNicknameRequestDTO';

@Controller('my')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() loginRequestDTO: LoginRequestDTO) {
    const { token } = await this.authService.login(loginRequestDTO);
    return new TokenResponseDTO(token);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/nickname/reset')
  async getNickname(@Req() req) {
    const { id } = req.user;
    const nickname = await this.authService.getNickname(id);
    return new NicknameResponseDTO(nickname);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/nickname/reset')
  async updateNickname(
    @Req() req,
    @Body() updateNicknameRequestDTO: UpdateNicknameRequestDTO,
  ) {
    const { id } = req.user;
    const newNickname = await this.authService.updateNickname(
      id,
      updateNicknameRequestDTO,
    );
    return new NicknameResponseDTO(newNickname);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/password/reset')
  async updatePassword(
    @Req() req,
    @Body() updatePasswordRequestDTO: UpdatePasswordRequestDTO,
  ): Promise<boolean> {
    const { id } = req.user;
    const success = await this.authService.updatePassword(
      id,
      updatePasswordRequestDTO,
    );
    return success;
  }

  @Post('/signup')
  async createMember(
    @Body() createMemberRequestDTO: CreateMemberRequestDTO,
  ): Promise<MemberResponseDTO> {
    const member = await this.authService.createMember(createMemberRequestDTO);
    return new MemberResponseDTO(member);
  }

  @Post('/signup/email/request')
  async sendEmail(@Body() emailRequestDTO: EmailRequestDTO): Promise<boolean> {
    const { email } = emailRequestDTO;
    return await this.authService.sendEmail(email);
  }
  @Post('/signup/email')
  async checkEmail(@Body() emailRequestDTO: EmailRequestDTO): Promise<boolean> {
    const { email } = emailRequestDTO;
    return await this.authService.checkEmail(email);
  }
}
