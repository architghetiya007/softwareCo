import { ApiResponseProperty, PartialType } from '@nestjs/swagger';
import { BasePaginatedResponse, BaseSuccessResponse } from 'src/utils/common.dto';
import { Modules, ModulesDocument } from '../entities/module.entity';


export class CreateModuleResponseDto extends BaseSuccessResponse {
    @ApiResponseProperty({
        type : Modules
    })
    data : Modules | ModulesDocument
}

export class GetModulesResponse extends BaseSuccessResponse{ 
    @ApiResponseProperty({
        type: BasePaginatedResponse
    })
    data : BasePaginatedResponse<Modules | ModulesDocument>
}