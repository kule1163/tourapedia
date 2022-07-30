import mongoose from "mongoose";
import PostModel, { PostModelSchema } from "../models/postModel";
import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary";

export const getPosts = asyncHandler(async (req, res) => {
  const { page } = req.query;

  const limit = 3;
  const startIndex = (Number(page) - 1) * limit;
  const total = await PostModel.countDocuments({});
  const tours = await PostModel.find()
    .limit(limit)
    .skip(startIndex)
    .sort({ createdAt: -1 });

  const posts = {
    data: tours,
    currentPage: Number(page),
    totalTours: total,
    numberOfPages: Math.ceil(total / limit),
  };

  if (posts) {
    res.status(200).json(posts);
  } else {
    throw new Error("something went wrong getPosts");
  }
});

export const getToursByUser = asyncHandler(async (req, res) => {
  const { page } = req.query;

  const limit = 3;
  const startIndex = (Number(page) - 1) * limit;
  const total = await PostModel.find({
    user: req.currentUser._id,
  }).countDocuments({});
  const tours = await PostModel.find({ user: req.currentUser._id })
    .limit(limit)
    .skip(startIndex)
    .sort({ createdAt: -1 });

  const posts = {
    data: tours,
    currentPage: Number(page),
    totalTours: total,
    numberOfPages: Math.ceil(total / limit),
  };

  if (!mongoose.Types.ObjectId.isValid(req.currentUser._id)) {
    res.status(404).json({ message: "User doesn't exist" });
  }

  res.status(200).json(posts);
});

export const createPost = asyncHandler(async (req, res) => {
  const { title, description, category, tags } = req.body;

  if (req.currentUser.id) {
    if (!title || !description || !tags || !category) {
      res.status(400);
      throw new Error("please add all field");
    }

    let result;

    if (req.file) {
      result = await cloudinary.uploader.upload(req.file?.path);
    }

    const post = new PostModel({
      ...req.body,
      postImage: {
        url: result
          ? result.secure_url
          : "https://res.cloudinary.com/da30n9tw5/image/upload/v1659043847/cld-sample-2.jpg",
        public_id: result ? result.public_id : "default",
      },
      user: req.currentUser.id,
    });

    if (post) {
      post.save();
      res.status(201).json(post);
    }
  } else {
    throw new Error("no user");
  }
});

export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("id is not valid");
  }

  const post: PostModelSchema | null = await PostModel.findById(id);

  if (post) {
    if (!req.currentUser.id) {
      throw new Error("no user");
    }

    if (req.currentUser.id !== post.user?.toString()) {
      throw new Error("not authorized");
    }

    let newPost;

    if (req.file) {
      await cloudinary.uploader.destroy(post.postImage.public_id);
      const result = await cloudinary.uploader.upload(req.file?.path);

      newPost = {
        ...req.body,
        postImage: {
          url: result
            ? result.secure_url
            : "https://res.cloudinary.com/da30n9tw5/image/upload/v1659043847/cld-sample-2.jpg",
          public_id: result ? result.public_id : "default",
        },
        _id: id,
      };
    } else {
      newPost = {
        category: req.body.category,
        description: req.body.description,
        title: req.body.title,
        tags: req.body.tags,
        _id: id,
      };
    }

    const updatedPost = await PostModel.findByIdAndUpdate(id, newPost, {
      new: true,
    });

    res.json(updatedPost);
  }
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("post not found");
  }

  if (!req.currentUser) {
    res.status(401);
    throw new Error("user not found");
  }

  if (post.user.toString() !== req.currentUser.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  if (post) {
    await cloudinary.uploader.destroy(post.postImage.public_id);
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

export const likePost = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.body.id);

  if (!post) {
    res.status(404);
    throw new Error("no post with that id");
  } else {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.body.id,
      {
        $push: { likes: req.currentUser._id },
      },
      { new: true }
    );

    res.status(200).json({ updatedPost, userId: req.currentUser._id });
  }
});

export const dislikePost = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.body.id);

  if (!post) {
    res.status(404);
    throw new Error("no post with that id");
  } else {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.currentUser._id } },
      { new: true }
    );

    res.status(200).json({ updatedPost, userId: req.currentUser._id });
  }
});

export const getSinglePost = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  await post?.populate("user", "firstname lastname");
  res.status(200).json(post);
});

export const getToursByTag = asyncHandler(async (req, res) => {
  const { tag } = req.params;

  const posts = await PostModel.find({ tags: { $in: tag } });

  res.status(200).json(posts);
});

export const getRelatedPosts = asyncHandler(async (req, res) => {
  const { tags } = req.body;
  const { id } = req.params;

  const relatedPosts = await PostModel.find({
    tags: { $in: tags },
    _id: { $nin: id },
  });

  res.status(200).json(relatedPosts);
});

export const getTourByCategory = asyncHandler(async (req, res) => {
  const { categ } = req.params;

  const posts = await PostModel.find({ category: categ });

  res.status(200).json(posts);
});

export const getToursBySearch = asyncHandler(async (req, res) => {
  const { searchQuery } = req.query as any;
  const { page } = req.query;

  const limit = 3;
  const startIndex = (Number(page) - 1) * limit;

  if (searchQuery) {
    const title = new RegExp(searchQuery, "i");
    const total = await PostModel.find({ title }).countDocuments({});
    const tours = await PostModel.find({ title })
      .limit(limit)
      .skip(startIndex)
      .sort({ createdAt: -1 });

    const posts = {
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit),
    };

    res.status(200).json(posts);
  } else {
    res.status(404).json({ message: "Something went wrong" });
  }
});
