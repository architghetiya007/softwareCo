import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Modules } from "src/modules/entities/module.entity";
import { Role } from "src/role/entities/role.entity";

export type UserDocument = User & Document

@Schema({
    timestamps : true,
    collection : 'User'
})

export class User {
    @Prop({
        type: String,
        required: true,
    })
    fullName: string;

    @Prop({
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Role'
    })
    role: Role;

    @Prop({
        type: String,
        required: true,
    })
    email: string;

    @Prop({
        type: String,
        required: true,
    })
    password: string;

    @Prop({
        type: Date,
        required: false,
        default: null
    })
    deletedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User);