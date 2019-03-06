import User from './User';

export interface Comment {
  id?: number;
  comment: string;
  timestamp: number;
  user: User;
}
