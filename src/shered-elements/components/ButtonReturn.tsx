import { ChevronLeft } from 'lucide-react'
import {colors} from "@/shered-elements/constents/Colors"
import { useNavigate } from 'react-router-dom'


export default function ButtonReturn() {
    const navegate = useNavigate()
    return (
        <div className='w-full'>
            <button className='flex cursor-pointer'
             onClick={()=>navegate(-1)}
            >
                <ChevronLeft color={colors.green} /> <p className='text-blue'>Voltar</p>
            </button>
        </div>
    )
}
