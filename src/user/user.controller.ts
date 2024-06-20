import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ListRequestDto, LoginRequestDto, SignupRequestDto, UpdateDynamicRequest, UpdateManyUsersRequest } from './dto/request.dto';
import { BaseFailResponse, BaseSuccessResponse } from 'src/utils/common.dto';
import { SignupResponse } from './dto/response.dto';
import { UserAuthGuard } from 'src/auth/user-auth.guard';
import { UserDocument } from './entities/user.entity';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Sign up ',
    description: 'Sign up ',
    tags: ['POST']
  })
  @ApiBody({
    type: SignupRequestDto,
    required: true
  })
  @ApiOkResponse({
    type: SignupResponse,
    description: 'Signup successfully'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  create(@Body() body: SignupRequestDto) {
    return this.userService.create(body);
  }


  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login',
    tags: ['POST']
  })
  @ApiBody({
    type: LoginRequestDto,
    required: true
  })
  @ApiOkResponse({
    type: LoginRequestDto,
    description: 'Login successfully'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  login(@Body() body: LoginRequestDto) {
    return this.userService.login(body);
  }

  @Post('check-having-module-access/:moduleId')
  @ApiBearerAuth("jwt")
	@UseGuards(UserAuthGuard)
  @ApiOperation({
    summary: 'Login',
    description: 'Login',
    tags: ['POST']
  })
	@ApiParam({
		name: "moduleId",
		required: true,
		schema: {
			type: "string",
		},
	})
  @ApiOkResponse({
    type: LoginRequestDto,
    description: 'Login successfully'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  checkHavingAccess(@Req() req : { user : any} ,@Param('moduleId') moduleId : string) {
    return this.userService.checkHavingAccess(req.user._id, moduleId);
  }


  @Post('list')
  @ApiOperation({
    summary: 'User List',
    description: 'User List',
    tags: ['POST']
  })
  @ApiBody({
    type: ListRequestDto,
    required: true
  })
  @ApiOkResponse({
    type: BaseSuccessResponse,
    description: 'List successfully'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  list(@Body() body: ListRequestDto) {
    return this.userService.list(body);
  }

  @Put('update-many-user')
  @ApiOperation({
    summary: 'Update many user',
    description: 'Update many user',
    tags: ['POST']
  })
  @ApiBody({
    type: UpdateManyUsersRequest,
    required: true
  })
  @ApiOkResponse({
    type: BaseSuccessResponse,
    description: 'Updated'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  updateManyUser(@Body() body: UpdateManyUsersRequest) {
    return this.userService.updateManyUser(body);
  }

  @Put('update-dynamic')
  @ApiOperation({
    summary: 'Update Dynamic',
    description: 'Update Dynamic',
    tags: ['POST']
  })
  @ApiBody({
    type: [UpdateDynamicRequest],
    required: true
  })
  @ApiOkResponse({
    type: BaseSuccessResponse,
    description: 'Updated'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  updateDynamic(@Body() body: [UpdateDynamicRequest]) {
    return this.userService.updateDynamic(body);
  }
}
