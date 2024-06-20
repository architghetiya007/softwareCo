import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './JwtStrategy.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'WERTYYJ45666666', // Replace with your secret key
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
  ],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
