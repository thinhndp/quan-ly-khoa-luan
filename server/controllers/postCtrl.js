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

export const getPostById = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createPost = (req, res) => {
  const post = req.body;
  const newPost = new Post(post);

  newPost.save()
    .then(() => {
      res.status(201).json(newPost);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const updatePostById = (req, res) => {
  console.log(req);
  const post = req.body;
  const id = req.params.id;

  Post.updateOne({ _id: req.params.id }, post)
    .then(() => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}