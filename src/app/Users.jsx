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