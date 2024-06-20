import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

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