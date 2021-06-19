import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ""
  },
  creator: String,
  // category: [ String ],
  type: {
    type: String,
    enum: ['NB', 'CK'],
    default: 'NB'
  },
  isPosted: {
    type: Boolean,
    default: false
  },
  postedTime: {
    type: Date,
    default: Date.parse('1970-01-01T00:00:00.000Z'),
  },
  submitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ThuMuc'
  },
  hasDeXuatButton: {
    type: Boolean,
    default: false
  },
  hasDKDTButton: {
    type: Boolean,
    default: false
  },
  /* submitterObj: {
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
  }, */
});

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', postSchema, 'Post');

export default Post;