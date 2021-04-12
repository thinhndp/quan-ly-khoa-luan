import Post from '../models/Post.js';

export const getPosts = (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const createPost = (req, res) => {
  const post = req.body;
  const newPost = new Post(post);

  newPost.save()
    .then(() => {
      res.status(201).json(newPost);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
};