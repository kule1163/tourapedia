import asyncHandler from "express-async-handler";
import CommentModel from "../models/commentModel";

export const createComment = asyncHandler(async (req, res) => {
  const { comment, postId, responseTo } = req.body;

  const newComment = new CommentModel({
    postId: postId,
    writer: req.currentUser._id,
    content: comment,
    responseTo: responseTo ? responseTo : null,
  });

  newComment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });

    CommentModel.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

export const getComments = asyncHandler(async (req, res) => {
  CommentModel.find({ postId: req.params.postId })
    .sort({ createdAt: -1 })
    .populate("writer")
    .exec((err, result) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true, result });
    });
});

export const getReplies = asyncHandler(async (req, res) => {
  const { responseTo } = req.body;

  CommentModel.find({ _id: responseTo })
    .populate("writer")
    .exec((err, result) => {
      if (err) return res.json(err);
      return res.status(200).json(result);
    });
});
