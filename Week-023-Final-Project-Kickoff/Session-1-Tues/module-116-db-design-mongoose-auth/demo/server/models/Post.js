// Post model with user relationships, validation, and query optimization

const mongoose = require('mongoose');

// Define the Post schema with comprehensive validation
const postSchema = new mongoose.Schema({
  // Post title with validation
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },

  // Post content
  content: {
    type: String,
    required: [true, 'Post content is required'],
    minlength: [10, 'Content must be at least 10 characters long'],
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },

  // Reference to the User who created this post
  // This creates a relationship between Post and User
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post must have an author']
  },

  // Tags for categorizing posts
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],

  // Track post status
  status: {
    type: String,
    enum: {
      values: ['draft', 'published', 'archived'],
      message: '{VALUE} is not a valid status'
    },
    default: 'published'
  },

  // Count of views for analytics
  viewCount: {
    type: Number,
    default: 0,
    min: [0, 'View count cannot be negative']
  },

  // Featured posts appear first in listings
  isFeatured: {
    type: Boolean,
    default: false
  },

  // Track when post was published (different from createdAt)
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

// Create indexes for frequently queried fields
// Compound index for filtering by author and status
postSchema.index({ author: 1, status: 1 });
// Index for sorting by published date
postSchema.index({ publishedAt: -1 });
// Index for searching by tags
postSchema.index({ tags: 1 });
// Text index for full-text search on title and content
postSchema.index({ title: 'text', content: 'text' });

// Virtual property: commentCount
// This creates a virtual populate to count post's comments
postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

// Virtual property: excerpt
// Creates a short preview of the content
postSchema.virtual('excerpt').get(function() {
  // Return first 150 characters followed by ellipsis
  if (this.content.length > 150) {
    return this.content.substring(0, 150) + '...';
  }
  return this.content;
});

// Virtual property: readingTime
// Estimates reading time based on average reading speed
postSchema.virtual('readingTime').get(function() {
  // Average reading speed is 200 words per minute
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
});

// Pre-save middleware: Set publishedAt when status changes to published
postSchema.pre('save', function(next) {
  // If status is being changed to published and publishedAt is not set
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  next();
});

// Instance method: Increment view count
postSchema.methods.incrementViews = async function() {
  this.viewCount += 1;
  await this.save({ validateBeforeSave: false });
};

// Instance method: Check if user is the author
postSchema.methods.isAuthor = function(userId) {
  // Convert both to strings for comparison
  return this.author.toString() === userId.toString();
};

// Instance method: Publish the post
postSchema.methods.publish = async function() {
  this.status = 'published';
  this.publishedAt = Date.now();
  await this.save();
};

// Instance method: Archive the post
postSchema.methods.archive = async function() {
  this.status = 'archived';
  await this.save();
};

// Static method: Get published posts with pagination
postSchema.statics.getPublishedPosts = async function(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const posts = await this.find({ status: 'published' })
    .populate('author', 'username firstName lastName')
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await this.countDocuments({ status: 'published' });

  return {
    posts,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalPosts: total
  };
};

// Static method: Get posts by tag
postSchema.statics.getPostsByTag = async function(tag) {
  return await this.find({
    status: 'published',
    tags: tag
  })
    .populate('author', 'username firstName lastName')
    .sort({ publishedAt: -1 });
};

// Static method: Search posts by keyword
postSchema.statics.searchPosts = async function(keyword) {
  return await this.find({
    $text: { $search: keyword },
    status: 'published'
  })
    .populate('author', 'username firstName lastName')
    .sort({ score: { $meta: 'textScore' } });
};

// Static method: Get post analytics using aggregation
postSchema.statics.getAnalytics = async function() {
  const analytics = await this.aggregate([
    {
      // Match only published posts
      $match: { status: 'published' }
    },
    {
      // Group by author and calculate statistics
      $group: {
        _id: '$author',
        totalPosts: { $sum: 1 },
        totalViews: { $sum: '$viewCount' },
        averageViews: { $avg: '$viewCount' },
        latestPost: { $max: '$publishedAt' }
      }
    },
    {
      // Look up author information
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'authorInfo'
      }
    },
    {
      // Unwind the author array
      $unwind: '$authorInfo'
    },
    {
      // Project only needed fields
      $project: {
        _id: 0,
        authorId: '$_id',
        username: '$authorInfo.username',
        totalPosts: 1,
        totalViews: 1,
        averageViews: { $round: ['$averageViews', 2] },
        latestPost: 1
      }
    },
    {
      // Sort by total posts descending
      $sort: { totalPosts: -1 }
    }
  ]);

  return analytics;
};

// Static method: Get trending posts
postSchema.statics.getTrendingPosts = async function(limit = 5) {
  // Get posts with highest views in the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return await this.find({
    status: 'published',
    publishedAt: { $gte: sevenDaysAgo }
  })
    .populate('author', 'username firstName lastName')
    .sort({ viewCount: -1 })
    .limit(limit);
};

// Configure toJSON to include virtuals
postSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

// Create the Post model from the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
