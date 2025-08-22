
import Header from '@/shered-elements/components/Header'
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop'
import { useState } from 'react'
import useSessionTimeout from '@/hooks/useSessionTimeout'
import AuthModal from '@/shered-elements/components/AuthModal'
import TablePaymentTable from '../components/TablePaymentTable'

export default function PaymentMainPage() {
  const { time, timeSession } = useSessionTimeout()
  console.log(time, timeSession)
  const [menuIsOpened, setMenuIsOpened] = useState(false)
  return (
    <div>
      <div className='bg-background min-h-svh w-full flex  flex-row dark:bg-zinc-800'>
        <div className={`
                      transition-all duration-500 ease-in-out
                            ${menuIsOpened
            ? 'h-screen w-28 bg-white dark:bg-zinc-900'
           : 'h-screen w-1/4 bg-white dark:bg-zinc-900 hidden lg:block'}
                          `}>
          <MenuNavegationForDesktop
            menuIsOpened={menuIsOpened}
            setMenuIsOpened={setMenuIsOpened}
          />
        </div>
        <div className='flex flex-row w-full'>
          <div className='flex flex-col w-full h-full '>
            <Header />
            <div className="h-full  flex flex-row items-center justify-center">
              <div className='w-11/12 lg:w-/12 lg:mt-5'>
                <TablePaymentTable />
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
  )
}
