import Link from 'next/link'
import React from 'react'
interface Props {
    children: React.ReactNode
}
const AdminLayout = ({ children }: Props) => {
    return (
        <div className='flex'>


            <div className='flex flex-col'>
                <Link href='/admin'>

                    <aside className='bg-slate-200 p-5 mr-5'>

                        Home

                    </aside>

                </Link>
                <Link href='/admin/items'>
                    <aside className='bg-slate-200 p-5 mr-5'>

                        Items

                    </aside>
                </Link>


                <Link href='/admin/bookings'>
                    <aside className='bg-slate-200 p-5 mr-5'>

                        Bookings
                    </aside>
                </Link>



            </div>


            <div>

                {children}

            </div>


        </div>
    )
}

export default AdminLayout