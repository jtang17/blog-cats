const mongoose = require('mongoose');

let mongoDB = 'mongdb://127.0.0.1/mvp_db';
mongoose.connect(mongoDb, {useMongoClient: true});

let db = mongoose.connection;

const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  id: {type: Number, unique: true, required: true},
  user: {type: String, required: true},
  title: String,
  time: String,
  content: {type: String, required: true}
});

const Posts = mongoose.model('Posts', PostsSchema);

exports.Posts = Posts;