import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BasePaginationRequest } from "src/utils/common.dto";

export class CreateModuleDto {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    name : string;
}

export class UpdateModuleDto extends CreateModuleDto {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    _id : string;
}

export class GetModules extends BasePaginationRequest {
    @ApiProperty({
        type: String
    })
    @IsOptional()
    @IsString()
    search : string;
}