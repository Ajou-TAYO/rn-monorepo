import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class LoginRequestDTO {
  @IsEmail({}, { message: '이메일 형식을 입력해주세요.' })
  @Matches(/.+@ajou.ac.kr/, { message: '아주대학교 이메일을 입력해주세요.' })
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @Length(8, 30, { message: '비밀번호는 8자에서 30자 사이여야 합니다.' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}
