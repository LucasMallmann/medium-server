const express = require('express')
const routes = express.Router()
const handle = require('express-async-handler')
const validate = require('express-validation')
const cors = require('cors')

const controllers = require('./app/controllers')
const validations = require('./app/validations')
const multerConfig = require('./config/multer')

routes.use(cors())

const multer = require('multer')(multerConfig)

routes.get('/', (req, res, next) => {
  return res.json({ message: 'okay' })
})

routes.post(
  '/users',
  multer.single('avatar'),
  validate(validations.User),
  handle(controllers.UserController.store)
)

routes.post(
  '/users/:id/posts',
  multer.single('featured_img'),
  handle(controllers.PostController.store)
)
routes.get('/users/:id/posts', handle(controllers.PostController.index))

routes.get('/posts', handle(controllers.FeedController.index))

routes.get('/posts/:id', handle(controllers.PostController.show))
routes.delete('/posts/:id', handle(controllers.PostController.destroy))
routes.post('/posts/:id/like', handle(controllers.LikeController.store))

module.exports = routes
