import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  createToken(role: string): string {
    const payload = { role };
    return this.jwtService.sign(payload);
  }
}
