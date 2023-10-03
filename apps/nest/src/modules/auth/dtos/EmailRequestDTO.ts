import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class EmailRequestDTO {
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @IsEmail({}, { message: '이메일 형식을 입력해주세요.' })
  @Matches(/.+@ajou.ac.kr/, { message: '아주대학교 이메일을 입력해주세요.' })
  email: string;
}
