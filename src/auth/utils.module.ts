import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserAuthGuard } from './user-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET_KEY'),
        signOptions: {
          algorithm: 'HS256',
          expiresIn: configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRE'),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          return schema;
        }
      }
    ]),
  ],
  providers: [UserAuthService, JwtService, UserAuthGuard],
  exports: [UserAuthService, JwtService, UserAuthGuard]
})
export class UtilsModule { }
