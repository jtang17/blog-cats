import React from 'react';

const Users = ({users, clickUser}) => (
  <div id='users'>
  <h4>Users</h4>
    <ul>
    {users.map((user, index) =>
      <li key={index} onClick={() => clickUser(user)}> {user} </li>
    )}
    </ul>
  </div>
);

export default Users;

      {/*
      {this.state.blogs.map((blog, index) => (
        <p key={index} >{blog.created_at} - A user wrote {blog.content}</p>
      ))}*/}

              // <b>Users:</b>
        // {this.state.users.map((user, index) => <p key={index} onClick={() => this.clickUser(user)}>{user}</p> )}