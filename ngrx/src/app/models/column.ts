import { Task } from '@app/models/task';

export interface Column {
  _id: string;
  title: string;
  tasks?: Task[];
  createdAt?: string;
  updatedAt?: string;
}
