import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto, GetModules, UpdateModuleDto } from './dto/request.dto';
import { ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseFailResponse, BaseSuccessResponse } from 'src/utils/common.dto';
import { CreateModuleResponseDto, GetModulesResponse } from './dto/response.dto';

@ApiTags('Modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create Module',
    description: 'Publish post',
    tags: ['CREATE', 'POST']
  })
  @ApiBody({
    type: CreateModuleDto,
    required: true
  })
  @ApiOkResponse({
    type: CreateModuleResponseDto,
    description: 'Module created Successfully'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  create(@Body() body: CreateModuleDto) {
    return this.modulesService.create(body);
  }

  @Post('get')
  @ApiOperation({
    summary: 'Get Module',
    description: 'Get post',
    tags: ['FETCH', 'GET']
  })
  @ApiBody({
    type: GetModules,
    required: true
  })
  @ApiOkResponse({
    type: GetModulesResponse,
    description: 'Module created Successfully'
  })
  findAll(@Body() body: GetModules) {
    return this.modulesService.findAll(body);
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Update Module',
    description: 'Update Module',
    tags: ['PATCH', 'MODULE']
  })
  @ApiBody({
    type: UpdateModuleDto,
    required: true
  })
  @ApiOkResponse({
    type: BaseSuccessResponse,
    description: 'Module created Successfully'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  update(@Body() body: UpdateModuleDto) {
    return this.modulesService.update(body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Module',
    description: 'Delete Module',
    tags: ['DELETE', 'MODULE']
  })
  @ApiParam({
    name: 'id', 
    required: true, 
    schema: {
      type: 'string'
    }
  })
  @ApiOkResponse({
    type: BaseSuccessResponse,
    description: 'Module created Successfully'
  })
  @ApiInternalServerErrorResponse({
    type: BaseFailResponse,
    description: 'Internal server error'
  })
  remove(@Param('id') id: string) {
    return this.modulesService.remove(id);
  }
}
