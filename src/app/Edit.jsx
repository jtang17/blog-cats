import React from 'react';
import ReactDOM from 'react-dom';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      open: false
    }
   this.toggleTextArea = this.toggleTextArea.bind(this);
   this.handleChange = this.handleChange.bind(this);

  }

  toggleTextArea() {
    this.setState({
      open: !this.state.open
    })
  }

  handleChange(e) {
    this.setState({ content: e.target.value });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleTextArea}>Edit</button>
        <br />
        {this.state.open ?
          <textarea value={this.state.content} style={{height: 100, width: 350}} onChange={this.handleChange} /> : null
        }
        <br />
        {this.state.open ? <button onClick={() => this.props.editEntry(this.props.id, this.state.content)}>Submit</button> : null}
      </div>

    );
  }
}

export default Edit;

        /*  <button onClick={() => editEntry(blog._id)} >Edit{blog.id}</button> */