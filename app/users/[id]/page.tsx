import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params:{id: number}
}



const UserDetailsPage = ({params:{id}}: Props) => {
  if (id > 10 || typeof parseInt(id.toString()) !== "number") notFound();
  return (
    <div>
    <div>UserDetailsPage {id}</div>

    <div>
      {id}
    </div>


    </div>
  )
}

export default UserDetailsPage