const User = require('../models/User')

class UserController {
  async store (req, res) {
    const { email, name, password } = req.body
    const { filename: avatar } = req.file

    if (await User.findOne({ email })) {
      return res
        .status(400)
        .json({ error: 'This email has already been taken' })
    }

    const user = await User.create({
      email,
      name,
      password,
      avatar
    })
    return res.status(201).json(user)
  }
}

module.exports = new UserController()
