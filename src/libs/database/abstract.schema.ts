import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class AbstractDocument {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: SchemaTypes.Date,
    default: () => new Date(),
  })
  createdAt: Date;

  @ApiProperty()
  @Prop({
    type: SchemaTypes.Date,
    default: () => new Date(),
  })
  updatedAt: Date;
}
