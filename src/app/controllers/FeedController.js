const Post = require('../models/Post')

class FeedController {
  async index (req, res) {
    const posts = await Post.find()
    return res.json(posts)
  }
}

module.exports = new FeedController()
