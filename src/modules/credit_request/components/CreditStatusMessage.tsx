
import type { CreditStatusMessageType } from '../types/CreditStatusMessage'
import { images } from '@/shered-elements/constents/Images'

export default function CreditStatusMessage(params: CreditStatusMessageType) {
    const { title, message, icon } = params
    return (
        <div className='flex flex-col  justify-center items-center'>
            <img
            className='w-25'
                src={
                    icon == "success" ?
                    images.IconSuccess :
                    images.IconFailded
                }
                alt="icon-status-message"
            />
            <h1 className=' font-semibold text-font-color text-[25px] mt-2 text-center'>{title}</h1>
            <p className='text-green-900 mt-5 text-center'>{message}</p>
        </div>
    )
}
