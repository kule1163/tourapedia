export interface LikeProps {
  _id: string;
  userId: string;
  itemId: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
}

export interface LikeDataProps {
  likeResult: LikeProps;
  dislikeResult: LikeProps;
}
