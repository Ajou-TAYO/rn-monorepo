import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateMemberRequestDTO {
  @IsEmail({}, { message: '이메일 형식을 입력해주세요.' })
  @Matches(/.+@ajou.ac.kr/, { message: '아주대학교 이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요' })
  @Matches(/.{8,30}/, {
    message: '비밀번호를 8자 이상 30자 이하로 입력해주세요.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  verificationCode: string;
}
