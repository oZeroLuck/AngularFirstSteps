export class UpPswrdRequest {
  constructor(
    private id: number,
    private currentPassword: string,
    private newPassword: string) {}
}
