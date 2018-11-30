const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))

var usersRouter = express.Router()

usersRouter.get('/me', (req, res) => {
  res.json({
    handle: "John",
    email: "john.westwig@gmail.com",
    name: "John Westwig",
  });
});

app.use('/users', usersRouter)
