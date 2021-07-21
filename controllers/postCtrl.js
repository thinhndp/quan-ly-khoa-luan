import Post from '../models/Post.js';
import ThuMuc from '../models/ThuMuc.js';
import * as Utils from '../utils/utils.js';

export const getPosts = (req, res) => {
  Post.find().sort({ postedTime: -1 })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getPostsWithQuery = (req, res) => {
  // Search and Paging
  const { search, pagingOptions } = req.body;

  // Filters
  const reqQuery = { ...req.query };
  const removeFields = [ "sort" ];
  removeFields.forEach((val) => delete reqQuery[val]);
  let queryStr = JSON.stringify(reqQuery);
  queryStr = Utils.getConvertedQueryString(queryStr);

  const queryFilters = JSON.parse(queryStr);
  console.log(queryFilters);
  var rawFilters = {
    title: '',
    content: '',
    type: '',
    isPosted: '',
    postedTime: { $gte: '1970-01-01T00:00:00.000Z', $lte: '2036-12-31T23:59:59.000Z' },
    deadline: { $gte: '1970-01-01T00:00:00.000Z', $lte: '2036-12-31T23:59:59.000Z' },
  }
  rawFilters = { ...rawFilters, ...queryFilters };
  var filters = {
    title: rawFilters.title == '' ? Utils.getIncludeFilter(search) : Utils.getIncludeFilter(rawFilters.title),
    content: Utils.getIncludeFilter(rawFilters.content),
    type: Utils.getIncludeFilter(rawFilters.type),
    isPosted: rawFilters.isPosted == 'POSTED' ? true : false,
    postedTime: rawFilters.postedTime,
    deadline: rawFilters.deadline,
  };
  if (rawFilters.isPosted == '') {
    delete filters.isPosted;
  }
  if (filters.postedTime.$lte && !filters.postedTime.$gte) {
    filters.postedTime.$gte = '1970-01-01T00:00:01.000Z'
  }
  if (filters.deadline.$lte && !filters.deadline.$gte) {
    filters.deadline.$gte = '1970-01-01T00:00:01.000Z'
  }
  if (queryFilters.deadline == null) {
    delete filters.deadline;
  }
  console.log(filters);

  Post.paginate(filters, {
    ...pagingOptions,
    sort: { updatedAt: -1 }
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getPublicPosts = (req, res) => {
  /* Post.find({ type: 'CK', isPosted: true  }).sort({ postedTime: -1 })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
 */
  // Search and Paging
  const { search, pagingOptions } = req.body;

  var filters = {
    title: Utils.getIncludeFilter(search),
    isPosted: true,
    type: Utils.getIncludeFilter('CK'),
  };

  Post.paginate(filters, {
      ...pagingOptions,
      sort: { postedTime: -1 }
    })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getPrivatePosts = (req, res) => {
  /* Post.find({ isPosted: true }).sort({ postedTime: -1 })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    }); */

  // Search and Paging
  const { search, pagingOptions } = req.body;

  var filters = {
    title: Utils.getIncludeFilter(search),
    isPosted: true,
  };

  Post.paginate(filters, {
      ...pagingOptions,
      sort: { postedTime: -1 }
    })
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