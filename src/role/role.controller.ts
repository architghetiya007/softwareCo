import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleRequestDto, UpdateRoleRequestDto, updateAccessModule } from './dto/request.dto';
import { ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BaseFailResponse, BaseSuccessResponse } from 'src/utils/common.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/add-role')
  @ApiOperation({
    summary: 'Add roles',
    description: 'Add roles',
    tags: ['CREATE', 'POST']
  })
  @ApiBody({
    type: CreateRoleRequestDto,
    required: true
  })
  @ApiOkResponse({
    type: BaseSuccessResponse,
    description: 'Add role successfully'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  create(@Body() body: CreateRoleRequestDto) {
    return this.roleService.create(body);
  }

  @Get('/get-roles')
  @ApiOperation({
    summary: 'Get roles',
    description: 'Get roles',
    tags: ['GET', 'ROLES']
  })
  @ApiOkResponse({
    type: BaseSuccessResponse,
    description: 'Get role successfully'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  findAll() {
    return this.roleService.findAll();
  }

  @Get('/get-roles-with-active-modules')
  @ApiOperation({
    summary: 'Get roles Modules',
    description: 'Get roles Modules',
    tags: ['GET', 'ROLES']
  })
  @ApiOkResponse({
    type: BaseSuccessResponse,
    description: 'Get role successfully'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  findAllWithActiveModules() {
    return this.roleService.findAllWithActiveModules();
  }

  @Put('update-roles')
  @ApiOperation({
    summary: 'Update roles',
    description: 'Update roles',
    tags: ['ROLES', 'PUT']
  })
  @ApiBody({
    type: UpdateRoleRequestDto,
    required: true
  })
  @ApiOkResponse({
    type: BaseSuccessResponse,
    description: 'Role updated successfully'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  update(@Body() body: UpdateRoleRequestDto) {
    return this.roleService.update(body);
  }

  @Put('update-roles-access')
  @ApiOperation({
    summary: 'Update roles access',
    description: 'Update roles access',
    tags: ['ROLES', 'PUT']
  })
  @ApiBody({
    type: updateAccessModule,
    required: true
  })
  @ApiOkResponse({
    type: BaseSuccessResponse,
    description: 'Role updated with access'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  updateAccessModule(@Body() body: updateAccessModule) {
    return this.roleService.updateAccessModule(body)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete roles ',
    description: 'Delete roles',
    tags: ['ROLES', 'DELETE']
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: {
      type: 'string',
    }
  })
  @ApiOkResponse({
    type: BaseSuccessResponse,
    description: 'Role deleted'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
