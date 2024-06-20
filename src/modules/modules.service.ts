import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateModuleDto,
  GetModules,
  UpdateModuleDto,
} from './dto/request.dto';
import {
  CreateModuleResponseDto,
  GetModulesResponse,
} from './dto/response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Modules, ModulesDocument } from './entities/module.entity';
import { Model } from 'mongoose';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Modules.name)
    private ModulesModel: Model<ModulesDocument>,
  ) {}
  async create(body: CreateModuleDto): Promise<CreateModuleResponseDto> {
    let find = await this.ModulesModel.findOne({ name: body.name });
    if (find) {
      throw new BadRequestException({
        status: false,
        message: 'Module with same name exists',
      });
    }

    let created = await this.ModulesModel.create({ name: body.name });
    return {
      status: true,
      message: 'Modules created successfully',
      data: created,
    };
  }

  async findAll(body: GetModules): Promise<GetModulesResponse> {
    let query = {};
    if (body.search) {
      query = {
        name: { $regex: body.search, $options: 'i' }, // Case-insensitive search
      };
    }

    const modules = await this.ModulesModel.find(query)
      .skip((body.page - 1) * body.limit)
      .limit(body.limit);

    const count = await this.ModulesModel.countDocuments(query);

    return {
      data: {
        page: modules,
        count: count,
      },
      status: true,
      message: 'Modules fetched successfully',
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  async update(body: UpdateModuleDto) : Promise<CreateModuleResponseDto> {
    try {
      let update = await this.ModulesModel.findOneAndUpdate(
        { _id: body._id },
        { name: body.name },
        { new: true },
      );
      return {
        status: true,
        message: 'updated data',
        data: update,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status : false, 
        message : 'Internal server error'
      });
    }
  }

  async remove(id: string) {
    try {
      await this.ModulesModel.deleteOne({ _id : id})
      return {
        status : true, 
        message : 'Module deleted'
      }
    } catch (error) {
      throw new InternalServerErrorException({
        status : false, 
        message : 'Internal server error'
      });
    }
  }
}
