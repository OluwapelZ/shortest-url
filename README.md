# Url Shortening Service
Url Shortening service to:
- encode(shorten) urls and give a short version of it
- decode urls and give the orginally encoded url with the slug provided

## Implementation Summary

### Design Concerns
- Potential for collision
- How many urls can you generate before you start to have duplicates
- Avoid encoding multiple times. Consistent echoing/hashing

### Things to add if done again
- Expire slugs
- Editor config (Prep for contribution)

### Encode: Steps to encode url
- Generate unique short id - [shortid](https://www.npmjs.com/package/shortid)
- Generate slug id/code: Dynamic index substring length from string of numbers generated randomly. Two packages were used to reduce collision probability between slugCodes
- Generate hash from original url and check if hash already exists, if not save it.
- Save the encode data in [redis](https://redis.io/) with the longurl hash as key
- Save the encode data in [redis](https://redis.io/) with the slugcode as key [Reason for persisting twice is to place a constraint on multiple request of already encoded url]
- Return shortened url

### Decode: Steps to decode url
- Fetch for data from node redis with the slug code (key)
- Throw an error if the no url mapped to the slug code
- Return the long url.

## Setup
### Environmental setup
- Make a duplicate of the .env-sample file: `cp .env-sample .env`
- Install dependencies: `npm install`

### Start App
#### With Docker
- [First Run] Build and run image: `docker-compose up --build`
- Run existing image: `docker-compose up`
#### Without Docker
##### Development Environment
`npm run start:dev`

##### Production Environment
`npm run start`
## Run Test
To run all tests on this service simply run:
`npm test`

### Contribution
- Branch out of master branch
- Follow the existing convention to maintain code quality
- Submit your contributions for Review
