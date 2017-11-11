import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Blog from './Blog.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      title: '',
      content: '',
      blogs: [],
    }
    this.loadBlogs = this.loadBlogs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadBlogs();
  }

  loadBlogs() {
    axios.get('/api/blogs')
      .then((res) => { this.setState({ blogs: res.data }) })
      .catch((err) => { console.log(err); })
  }

  handleSubmit() {
    let msg = {
      username: this.state.username,
      title: this.state.title,
      content: this.state.content
    }

    axios.post('/api/blogs', msg)
    .then((res) => { setTimeout(this.loadBlogs, 300); })
    .catch((err) => {console.log(err); });
  }

  handleChange(e, input) {
    this.setState({ [input]: e.target.value });
  }

  render() {
    return (
      <div id="main">
        <h3> Welcome to Blog Auth </h3>

        <Blog blogs={this.state.blogs}></Blog>

        <form onSubmit={this.handleSubmit}>
          <label>
            User:
            <input type="text" value={this.state.username} onChange={ (e) => this.handleChange(e, 'username')} />
          </label>
          <br />
          <label>
            Title:
            <input type="text" value={this.state.title} onChange={ (e) => this.handleChange(e, 'title')} />
          </label>
          <br />
          <label>
            Blog Post:
            <br />
            <span>
              <textarea value={this.state.content} style={{height: 300, width: 300}} onChange={ (e) => this.handleChange(e, 'content')} />
            </span>
          </label>
        </form>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));