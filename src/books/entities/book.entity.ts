import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/libs/database/abstract.schema';

@Schema({ versionKey: false })
export class Book extends AbstractDocument {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Number,
    default: -1,
  })
  score?: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
