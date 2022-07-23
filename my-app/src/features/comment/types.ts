import { UserProps } from "../auth/types";

export interface CommentProps {
  _id: string;
  content: string;
  post: string;
  writer: UserProps;
  responseTo: string;
  reply: boolean;
  childComments: boolean;
  likes: string[];
  dislikes: string[];
  status: string;
}

export interface SetLeftProps {
  left: number;
  id: string;
}
