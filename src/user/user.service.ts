import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { SignupRequestDto } from './dto/request.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel : Model<UserDocument>
  ) {}
  async create(body: SignupRequestDto) {
    try {
      let user = await this.userModel.findOne({ email : body.email});
      if(user) { 
        throw new BadRequestException({
          status : false, 
          message : 'User already present'
        })
      }

      user = await this.userModel.create({ email: body.email, fullName: body.fullName, password: body.password, role: body.role}); 

      return { 
        status : true, 
        message : 'User signup successfully', 
        data : user
      }
    } catch (error) {
      console.log(error,'error')
      throw new InternalServerErrorException({
        status: false, 
        message : 'Internal server error'
      })
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
