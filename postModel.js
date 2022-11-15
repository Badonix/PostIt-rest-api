const mongoose = require("mongoose");
const postSchema = require("./postSchema");

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
