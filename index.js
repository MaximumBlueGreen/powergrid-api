const express = require('express')
const app = express()
const port = 3000

const tokenChecker = require('./token');
const jwt = require('jsonwebtoken');

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))

var usersRouter = express.Router()

usersRouter.get('/me', tokenChecker, (req, res) => {
  res.json({
    handle: "John",
    email: "john.westwig@gmail.com",
    name: "John Westwig",
    user_id: req.user_id,
  });
});

usersRouter.delete('/me', (req, res) => {
	res.send(200);
});

usersRouter.post('/me/authenticationToken', (req, res) => {
  res.json({
    token: jwt.sign({
        id: 123
    }, "SECRETSANTA", {
        expiresIn: '24h'
    })
  })
});

app.use('/users', usersRouter)
