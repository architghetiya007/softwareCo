import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateRoleRequestDto,
  UpdateRoleRequestDto,
  updateAccessModule,
} from './dto/request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './entities/role.entity';
import mongoose, { Model } from 'mongoose';
import { BaseSuccessResponse } from 'src/utils/common.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private RoleModel: Model<RoleDocument>,
  ) {}
  async create(body: CreateRoleRequestDto): Promise<BaseSuccessResponse> {
    let accessModules = [];
    if (body.accessModules.length > 0) {
      for (let i = 0; i < body.accessModules.length; i++) {
        const element = body.accessModules[i];
        accessModules.push({ module: element });
      }
    }
    await this.RoleModel.create({
      name: body.name,
      accessModules: accessModules,
    });

    return {
      status: true,
      message: 'Role created with access module',
    };
  }

  async findAll() {
    try {
      let roles = await this.RoleModel.find({ deletedAt: null }).populate({
        path: 'accessModules.module',
      });
      return {
        status: true,
        message: 'Roles list with access modules',
        data: roles,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error',
      });
    }
  }

  async findAllWithActiveModules() {
    try {
      let roles = await this.RoleModel.aggregate([
        {
          $match: {
            deletedAt: null,
          },
        },
        {
          $unwind: {
            path: '$accessModules',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            'accessModules.isActive': true,
          },
        },
        {
          $lookup: {
            from: 'Modules',
            localField: 'accessModules.module',
            foreignField: '_id',
            as: 'accessModules',
          },
        },
        {
          $group: {
            _id: '$_id',
            roles: {
              $push: {
                name: '$name',
                accessModules: '$accessModules',
                deletedAt: '$deletedAt',
              },
            },
          },
        },
      ]);
      return {
        status: true,
        message: 'Roles list with access modules',
        data: roles,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error',
      });
    }
  }

  async update(body: UpdateRoleRequestDto) {
    try {
      let update = await this.RoleModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(body._id) },
        { name: body.name },
        { new: true },
      ).select('name');
      return {
        status: true,
        message: 'role name updated',
        data: update,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error',
      });
    }
  }

  async updateAccessModule(body: updateAccessModule) {
    if (body.isDelete) {
      try {
        await this.RoleModel.updateOne(
          { _id: new mongoose.Types.ObjectId(body._id) },
          {
            $pull: {
              accessModules: {
                module: new mongoose.Types.ObjectId(body.accessModuleId),
              },
            },
          },
        );
      } catch (error) {
        throw new InternalServerErrorException({
          status: false,
          message: 'Internal server error',
        });
      }
      return {
        status: true,
        message: 'Access Deleted',
      };
    } else if (body.isPush) {
      try {
        let present = await this.RoleModel.findOne({ _id: new mongoose.Types.ObjectId(body._id), 'accessModules.module' : new mongoose.Types.ObjectId(body.accessModuleId),})
        if(!present) {
          await this.RoleModel.updateOne(
            { _id: new mongoose.Types.ObjectId(body._id) },
            {
              $addToSet: {
                accessModules: {
                  module: new mongoose.Types.ObjectId(body.accessModuleId),
                  isActive: body.isActive,
                },
              },
            },
          );

          return {
            status: true,
            message: 'New access added',
          };
        }
          return {
            status: true,
            message: 'Access already there',
          };
      } catch (error) {
        throw new InternalServerErrorException({
          status: false,
          message: 'Internal server error',
        });
      }

    } else {
      try {
        await this.RoleModel.updateOne(
          {
            _id: new mongoose.Types.ObjectId(body._id),
            'accessModules.module': new mongoose.Types.ObjectId(
              body.accessModuleId,
            ),
          },
          { $set: { 'accessModules.isActive': body.isActive } },
        );
      } catch (error) {
        throw new InternalServerErrorException({
          status: false,
          message: 'Internal server error',
        });
      }
      return {
        status: true,
        message: 'Access Deleted',
      };
    }
  }

  async remove(id: string) {
    try {
      await this.RoleModel.deleteOne({ _id: id });
      return {
        status: true,
        message: 'Role deleted',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error',
      });
    }
  }
}
