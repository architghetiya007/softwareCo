import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleRequestDto {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    name : string;

    @ApiProperty({
        type: [String]
    })
    @IsArray()
    accessModules : string[]
}

export class UpdateRoleRequestDto {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    name : string;

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    _id : string;
}

export class updateAccessModule {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    accessModuleId : string;

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    _id : string;

    @ApiProperty({
        type: Boolean
    })
    @IsNotEmpty()
    isActive : boolean

    @ApiProperty({
        type: Boolean
    })
    @IsNotEmpty()
    isDelete : boolean

    @ApiProperty({
        type: Boolean
    })
    @IsNotEmpty()
    isPush : boolean

}