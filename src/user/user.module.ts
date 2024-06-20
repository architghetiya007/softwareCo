import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

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
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
