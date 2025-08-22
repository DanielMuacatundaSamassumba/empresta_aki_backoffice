
import type { CardResumeType } from '@/modules/dashboard/types/CardResumeType'


export default function CardResume(params: CardResumeType) {
    const { data, icon, title } = params
    return (
        <div className=' bg-white p-1 flex flex-col text-xl  items-center rounded-sm shadow w-full  m-2 dark:bg-zinc-900'>
            <div className='flex border-b-1 border-zinc-300 w-11/12 p-1 items-center'>
                <img src={icon}
                    alt="image-icon-users-data"
                    className='w-12 md:w-8 md:h-8'
                />
                <div>
                    <h1 className='text-font-color md:text-[18px] xl:text-[17px] dark:text-white'>{title}</h1>
                </div>
            </div>
            <div className='w-full p-5 flex flex-col justify-between  items-center flex-nowrap rounded-sm sm:flex sm:flex-row
            lg:flex lg:flex-row lg:justify-around lg:flex-nowrap xl:flex xl:flex-row xl:justify-around  xl:items-center xl:flex-wrap 2xl:flex 2xl:flex-row 2xl:justify-around '>
                <div className='flex flex-col'>
                    {
                        data?.map((item:any) => (
                            <div className="flex items-center space-x-2 mt-[1.8px]">
                                <span className="inline-block w-[4px] h-4 bg-green"></span>
                                <span className="text-[12px] text-font-color font-medium dark:text-white    ">
                                    {item.description}
                                </span>
                            </div>

                        ))
                    }

                </div>
                <div className=' w-28 h-28 rounded-full p-2 flex  flex-col justify-center items-center bg-gradient-to-r from-blue to-green mt-2'

                >
                    <div className="bg-white w-24 h-24 rounded-full p-3 flex flex-col justify-center items-center">
                        <h1 className="text-lg font-bold text-blue text-center">Total</h1>
                        <h1 className="text-blue text-lg break-words text-center max-w-full overflow-hidden">
                            5000
                        </h1>
                    </div>

                </div>
            </div>
        </div>
    )
}
