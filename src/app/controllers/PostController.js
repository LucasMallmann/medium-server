const Post = require('../models/Post')

class PostController {
  async index (req, res) {
    const { id: author } = req.params

    const posts = await Post.paginate(
      { author },
      {
        page: req.query.page || 1,
        limit: parseInt(req.query.limit) || 10,
        sort: '-createdAt',
        populate: 'author'
      }
    )
    return res.json(posts)
  }

  async store (req, res) {
    const { id: author } = req.params
    const { text, title, description } = req.body
    const { filename: featured_img } = req.file

    if (await Post.findOne({ title, author })) {
      return res
        .status(400)
        .json({ error: 'You already wrote a Post with this title' })
    }

    const post = await Post.create({
      author,
      text,
      title,
      description,
      featured_img
    })

    return res.status(201).json(post)
  }
}
module.exports = new PostController()
