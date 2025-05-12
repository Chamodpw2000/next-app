import Link from 'next/link'
import React from 'react'
import { sort } from 'fast-sort'
interface User {
    id: number
    name: string
    email: string
}

interface Props {
    sortOrder: string
}
const UserTable = async ({ sortOrder }: Props) => {







    const res = await fetch('https://jsonplaceholder.typicode.com/users',
        // {cache: "no-store}"
        // {next : {revalidate: 10 } }
    )
    const users: User[] = await res.json()

    const sortedUsers = sort(users).asc(sortOrder === "email" ? ((user) => user.email) : ((user) => user.name))
    return (
        <div>
            <h1>Users</h1>


            <table className='table table-bordered'>
                <thead>
                    <Link href="/users?sortOrder=name"> <th>Name</th> </Link>
                    <Link href="/users?sortOrder=email"> <th>Email</th> </Link>

                </thead>

                <tbody>
                    {sortedUsers.map((user) => (



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