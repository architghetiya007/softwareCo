import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ModulesDocument = Modules & Document

@Schema({
    timestamps : true,
    collection : 'Modules'
})

export class Modules {
    @Prop({
        type: String,
        required: true,
    })
    name: string

    @Prop({
        type: Date,
        required: false,
        default: null
    })
    deletedAt: Date
}

export const ModulesSchema = SchemaFactory.createForClass(Modules);