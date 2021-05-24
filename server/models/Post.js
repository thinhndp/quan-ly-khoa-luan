import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  creator: String,
  // category: [ String ],
  type: String,
  isPosted: Boolean,
  postedTime: {
    type: Date,
    default: new Date()
  },
  submitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ThuMuc'
  },
  submitterObj: {
    name: {
      type: String,
      required: true
    },
    link: {
      type: String
    },
    driveId: {
      type: String,
      required: true
    }
  },
});

const Post = mongoose.model('Post', postSchema, 'Post');

export default Post;