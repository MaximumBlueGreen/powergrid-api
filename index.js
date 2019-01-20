const express = require('express')
const app = express()
const port = 3000

const tokenChecker = require('./token');
const jwt = require('jsonwebtoken');

require('dotenv').config()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))

var knex = require('knex')(require('./knexfile'));

var usersRouter = express.Router()

usersRouter.get('/me', tokenChecker, (req, res) => {
  const userId = req.user_id;

  knex('t_users').where({
    id: userId
  }).then(res.json.bind(res))
});

usersRouter.delete('/me', tokenChecker, (req, res) => {
  const userId = req.user_id;
  knex('t_users').where({
    id: userId
  }).del().then(numRows => {
    if (numRows == 1) {
      res.send(200);
    } else {
      res.send(500);
    }
  })
});

usersRouter.post('/me/authenticationToken', (req, res) => {
  res.json({
    token: jwt.sign({
        id: 321
    }, "SECRETSANTA", {
        expiresIn: '24h'
    })
  })
});

app.use('/users', usersRouter)
