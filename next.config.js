require("dotenv").config();
const withSass = require("@zeit/next-sass");

module.exports = withSass({
  env: {
    HOST: process.env.HOST
  }
});
