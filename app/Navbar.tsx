import Link from 'next/link'
import React from 'react'

const Navbar = () => {
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




    </div>
  )
}

export default Navbar