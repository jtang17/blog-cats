import React from 'react';
import Edit from './Edit.jsx';

const Blog = ({blogs, clickUser, deleteEntry, editEntry}) => (
  <div id='bloglist'>
    {blogs.map((blog, index) =>
      <div key={index}>
        <span>
          <h4>{blog.title}</h4>
        </span>
        <br />
        <span>
          <img src={`https://robohash.org/${blog.username}.jpg?set=set4`} height="50" width="50" /><br />
          <span onClick={() => clickUser(blog.username) }><b>{blog.username}</b></span> wrote:
          <br />
          {blog.created_at}
          <br />
          <p>{blog.content}</p>
          <Edit editEntry={editEntry} content={blog.content} id={blog._id} />
          <button onClick={() => deleteEntry(blog._id)}>Delete</button>
        </span>
      </div>
    )}
  </div>
);

export default Blog;

      {/*
      {this.state.blogs.map((blog, index) => (
        <p key={index} >{blog.created_at} - A user wrote {blog.content}</p>
      ))}*/}