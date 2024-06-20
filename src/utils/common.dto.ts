import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BaseSuccessResponse {
    @ApiResponseProperty({
        type: Boolean,
    })
    status: boolean;

    @ApiResponseProperty({
        type: String,
    })
    message: string;
}

export class BaseFailResponse {
    @ApiResponseProperty({
        type: Boolean,
    })
    status: boolean;

    @ApiResponseProperty({
        type: String,
    })
    message: string;

    @ApiResponseProperty({
        type: String,
    })
    error: string;
}

export class BasePaginatedResponse<T = any> {
    @ApiResponseProperty({
        type: [Object],
    })
    page: T[];

    @ApiResponseProperty({
        type: Number,
    })
    count: number;
}

export class BasePaginationRequest {
    @ApiProperty({
        name: 'page',
        required: false,
        type: Number,
        minimum: 1,
        description: 'Page Number',
    })
    @IsNotEmpty()
    @IsNumber()
    page?: number;

    @ApiProperty({
        name: 'limit',
        required: false,
        type: Number,
        minimum: 1,
        description: 'Number of items per page',
    })
    @IsNotEmpty()
    @IsNumber()
    limit?: number;
}
