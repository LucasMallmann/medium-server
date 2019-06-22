const Post = require('../models/Post')

class LikeController {
  async store (req, res) {
    const { id } = req.params
    const post = await Post.findById(id)

    await post.clap()

    return res.json(post)
  }
}

module.exports = new LikeController()
