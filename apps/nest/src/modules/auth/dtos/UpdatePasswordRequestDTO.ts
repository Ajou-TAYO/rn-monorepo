import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePasswordRequestDTO {
  @IsNotEmpty({ message: '비밀번호를 입력해주세요' })
  @IsString()
  @Length(8, 30, { message: '비밀번호를 8자 이상 30자 이하로 입력해주세요.' })
  newPw: string;

  @IsNotEmpty({ message: '비밀번호를 입력해주세요' })
  @IsString()
  @Length(8, 30, { message: '비밀번호를 8자 이상 30자 이하로 입력해주세요.' })
  checkPw: string;
}
