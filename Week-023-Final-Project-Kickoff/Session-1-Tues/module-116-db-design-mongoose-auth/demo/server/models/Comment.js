// Comment model demonstrating complex relationships and nested data

const mongoose = require('mongoose');

// Define the Comment schema with relationships to Post and User
const commentSchema = new mongoose.Schema({
  // Comment content
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    minlength: [1, 'Comment must be at least 1 character long'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },

  // Reference to the Post this comment belongs to
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Comment must belong to a post']
  },

  // Reference to the User who wrote this comment
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment must have an author']
  },

  // Support for nested comments (replies)
  // A comment can be a reply to another comment
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },

  // Track if comment has been edited
  isEdited: {
    type: Boolean,
    default: false
  },

  // Track when comment was last edited
  editedAt: {
    type: Date
  }
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

// Create indexes for efficient queries
// Index for finding all comments on a post
commentSchema.index({ post: 1, createdAt: -1 });
// Index for finding all comments by a user
commentSchema.index({ author: 1 });
// Compound index for finding replies to a comment
commentSchema.index({ parentComment: 1, createdAt: 1 });

// Virtual property: replies
// Get all replies to this comment
commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentComment'
});

// Pre-save middleware: Mark as edited if content changes
commentSchema.pre('save', function(next) {
  // If content is modified and it's not a new comment
  if (this.isModified('content') && !this.isNew) {
    this.isEdited = true;
    this.editedAt = Date.now();
  }
  next();
});

// Instance method: Check if user is the author
commentSchema.methods.isAuthor = function(userId) {
  return this.author.toString() === userId.toString();
};

// Static method: Get comments for a post with nested replies
commentSchema.statics.getCommentsForPost = async function(postId) {
  // Get all top-level comments (no parent)
  const topLevelComments = await this.find({
    post: postId,
    parentComment: null
  })
    .populate('author', 'username firstName lastName')
    .populate({
      path: 'replies',
      populate: {
        path: 'author',
        select: 'username firstName lastName'
      }
    })
    .sort({ createdAt: -1 });

  return topLevelComments;
};

// Static method: Get comment count by post
commentSchema.statics.getCommentCountByPost = async function(postId) {
  return await this.countDocuments({ post: postId });
};

// Configure toJSON to include virtuals
commentSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

// Create the Comment model from the schema
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
