import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));