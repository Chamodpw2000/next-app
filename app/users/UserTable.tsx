import React from 'react'

const UserTable = async () => {
    interface User {
        id: number
        name: string
        email: string
    }
    //

    const res = await fetch('https://jsonplaceholder.typicode.com/users', 
        // {cache: "no-store}"
        // {next : {revalidate: 10 } }
    )
    const users: User[] = await res.json()
  return (
    <div>
            <h1>Users</h1>
          

            <table className='table table-bordered'>
                <thead>
                    <th>Name</th>
                    <th>Email</th>
                </thead>

                <tbody>
                {users.map((user) => (



                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                       
                    </tr>






))}
                </tbody>
            
            </table>
        </div>
  )
}

export default UserTable
