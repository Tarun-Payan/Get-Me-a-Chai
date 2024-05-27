'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState} from 'react'

const Navbar = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className='bg-slate-800 pt-2 pb-1 flex justify-between px-2'>
      <div className='flex items-center font-bold cursor-pointer' onClick={()=> router.push('/')}>
        <Image
          src="/Images/tea.gif"
          width={40}
          height={40}
          alt="Picture of the author"
          className='invert-[0.5]'
        />
        Get Me a Chai
      </div>

      {session ?
        <div className='flex relative'>
          <button onClick={()=>setShowDropdown(!showDropdown)} id="dropdown" data-dropdown-toggle="dropdown" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:outline-none dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center" type="button" onBlur={() => {setTimeout(() => {
            setShowDropdown(false)
          }, 300);}}>Account
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          {/* <!-- Dropdown menu --> */}
          {showDropdown && <div id="dropdown" className="z-10 absolute top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href={session.user.name} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>
              <li>
                <Link href="/login" onClick={() => signOut()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
          </div>}

          <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => signOut()}>Logout</button>
        </div>
        : <Link href={"login"} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login
        </Link>
      }
    </div>
  )
}

export default Navbar
