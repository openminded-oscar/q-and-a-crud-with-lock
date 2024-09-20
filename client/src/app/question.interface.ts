export interface IQuestion {
  _id: string;
  title: string;
  answer: string;
  lockId?: string;
  createdAt: Date;
  updatedAt: Date;
}
