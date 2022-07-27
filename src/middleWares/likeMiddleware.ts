import expressAsyncHandler from "express-async-handler";

export const likeVeriable = expressAsyncHandler(async (req, res, next) => {
  const { postId, commentId } = req.body;

  console.log("uplike", postId);

  const userId = req.currentUser._id;
  let veriable = {};

  if (postId) veriable = { postId, userId };
  if (commentId) veriable = { commentId, userId };

  req.likeVeriable = veriable;

  next();
});
