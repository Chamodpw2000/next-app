'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'

const Navbar = () => {

  const {status, data:session} = useSession();


  if(status === 'loading'){
    return (
      <div className='flex bg-slate-200 p-5'>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    )


  }
  return (
    <div className='flex bg-slate-200 p-5'>

        <Link href={'/'} className='p-2 mr-5'>
        NextJs
        </Link>

         <Link href={'/users'} className='p-2 mr-5'>
        Users
        </Link>

             <Link href={'/admin'} className='p-2 mr-5'>
        Admin Pannel
        </Link>

          { status === "unauthenticated" && <Link href={'/api/auth/signin'} className='p-2 mr-5'>
        Login
        </Link>}
      { status === "authenticated" && <div className='p-2 mr-5'>
        {session?.user?.name}
        <Link href={'/api/auth/signout'} className='p-2 mr-5'>SignOut</Link>
        </div>}




    </div>
  )
}

export default Navbar