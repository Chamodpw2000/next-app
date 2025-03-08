import axios from 'axios'
import React from 'react'


interface User {
    id: number
    name: string
    
}

const NewUserPage = async () => {

const res = await axios.get('https://jsonplaceholder.typicode.com/users')
const users: User[] =  res.data;

  return (
    <div>

        <h1>Users</h1>

        <ul>

            {users.map((user) => <li key={user.id} >{user.name}</li>)}
        </ul>




    </div>
  )
}

export default NewUserPage