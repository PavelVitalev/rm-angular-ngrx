export interface Comment {
  _id: string;
  taskId: string;
  email: string;
  name: string;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
}
