import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Book } from 'src/books/entities/book.entity';
import { AbstractDocument } from 'src/libs/database';
import { User } from 'src/users/entities/user.entity';

export enum LoanStatuses {
  ACTIVE = 100,
  RETURNED = 200,
}

export type LoanPopulatedDocument = Loan & { user: User } & {
  book: Book;
} & Document;

@Schema({ versionKey: false })
export class Loan extends AbstractDocument {
  @Prop({ type: Number, default: LoanStatuses.ACTIVE })
  status: LoanStatuses;

  @Prop({
    type: String,
    required: true,
  })
  bookId: string;

  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: Number,
  })
  score?: number;

  @Prop({
    type: SchemaTypes.Date,
  })
  returnedAt?: Date;
}

const LoanSchema = SchemaFactory.createForClass(Loan);

LoanSchema.virtual('user', {
  ref: User.name,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

LoanSchema.virtual('book', {
  ref: Book.name,
  localField: 'bookId',
  foreignField: '_id',
  justOne: true,
});

export { LoanSchema };
