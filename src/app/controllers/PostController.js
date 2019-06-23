const mongoose = require('mongoose')
const isValidId = mongoose.Types.ObjectId.isValid

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

  async show (req, res) {
    const { id } = req.params
    const post = await Post.findById(id).populate('author')
    return res.status(200).json(post)
  }

  async destroy (req, res) {
    const { id } = req.params
    if (!isValidId(id)) {
      return res.status(404).json({ error: 'The id provided is not valid' })
    }
    await Post.findByIdAndRemove(id)
    res.send()
  }
}
module.exports = new PostController()
