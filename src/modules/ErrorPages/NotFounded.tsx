
import { images } from '@/shered-elements/constents/Images'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
export default function NotoFounded() {
    const navegate = useNavigate()
    return (
        <div
            className='bg-background min-h-svh flex flex-row justify-center items-center'
        >
            <div className='flex flex-col justify-center items-center w-full md:w-1/2'>
                <img src={
                    images.notFoundIcon
                }
                    alt="not-founded-icon"
                    className='w-1/2'
                />
                <h1 className='text-blue font-semibold text-3xl text-center w-full'>
                    <p>   Oops!</p>
                    Parece que a página que procura não existe.
                </h1>
                <p className='mt-4'>Não se preocupe, pode voltar à  pagina anterior.</p>
                <div className='w- md:w-1/5 mt-4'>
                    <button className='border-green border-1 text-green  rounded-full p-3 w-full flex justify-evenly cursor-pointer group hover:bg-green hover:text-white' onClick={()=>navegate(-1)}>
                       <ChevronLeft />
                        <p className='text-green group-hover:text-white'>Voltar</p>
                    </button>
                </div>
            </div>

        </div>
    )
}
