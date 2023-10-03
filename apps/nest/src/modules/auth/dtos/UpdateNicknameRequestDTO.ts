import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNicknameRequestDTO {
  @IsString()
  @IsNotEmpty({ message: '새 닉네임을 입력하세요.' })
  public nickname: string;
}
