export class TokenResponseDTO {
  public token: string;

  constructor(accessToken: string) {
    this.token = accessToken;
  }
}
