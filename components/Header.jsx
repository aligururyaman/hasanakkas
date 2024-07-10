import Image from 'next/image'
import logo from "../app/utils/ha.jpg"
import Nav from './Nav'
import Link from 'next/link'

function Header() {
  return (
    <div className=''>
      <div className='flex justify-center items-center w-full'>
        < div className='flex w-full h-2 bg-red-600 mr-10' />
        <Link href="/" >
          <Image src={logo} height={200} width={400} alt='logo' />
        </Link>
        <div className='flex w-full h-2 bg-red-600 ml-10' />
      </div >
      <div>
        <div className='flex w-full h-0.5 bg-slate-300' />
        <div className='px-10 relative'>
          <Nav />
        </div>
        <div className='flex w-full h-0.5 bg-slate-300' />
      </div>
    </div >
  )
}

export default Header