import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '@/modules/member/entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateMemberRequestDTO, LoginRequestDTO } from 'src/modules/auth/dtos';
import * as bcrypt from 'bcrypt';
import { Role } from '@/common/utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginRequestDTO) {
    const { email, password } = data;
    const member = await this.memberRepository.findOne({
      where: { email: email },
    });
    if (!member) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      member.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    const payload = { email, sub: member.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async createMember(createMemberRequestDTO: CreateMemberRequestDTO) {
    const { email, password, verificationCode } = createMemberRequestDTO;
    const isMemberExist = await this.memberRepository.findOne({
      where: { email: email },
    });

    if (isMemberExist) {
      throw new UnauthorizedException('Already exists the member!');
    }
    // 이메일에서 @ 앞부분을 추출하여 nickname으로 사용
    const nickname = email.split('@')[0];

    const hashedPassword = await bcrypt.hash(password, 10);

    const member = this.memberRepository.create({
      email,
      nickname,
      password: hashedPassword,
      auth: Role.User,
    });

    return await this.memberRepository.save(member);
  }
}
