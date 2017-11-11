const mongoose = require('mongoose');

let mongoDb = 'mongodb://127.0.0.1/mvp_db';
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
  // id: {type: Number, unique: true, required: true},
  // user: {type: String, required: true},
  // title: String,
  // time: String,
  content: {type: String, required: true}
}, {timestamps: {createdAt: 'created_at' } });

mongoose.model('Post', PostsSchema);
let Post = mongoose.model('Post');


exports.Post = Post;