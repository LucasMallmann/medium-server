const Post = require('../models/Post')

class FeedController {
  async index (req, res) {
    const posts = await Post.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: parseInt(req.query.limit) || 10,
        sort: '-createdAt',
        populate: 'author'
      }
    )
    return res.json(posts)
  }
}

module.exports = new FeedController()
