import { User } from '@app/models/user';
import { Comment } from '@app/models/comment';

export interface Task {
  _id: string;
  task: string;
  users?: User[];
  comments?: Comment[];
  marks?: string[];
  createdAt?: string;
  updatedAt?: string;
}
