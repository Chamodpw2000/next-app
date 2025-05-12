import React from 'react'
import UserTable from './UserTable'
import Link from 'next/link'

interface Props {
  searchParams: { sortOrder?: string }
}

const UserPage = async ({ searchParams }: Props) => {
  const sortOrder = searchParams?.sortOrder || 'default'

  return (
    <div>
      <div>
        <h1>UserPage</h1>

        <Link href="/users/new" className="btn">
          New User
        </Link>
        <h2>Sort Order : {sortOrder}</h2>
      </div>

      <UserTable sortOrder={sortOrder} />
    </div>
  )
}

export default UserPage
