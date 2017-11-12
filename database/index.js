const mongoose = require('mongoose');

let mongoDb = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/mvp_db';
mongoose.connect(mongoDb, {useMongoClient: true});
let db = mongoose.connection;

//DROP DATABASE

// db.on('open', function() {
//   mongoose.connection.db.dropDatabase(function (err) {
//     console.log('db dropped');
//     process.exit(0);
//   });
// });

//
let Schema = mongoose.Schema;

let PostsSchema = new Schema({
  username: {type: String, required: true },
  title: {type: String},
  content: {type: String, required: true}
}, {timestamps: {createdAt: 'created_at' } });

let UsersSchema = new Schema({
  id: String,
  token: String,
  email: String,
  name: String
})


mongoose.model('Post', PostsSchema);
let Post = mongoose.model('Post');
let User = mongoose.model('User', UsersSchema);

exports.Post = Post;
exports.User = User;