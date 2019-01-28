# powergrid-api
API for PowerGrid

[![Build Status](https://travis-ci.com/MaximumBlueGreen/powergrid-api.svg?branch=develop)](https://travis-ci.com/MaximumBlueGreen/powergrid-api)

## Running locally
### Get the code
`git clone https://github.com/MaximumBlueGreen/powergrid-api.git`
### Install dependencies
`npm install`
### Initialize your local environment
`.local.env` is provided as a starting point for your local configuration.  Copy this to `.env`.
### Create a database
Run a PostgreSQL instance on your machine (https://postgresapp.com is a popular choice).  Replace the `DATABASE_URL` environment variable in `.env` with your local connection string.  On the command line, run `knex migrate:latest` to initialize the schema and populate the database with seed data.
### Start the API server
`npm start` should do the trick!
### See it work!
All API routes will be available at http://localhost:3000/

## Contributing
### Branching
All branches are created from and pushed to `develop`.  `master` is reserved for official releases.  Name your branches succinctly and descriptively.
### Committing
Be descriptive.  If you need a style, https://www.conventionalcommits.org is a good source.
### Coding style
All code must lint without warnings or errors.  By default, every commit will be linted according to the specifications in `.eslintrc.json`.
