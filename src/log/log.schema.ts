import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'logs' })
export class Log extends Document {
  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  statusCode: number;

  @Prop({ required: true })
  statusMessage: string[];

  @Prop({ required: true })
  duration: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
