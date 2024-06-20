import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
    constructor(private readonly jwtService: JwtService, private configService: ConfigService) { }

    signToken(payload: any) {
        return this.jwtService.signAsync(payload, {
            algorithm: 'HS256',
            secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
            expiresIn: this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRE')
        });
    }

    generateRefreshToken(payload: any) {
        return this.jwtService.signAsync(payload, {
            algorithm: 'HS256',
            secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
            expiresIn: this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRE'),
        });
    }

    verifyToken(token: string) {
        return this.jwtService.verifyAsync(token, {
            algorithms: ['HS256'],
            secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
        });
    }
}
