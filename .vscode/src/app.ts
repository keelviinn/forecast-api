require('dotenv').config();

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {    
    const 
      DATABASE_ENV = process.env.DATABASE_ENV,
      MONGO_STRING: string = process.env.MONGO_STRING || ''

    mongoose.connect(MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log(`Connection to database successful on enviroment ${DATABASE_ENV}`))
    .catch((err) => console.error(err));
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
