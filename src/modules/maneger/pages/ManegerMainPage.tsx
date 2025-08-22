import BackButtton from '@/shered-elements/components/BackButtton';
import Header from '@/shered-elements/components/Header';
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop';
import { useState } from 'react';
import TableManegers from '../components/TableManegers';
import AuthModal from '@/shered-elements/components/AuthModal';
import useSessionTimeout from '@/hooks/useSessionTimeout';

export default function ManegerMainPage() {
    const [menuIsOpened, setMenuIsOpened] = useState(false);
    const { time, timeSession } = useSessionTimeout();
    console.log(time, timeSession);
    return (
        <div>
            <div className='bg-background   w-full flex flex-row dark:bg-zinc-800'>
                {/* Sidebar/Navigation */}
                <div className={`
        transition-all duration-500 ease-in-out
        ${menuIsOpened
                        ? 'h-screen w-28 bg-white dark:bg-zinc-900'
                       : 'h-screen w-1/4 bg-white dark:bg-zinc-900 hidden lg:block'
                    }
      `}>
                    <MenuNavegationForDesktop
                        menuIsOpened={menuIsOpened}
                        setMenuIsOpened={setMenuIsOpened}
                    />
                </div>

                {/* Main Content Area */}
                <div className='flex flex-row w-full'>
                    <div className='flex flex-col w-full h-full'>
                        <Header />

                        <div className="h-full  flex flex-col  w-full  ">
                            <div className='p-5'>
                                <BackButtton />
                            </div>
                            <div className='h-full  flex flex-col w-full  justify-center '>

                                <div className='w-ful flex justify-center items-center '>
                                    <div className='w-11/12   lg:w-9/12'>
                                        <TableManegers />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {
                timeSession && (
                    <div className=' flex justify-center w-full'>
                        <AuthModal />
                    </div>
                )
            }
        </div>
    );
}