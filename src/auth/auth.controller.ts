import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleLoginResponseData } from './dto/google-login.dto';

@Controller('auth/google')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  public async googleLogin(): Promise<void> {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  public async googleAuthRedirect(): Promise<GoogleLoginResponseData> {
    return await this.authService.googleLogin();
  }
}
