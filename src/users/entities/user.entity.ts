import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/libs/database/abstract.schema';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop({
    type: String,
    required: true,
  })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
