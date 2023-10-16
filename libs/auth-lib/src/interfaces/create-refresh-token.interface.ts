export interface CreateRefreshToken {
  token: string;
  expireDate: Date;
  deviceId: string;
  userId: number;
}
