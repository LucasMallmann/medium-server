require('dotenv').config()
const express = require('express')
const Youch = require('youch')
const validate = require('express-validation')
const mongoose = require('mongoose')
const path = require('path')

const databaseConfig = require('./config/database')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV === 'development'
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
  }

  routes () {
    this.express.use(require('./routes'))
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    )
  }

  exception () {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (this.isDev) {
        const youch = new Youch(err, req)
        return res.json(await youch.toJSON())
      }

      return res
        .status(err.status || 500)
        .json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
