import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import mongoose, { Model } from 'mongoose';
import {
  ListRequestDto,
  LoginRequestDto,
  SignupRequestDto,
} from './dto/request.dto';
import { UserAuthService } from 'src/auth/user-auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private userAuthService : UserAuthService
  ) {}
  async create(body: SignupRequestDto) {
    try {
      let user = await this.userModel.findOne({ email: body.email });
      if (user) {
        throw new BadRequestException({
          status: false,
          message: 'User already present',
        });
      }

      user = await this.userModel.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        fullName: body.fullName,
        password: body.password,
        role: body.role,
      });
      const token = await this.userAuthService.signToken({
        userId: user._id,
        role: user.role,
      });
      return {
        status: true,
        message: 'User signup successfully',
        data: user,
        token,
      };
    } catch (error) {
      console.log(error, 'error');
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error',
      });
    }
  }

  async login(body: LoginRequestDto) {
    try {
      let user = await this.userModel.findOne({ email: body.email });
      if (!user) {
        throw new BadRequestException({
          status: false,
          message: 'Invalid credentials',
        });
      }

      if (user.password != body.password) {
        throw new BadRequestException({
          status: false,
          message: 'Invalid credentials',
        });
      }

      const token = await this.userAuthService.signToken({
        userId: user._id,
        version: Date.now(),
      });
      return {
        status: true,
        message: 'User signup successfully',
        data: user,
        token,
      };
    } catch (error) {
      console.log(error, 'error');
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error',
      });
    }
  }

  async checkHavingAccess(moduleId:string) {
    try {
      let havingAccess = await this.userModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId('6674524f5653eb8bb6c06b1c')
          }
        }, 
        {
          $lookup: {
            from: 'Role', 
            localField: 'role', 
            foreignField: '_id', 
            as: 'roles'
          }
        }, 
        {
          $unwind: {
            path: '$roles', 
            preserveNullAndEmptyArrays: true
          }
        }, 
        {
          $unwind: {
            path: '$roles.accessModules', 
            preserveNullAndEmptyArrays: true
          }
        }, 
        {
          $match: {
            'roles.accessModules.module': new mongoose.Types.ObjectId('66744d2452e527aafee7dfad')
          }
        }
      ])
    } catch (error) {
      throw new InternalServerErrorException({
        status : true, 
        message : 'Internal server error'
      })
    }
  }

  async list(body: ListRequestDto) {
    try {
      let query = {};
      if (body.search) {
        query['$or'] = [
          { firstName: { $regex: body.search, $options: 'i' } },
          { lastName: { $regex: body.search, $options: 'i' } },
          { fullName: { $regex: body.search, $options: 'i' } },
        ];
      }
      let users = await this.userModel
        .find(query)
        .populate({ path: 'role', select: 'name accessModules' });
      return {
        users: users,
      };
    } catch (error) {
      console.log(error, 'error');
      throw new InternalServerErrorException({
        status: false,
        message: 'Internal server error',
      });
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
