export class RegistrationResponse {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public username: string,
    public birthDate: string,
    public password: string
  ) {
  }
}
