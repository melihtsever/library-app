import * as mongoose from 'mongoose';
export type MutationCallback<T> = (
  session: mongoose.ClientSession,
) => Promise<T>;

export class Transaction {
  constructor(private readonly connection: mongoose.Connection) {}

  /**
   * Runs the provided `mutations` callback within a transaction and commits the changes to the DB
   * only when it has run successfully.
   *
   * @param mutations A callback which does DB writes and reads using the session.
   */
  public async run<T>(mutations: MutationCallback<T>): Promise<T> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const value = await mutations(session);
      await session.commitTransaction();
      return value;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
