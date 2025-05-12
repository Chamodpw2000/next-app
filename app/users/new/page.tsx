'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'


interface User {
    id: number
    name: string
    
}

const NewUserPage =  () => {

  const router = useRouter();


  return (
    <div>

        <h1>Users</h1>


        <div onClick={()=>{router.push('/admin')}} className='btn btn-primary'>

Add new

        </div>

      




    </div>
  )
}

export default NewUserPage