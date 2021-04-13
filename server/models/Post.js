import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  creator: String,
  category: [ String ],
  type: String,
  isPosted: Boolean,
  postedTime: {
    type: Date,
    default: new Date()
  },
});

const Post = mongoose.model('Post', postSchema, 'Post');

export default Post;