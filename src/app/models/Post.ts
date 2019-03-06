import User from './User';
import Tag from './Tag';
import { Comment } from './Comment';

export interface Post {
  id?: number;
  title: string;
  text: string;
  image: string;
  timestamp: number;
  owner: User;
  likes?: User[];
  tags: Tag[];
  comments?: Comment[];
}
