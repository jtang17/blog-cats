import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      blogs: []
    }
    this.loadBlogs = this.loadBlogs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  loadBlogs() {
    axios.get('/api/blogs')
      .then((res) => {
        console.log('retrieve blogs from server here:');
        console.log(res.data);
        this.setState({ blogs: res.data })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleSubmit() {
    let text = this.state.content;
    console.log(text);
    //post request to api/blogs
    axios.post('/api/blogs', {
      content: text
    })
    .then((res) => {
      console.log('test');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleChange(e) {
    this.setState({ content: e.target.value})
    e.preventDefault();
  }
  render() {
    return (
      <div>
      <h3> Welcome to Blog Auth </h3>
      <form onSubmit={this.handleSubmit}>
        <label>
          Blog Post:
          <input type="text" value={this.state.content} onChange={this.handleChange} />
        </label>
      </form>
      <button onClick={this.handleSubmit}>Submit</button>
      <button onClick={this.loadBlogs}>Load Blogs</button>
      {this.state.blogs.map((blog, index) => (
        <p key={index}>{blog.user} A user wrote {blog.content}</p>
      ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));