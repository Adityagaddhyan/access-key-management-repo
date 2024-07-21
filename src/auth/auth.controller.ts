import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  createToken(@Body() body: { role: string }): { access_token: string } {
    const { role } = body;
    const token = this.authService.createToken(role);
    return { access_token: token };
  }
}
