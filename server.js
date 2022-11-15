const express = require("express");

const app = express();
const cors = require("cors");
const Post = require("./postModel");
require("dotenv").config();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const PORT = process.env.PORT;
var jsonParser = bodyParser.json();
app.use(cors());
console.log(process.env.DB_ADMIN);

const dbURL = process.env.DB_URL.replace("<password>", process.env.DB_PASS);
mongoose.connect(
  dbURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("FAILED TO CONNECT TO MONGODB");
      console.error(err);
    } else {
      console.log("CONNECTED TO MONGODB");
      app.listen(80);
    }
  }
);

const db = mongoose.connection;

app.get("/posts", async (req, res) => {
  let posts = await Post.find();
  res.json({
    status: "success",
    results: posts.length,
    data: {
      posts: posts,
    },
  });
});
app.get("/post/:id", async (req, res) => {
  let result = await Post.findById(req.params.id);

  res.json({
    status: "success",
    results: result.length,
    data: {
      posts: result,
    },
  });
});
app.post("/make-post", jsonParser, async (req, res) => {
  var post = new Post(req.body);
  post.save(function (err, post) {
    if (err) return console.error(err);
    console.log(post.title + " saved to bookstore collection.");
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
