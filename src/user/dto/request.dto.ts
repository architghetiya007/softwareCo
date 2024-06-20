import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignupRequestDto { 

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    firstName : string;

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    lastName : string;
    
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    fullName : string;

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email : string;

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    password : string;

    @ApiProperty({
        type: String,
        example: '6673176477cd16392a7a85f2'
    })
    @IsNotEmpty()
    @IsString()
    role : string;
}


export class LoginRequestDto { 
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email : string;

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    password : string;
}

export class ListRequestDto { 
    @ApiProperty({
        type: String
    })
    @IsOptional()
    @IsString()
    search : string;
}

export class UpdateManyUsersRequest { 
    @ApiProperty({
        type : String
    })
    @IsNotEmpty()
    @IsString()
    lastName : string;
}

export class UpdateDynamicRequest {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    _id : string

    @ApiProperty({
        type: String
    })
    @IsOptional()
    @IsString()
    firstName : string

    @ApiProperty({
        type: String
    })
    @IsOptional()
    @IsString()
    lastName : string

    @ApiProperty({
        type: String
    })
    @IsOptional()
    @IsString()
    fullName : string
}