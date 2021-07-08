export interface IJwtPayload {
  email: string;
  type: 'access' | 'refresh';
}
