import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserAuthService } from './user-auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';
@Injectable()
export class UserAuthGuard {
  constructor(private readonly userAuthService: UserAuthService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.userAuthService.verifyToken(
        token
      );
      let user = await this.userModel.findById(payload.userId)
      if (!user) {
        throw new UnauthorizedException();
      }
      request['user'] = user;
      return true;
    } catch (err: any) {
      console.log(err, 'err<<<<<<')
      throw new UnauthorizedException();
    }
    // throw new UnauthorizedException();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
