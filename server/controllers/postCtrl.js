import Post from '../models/Post.js';
import ThuMuc from '../models/ThuMuc.js';

export const getPosts = (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getPostsWithQuery = (req, res) => {
  const { search, pagingOptions } = req.body;
  const searchRegex = new RegExp("^.*" + search + ".*");
  Post.paginate({ title: { $regex: searchRegex, $options: "i" } }, pagingOptions)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getPublicPosts = (req, res) => {
  Post.find({ type: 'CK', isPosted: true  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getPrivatePosts = (req, res) => {
  Post.find({ isPosted: true })
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

export const getPostWSubmitterById = (req, res) => {
  console.log(req.params.id);
  Post.findOne({ _id: req.params.id }).populate('submitter')
    .then((post) => {
      res.status(201).json(post);
      /* if (post.submitter != null) {
        ThuMuc.findOne({ _id: post.submitter })
          .then((thuMuc) => {
            let returnedPost = post;
            returnedPost.submitterObj = thuMuc;
            res.status(201).json(returnedPost);
          })
      } */
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createPost = (req, res) => {
  const post = req.body;
  const newPost = new Post(post);

  console.log(post);

  newPost.save()
    .then(() => {
      res.status(201).json(newPost);
    })
    // .catch((err) => {
    //   res.status(400).json({ message: err.message });
    // });
};

export const updatePostById = (req, res) => {
  const post = req.body;
  const id = req.params.id;
  Post.updateOne({ _id: id }, post)
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