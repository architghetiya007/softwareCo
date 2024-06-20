import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserAuthService } from 'src/auth/user-auth.service';
import { UtilsModule } from 'src/auth/utils.module';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        name: User.name, 
        useFactory: () => {
          let schema = UserSchema;
          return schema;
        }
      }
    ]),
    UtilsModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
