const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
///const userRouter = require('./routes/user-router')

//const db = require("./db/connection");

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.options('/api/*', cors())

//db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get('/', (req, res) => {
  res.send('Hello World!!!!!!!!')
})

const apiPort = 8000

app.listen(process.env.PORT || apiPort, () => console.log(`Server running on port ${apiPort}`))