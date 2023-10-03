import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '@/modules/member/entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  CreateMemberRequestDTO,
  LoginRequestDTO,
  UpdatePasswordRequestDTO,
} from 'src/modules/auth/dtos';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { Role } from '@/common/utils';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { UpdateNicknameRequestDTO } from '@/modules/auth/dtos/UpdateNicknameRequestDTO';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async login(data: LoginRequestDTO) {
    const { email, password } = data;
    const member = await this.memberRepository.findOne({
      where: { email: email },
    });
    if (!member) {
      throw new UnauthorizedException('잘못된 인증 정보입니다.');
    }
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      member.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('잘못된 인증 정보입니다.');
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

    const storedVerificationCode = await this.getRandomCode(email);

    // verificationCode 유효성 검사
    if (verificationCode !== storedVerificationCode) {
      throw new UnauthorizedException('Invalid verification code!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const member = this.memberRepository.create({
      email,
      nickname,
      password: hashedPassword,
      auth: Role.User,
    });

    return await this.memberRepository.save(member);
  }

  async sendEmail(email: string): Promise<boolean> {
    const getRandomCode = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const randomCode = getRandomCode(111111, 999999);

    const transport = nodemailer.createTransport({
      service: 'Gmail',
      secure: true,
      auth: {
        type: 'OAuth2',
        user: this.configService.get<string>('GMAIL_ID'),
        clientId: this.configService.get<string>('GMAIL_CLIENT_ID'),
        clientSecret: this.configService.get<string>('GMAIL_CLIENT_SECRET'),
        refreshToken: this.configService.get<string>('GMAIL_REFRESH_TOKEN'),
        accessToken: this.configService.get<string>('GMAIL_ACCESS_TOKEN'),
        expires: 300, //5분
      },
    });

    const sendResult = await transport.sendMail({
      from: {
        name: '인증관리자',
        address: this.configService.get<string>('GMAIL_ID'),
      },
      subject: '🔥AjouTayo 회원 가입 인증 이메일 입니다🔥',
      to: [email],
      text: `인증 코드 : ${randomCode}
인증 코드는 5분 후에 만료되오니, 시간 내에 인증 완료 부탁 드립니다 :)
인증이 원활히 이루어지지 않을 시 다시 로그인을 시도해주세요`,
    });

    await this.storeRandomCodeWithExpiration(email, randomCode);

    return sendResult.accepted.length > 0;
  }

  async checkEmail(email: string): Promise<boolean> {
    const isMemberExist = await this.memberRepository.findOne({
      where: { email: email },
    });

    if (isMemberExist) {
      return false;
    }

    return true;
  }

  async storeRandomCodeWithExpiration(
    email: string,
    randomCode: string,
  ): Promise<void> {
    const redisClient = this.redisService.getClient();
    await redisClient.set(email, randomCode, 'EX', 300);
  }

  async getRandomCode(email: string): Promise<string | null> {
    const redisClient = this.redisService.getClient();
    const randomCode = await redisClient.get(email);
    return randomCode ? randomCode.toString() : null;
  }

  async getNickname(id: number): Promise<string> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      throw new BadRequestException('유저 정보 오류');
    }
    return member.nickname;
  }

  async updateNickname(
    id: number,
    updateNicknameRequestDTO: UpdateNicknameRequestDTO,
  ) {
    const { nickname } = updateNicknameRequestDTO;

    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      throw new BadRequestException('유저 정보 오류');
    }

    member.nickname = nickname;
    await this.memberRepository.save(member);

    return member.nickname;
  }

  async updatePassword(
    id: number,
    updatePasswordRequestDTO: UpdatePasswordRequestDTO,
  ): Promise<boolean> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      throw new BadRequestException('유저 정보 오류');
    }

    const { newPw, checkPw } = updatePasswordRequestDTO;
    if (newPw !== null && checkPw !== null && newPw === checkPw) {
      const hashedNewPassword = await bcrypt.hash(newPw, 10);
      member.password = hashedNewPassword;
      await this.memberRepository.save(member);
      return true;
    } else {
      throw new BadRequestException('다시 입력해주세요.');
    }
  }
}
