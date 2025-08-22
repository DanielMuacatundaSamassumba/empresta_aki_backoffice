import  { useState } from 'react'
import UserAuthenticated from './UserAuthenticated'
import ModalMenuNavegation from './ModalMenuNavegation'
import { images } from '../constents/Images'
import { useGSAP } from '@gsap/react'
import { handleTypeOfUser } from '@/modules/customer/types/typeOFUser'

export default function Header() {
    const [menuIsOpened, setMenuIsOpened] = useState(false)
    function handleMenuToggle() {
        setMenuIsOpened(!menuIsOpened)
        gsap.fromTo(
            '.asideMobile',
            { x: '-100%' },
            { x: '0%', duration: 0.9, ease: 'power2.out' })
    }
    const dataUserInLocalStorage = localStorage.getItem("dataUser");

    const dataUser = JSON.stringify(dataUserInLocalStorage);
    const user = JSON.parse(dataUser);
    const userData = JSON.parse(user)
    return (
        <div className='bg-white text-2xl   text-white   flex flex-row  justify-between items-center p-3 dark:bg-zinc-900'>
            <div className='flex flex-row justify-between w-full sm:flex sm:flex-row  sm:justify-end md:flex md:flex-row md:justify-between lg:flex lg:flex-row lg:justify-end  '>
                <div className=' p-2 lg:hidden'>
                    <img
                        src={images.arrowMenuIcon}
                        alt="menu-icon"
                        className='w-5 rotate-180'
                        onClick={handleMenuToggle}
                        onCompositionStart={()=>{
                            useGSAP()
                        }}
                    />
                </div>
                 <div>

                 </div>
                <div className='sm:w-1/3 sm:flex sm:flex-row sm:justify-end '>
                    <UserAuthenticated />
                    <div className='ml-2 hidden sm:block'>
                        <h1 className='text-font-color text-[12px] font-bold dark:text-white'>
                           {userData.name}
                        </h1>
                        <h1 className='text-font-color text-[12px] dark:text-white'>
                        {userData.email}
                        </h1>
                        <h1 className='text-font-color text-[12px]  text-start dark:text-white'>
                        {handleTypeOfUser(userData.roles[0]).name}
                        </h1>
                    </div>
                </div>
            </div>
            <div className='asideMobile -ml-100'>
                <ModalMenuNavegation setMenuIsOpened={setMenuIsOpened} menuIsOpened={menuIsOpened} />
            </div>
        </div>

    )
}
