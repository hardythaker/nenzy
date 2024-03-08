import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
    @Prop({type: SchemaTypes.String, required: true})
    title!: string;

    @Prop({type: SchemaTypes.String, required: true})
    level!: string

    @Prop({type: [SchemaTypes.String]})
    customQuestions!: string[];

    @Prop({type: SchemaTypes.String, required: true})
    departmentId!: string;

    @Prop({type: SchemaTypes.Number})
    limit!: number;

    @Prop({type: SchemaTypes.Date})
    endDate!: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);