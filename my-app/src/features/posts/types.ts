import { UserProps } from "../auth/types";

export interface EntitieProps {
  category: string;
  description: string;
  postImage: {
    url: string;
    public_id: string;
  };
  tags: string[];
  title: string;
  user: {
    _id: string;
    firstname: string;
    lastname: string;
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  dislikes: string[];
}

export interface PaginateTourProps {
  data: EntitieProps[];
  currentPage: number;
  totalTours: number;
  numberOfPages: number;
}

export interface HandleLike {
  updatedPost: EntitieProps;
  userId: string;
}
