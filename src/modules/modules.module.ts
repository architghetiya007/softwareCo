import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Modules, ModulesSchema } from './entities/module.entity';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        name: Modules.name, 
        useFactory:() => {
          let schema = ModulesSchema; 
          return schema;
        }
      }
    ])
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
