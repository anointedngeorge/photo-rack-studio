import Link from 'next/link'
import React from 'react'
import { FaPlusCircle } from 'react-icons/fa'

const TopMenu
 = () => {
  return (

        <div className="flex place-content-between content-center">
            <div>
                <div className="flex place-items-center space-x-2">
                    <div><p className='font-inter font-semibold text-main' >Collections</p></div>
                    <div>
                        <Link href={''} title="Create New Collection"><FaPlusCircle className="size-4" /></Link>
                    </div>
                </div>
            </div>
            <div>
                {/* <Link href={''} title="Add New Image"><FaPlusCircle className="size-10" color='bg-main' /></Link> */}
                <label htmlFor="my_modal_7" className='cursor-pointer'><FaPlusCircle className="size-10" color='bg-main' /></label>
            </div>
        </div>

  )
}

export default TopMenu

