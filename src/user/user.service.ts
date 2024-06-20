import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import {
  ListRequestDto,
  LoginRequestDto,
  SignupRequestDto,
} from './dto/request.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
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
      const token = await this.authService.generateJwtToken({
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
      const token = await this.authService.generateJwtToken({
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
