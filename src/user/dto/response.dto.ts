import { ApiResponseProperty } from "@nestjs/swagger";
import { User, UserDocument } from "../entities/user.entity";

export class SignupResponse { 
    @ApiResponseProperty({
        type: User
    })
    data : User | UserDocument
}