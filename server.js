import express from 'express'

import { PORT, DB_URL } from './config'

import mongoose from 'mongoose'

const app = express()

import routes from './routes'

import errorHandler from './middleware/errorHandler'

import path from 'path'

app.use(express.json())

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => {
    console.log('connected')
})
.catch(error => {
    console.log(error)
})
global.apRoot = path.resolve(__dirname)
app.use(express.urlencoded({extended:false}))
app.use('/api', routes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})