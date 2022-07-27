import expressAsyncHandler from "express-async-handler";
import CommentModel from "../models/commentModel";
import DislikeModel from "../models/handleLike/dislikeModel";
import LikeModel from "../models/handleLike/likeModel";
import PostModel from "../models/postModel";

export const getLikes = expressAsyncHandler(async (req, res) => {
  const { itemId } = req.body;

  const likeCount = await LikeModel.find({ itemId });

  res.status(200).json(likeCount);
});

export const upLike = expressAsyncHandler(async (req, res) => {
  const { postId, commentId } = req.body;

  let currentItem = null;

  if (postId) currentItem = await PostModel.findById(postId);
  if (commentId) currentItem = await CommentModel.findById(commentId);

  if (currentItem) {
    currentItem
      .updateOne(
        {
          $push: { likes: req.currentUser._id },
          $pull: { dislikes: req.currentUser._id },
        },

        { new: true }
      )
      .exec((err: any) => {
        if (err) res.status(404).json({ success: false, err });
        res.status(200).json(req.likeVeriable);
      });
  }
});

export const unLike = expressAsyncHandler(async (req, res) => {
  const { postId, commentId } = req.body;

  let currentItem = null;

  if (postId) currentItem = await PostModel.findById(postId);
  if (commentId) currentItem = await CommentModel.findById(commentId);

  if (currentItem) {
    currentItem
      .updateOne(req.body.itemId, {
        $pull: { likes: req.currentUser._id },
      })
      .exec((err, currentPost) => {
        if (err) res.status(404).json({ success: false, err });
        res.status(200).json(req.likeVeriable);
      });
  }
});

export const getDislikes = expressAsyncHandler(async (req, res) => {
  const { itemId } = req.body;

  const dislikeCount = await DislikeModel.find({ itemId });

  res.status(200).json(dislikeCount);
});

export const upDislike = expressAsyncHandler(async (req, res) => {
  const { postId, commentId } = req.body;

  let currentItem = null;

  if (postId) currentItem = await PostModel.findById(postId);
  if (commentId) currentItem = await CommentModel.findById(commentId);

  if (currentItem) {
    currentItem
      .updateOne(
        {
          $pull: { likes: req.currentUser._id },
          $push: { dislikes: req.currentUser._id },
        },

        { new: true }
      )
      .exec((err: any) => {
        if (err) res.status(404).json({ success: false, err });
        res.status(200).json(req.likeVeriable);
      });
  }
});

export const unDislike = expressAsyncHandler(async (req, res) => {
  const { postId, commentId } = req.body;

  let currentItem = null;

  if (postId) currentItem = await PostModel.findById(postId);
  if (commentId) currentItem = await CommentModel.findById(commentId);

  if (currentItem) {
    currentItem
      .updateOne({
        $pull: { dislikes: req.currentUser._id },
      })
      .exec((err, currentPost) => {
        if (err) res.status(404).json({ success: false, err });
        res.status(200).json(req.likeVeriable);
      });
  }
});
