import { User } from '@app/models/user';
import { Column } from '@app/models/column';

export interface Board {
  _id: string;
  title: string;
  users?: User[];
  columns?: Column[];
  createdAt?: string;
  updatedAt?: string;
}

export interface DNDData {
  source: DNDDataElement;
  destination: DNDDataElement;
  boardId?: string;
}

class DNDDataElement {
  droppableId: string;
  index: number;
}
