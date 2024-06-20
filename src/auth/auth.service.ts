import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(payload: any): Promise<string> {
    try {
        const token = this.jwtService.sign(payload);
        return token;
      } catch (error) {
        // Handle error
        throw new Error(`Failed to generate JWT token: ${error.message}`);
      }
  }
}
