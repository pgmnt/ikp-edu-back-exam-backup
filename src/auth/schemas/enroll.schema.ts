import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
  })
  export class enroll{
   
    @Prop()
    question: string;


    @Prop()
    IsPass : boolean[];

    @Prop({default : 'false'})
    Examination : boolean;

   
  }
  
  export const enrollSchema = SchemaFactory.createForClass(enroll);
  