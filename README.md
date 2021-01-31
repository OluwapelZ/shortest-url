# Url Shortening Service
Url Shortening service to:
- encode(shorten) urls and give a short version of it
- decode urls and give the orginally encoded url with the slug provided

## Setup
### Environmental setup
- Make a duplicate of the .env-sample file: `cp .env-sample .env`
- Install dependencies: `npm install`

### Start App
#### Development Environment
`npm run start:dev`

#### Production Environment
`npm run start`

## Run Test
To run all tests on this service simply run:
`npm test`

## Objective

Your assignment is to implement a URL shortening service using Node and any framework.

### Brief

ShortLink is a URL shortening service where you enter a URL such as https://codesubmit.io/library/react and it returns a short URL such as http://short.est/GeAi9K. [nanoid]

### Tasks

-   Implement assignment using:
    -   Language: **Node**
    -   Framework: **any framework** [Express]-[Typescript]
    -   Two endpoints are required
        -   /encode - Encodes a URL to a shortened URL
        -   /decode - Decodes a shortened URL to its original URL.
    -   Both endpoints should return JSON
-   There is no restriction on how your encode/decode algorithm should work. You just need to make sure that a URL can be encoded to a short URL and the short URL can be decoded to the original URL. **You do not need to persist short URLs to a database. Keep them in memory.** [SessionStorage]
-   Provide detailed instructions on how to run your assignment in a separate markdown file
-   Provide API tests for both endpoints

### Evaluation Criteria

-   **Node** best practices
-   API implemented featuring a /encode and /decode endpoint

### CodeSubmit

Please organize, design, test and document your code as if it were going into production - then push your changes to the master branch. After you have pushed your code, you may submit the assignment on the assignment page.

All the best and happy coding,

The finn GmbH Team