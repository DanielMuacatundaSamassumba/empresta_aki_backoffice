import type { PlanResumeTypeData } from '@/modules/dashboard/types/PlanResumeType'

export default function TablePlanResume(params: PlanResumeTypeData) {
    const { data, title, } = params
    return (
        <div className='w-full lg:w-full xl:w-full 2xl:w-1/2'>
           
            <div className='w-full  mt-2 bg-white  rounded-sm p-2 dark:bg-zinc-900 '>
                <div className=' border-b-2 border-zinc-200'>
                    <h1 className='text-font-color text-[25px] text-start mb-2  dark:text-white'>{title}</h1>
                </div>
                <div className='w-full flex justify-between mt-3 border-b-2 border-zinc-200 dark:text-white'>
                    <p className='text-[16px]  font-semibold  text-font-color dark:text-white'>Nome do Plano</p>
                    <p className='text-[16px] font-semibold  text-font-color dark:text-white'>Quantidade de Pedidos</p>
                    <p className='text-[16px] font-semibold  text-font-color dark:text-white'>Total dos Pedidos</p>
                </div>
                {
                    data?.map((item: any, i) => (
                        <div className='w-full flex justify-between items-center  mt-1 border-b-2 border-zinc-200 p-2' key={i}>
                            <span className="inline-block w-[8px] h-10 bg-green"></span>
                            <div className='w-full flex justify-between items-center  border-green ml-2 dark:text-white'>
                                <p className='text-[16px] dark:text-white   text-font-color'>{item.name}</p>
                                <p className='text-[16px]  dark:text-white text-font-color text-center'>{item.quantity}</p>
                                <p className='text-[16px]  dark:text-white  text-font-color'>{item.total}</p>
                            </div>
                        </div>
                    ))
                }
                <div className='w-full flex justify-between items-center bg-green text-white mt-1  border-zinc-200 p-2'>

                    <div className='w-full flex justify-between items-center  border-green ml-2 text-white'>
                        <p className='text-[16px]  text-font-white font-semibold'>Quantidade de Pedidos</p>
                        <p className='text-[16px]   text-font-white font-semibold'>Total dos Pedidos</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
