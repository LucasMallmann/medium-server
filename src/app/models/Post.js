const mongoose = require('mongoose')
const paginate = require('mongoose-paginate')

const PostSchema = new mongoose.Schema(
  {
    text: String,
    title: String,
    description: String,
    claps: {
      type: Number,
      default: 0
    },
    featured_img: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

PostSchema.methods.clap = function () {
  this.claps += 1
  return this.save()
}

PostSchema.plugin(paginate)

module.exports = mongoose.model('Post', PostSchema)
