import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entities/role.entity';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        name : Role.name, 
        useFactory : () => {
          let schema = RoleSchema; 
          return schema;
        }
      }
    ])
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
