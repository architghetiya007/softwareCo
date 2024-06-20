import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Modules } from "src/modules/entities/module.entity";

export type RoleDocument = Role & Document

@Schema({
    timestamps : true,
    collection : 'Role'
})

export class Role {
    @Prop({
        type: String,
        required: true,
    })
    name: string

    @Prop({
        type: [
            {
                module : {
                    type : mongoose.Types.ObjectId,
                    ref: 'Modules',
                    required: false
                }, 
                isActive : {
                    type : Boolean,
                    required: false,
                    default: true
                }
            }
        ],
        required: false
    })
    accessModules: {
        module : Modules;
        isActive : boolean
    }[];

    @Prop({
        type: Date,
        required: false,
        default: null
    })
    deletedAt: Date
}

export const RoleSchema = SchemaFactory.createForClass(Role);