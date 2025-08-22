

import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { colors } from '../constents/Colors'
export default function BackButtton() {
    const navegate = useNavigate()
  return (
    <div className='flex justify-start w-full'>
        <div onClick={()=>navegate(-1)} className='flex flex-row-reverse cursor-pointer'>
             <p className='text-xl'>Voltar</p>
             <ChevronLeft color={colors.blue}/>
        </div>
    </div>
  )
}
