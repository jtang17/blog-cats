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
      users: []
    }
    this.loadBlogs = this.loadBlogs.bind(this);
    this.clickUser = this.clickUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadBlogs();
  }

  loadBlogs() {
    axios.get('/api/blogs')
      .then((res) => { this.setState({
          blogs: res.data,
          users: [...new Set(res.data.map((obj) => obj.username))]
        })
      })
      .catch((err) => { console.log(err); })
  }
  clickUser(user) {
    console.log(user);
    axios.get(`api/user/${user}`)
      .then((res) => { this.setState({blogs: res.data }) })
      .catch((err) => { console.error(err); })
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
    this.setState({ username: '', title: '', content: ''})
  }

  handleChange(e, input) {
    this.setState({ [input]: e.target.value });
  }

  render() {
    return (
      <div id="main">
        <h3> Welcome to Blog Auth </h3>

        <Blog blogs={this.state.blogs} clickUser={this.clickUser}></Blog>

        <form onSubmit={this.handleSubmit}>
            User:
            <input type="text" value={this.state.username} onChange={ (e) => this.handleChange(e, 'username')} />
          <br />
            Title:
            <input type="text" value={this.state.title} onChange={ (e) => this.handleChange(e, 'title')} />
          <br />
            Blog Post:
            <br />
            <span>
              <textarea value={this.state.content} style={{height: 300, width: 300}} onChange={ (e) => this.handleChange(e, 'content')} />
            </span>
        </form>
        <button onClick={this.handleSubmit}>Submit</button>
        <br />
        <br />
        <b>Users:</b>
        {this.state.users.map((user, index) => <p key={index} onClick={() => this.clickUser(user)}>{user}</p> )}
        <div id="footer">
          <center>
          <button onClick={this.loadBlogs} >Main Page</button>
          </center>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));