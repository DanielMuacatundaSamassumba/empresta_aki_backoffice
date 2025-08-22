import Button from '@/shered-elements/components/Button'
import Header from '@/shered-elements/components/Header'
import Input from '@/shered-elements/components/Input'
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop'
import TopElementForAllForm from '@/shered-elements/components/TopElementForAllForm'
import { useState } from 'react'
import useCreatePlan from '@/modules/plans/services/useCreatePlan'
import LoaderComponent from '@/shered-elements/utils/LoaderComponent'
import AuthModal from '@/shered-elements/components/AuthModal'
import useSessionTimeout from '@/hooks/useSessionTimeout'

export default function PlanCreatePage() {
    const [menuIsOpened, setMenuIsOpened] = useState(true)
    const {
        formData,
        handleChangePlanData,
        handleSubmit,
        loaderControl,

    } = useCreatePlan()
    const { timeSession } = useSessionTimeout()

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
                        <div className="h-full  flex flex-row  justify-center mt-25">
                            <div className='w-11/12 lg:w-8/12'>
                                <div>
                                    <form className='bg-white  rounded w-full p-6 border border-green  dark:bg-zinc-900' onSubmit={handleSubmit}>
                                        <TopElementForAllForm
                                            title='Criar Novo Plano '
                                            IsBlue={false}
                                        />
                                        <div className=''>
                                            <label className='text-gray-500'>Nome do Plano</label>
                                            <div className='mt-4'>
                                                <Input
                                                    name='flat_name'
                                                    type='text'
                                                    placeholder='Nome do Plano'
                                                    onchage={handleChangePlanData}
                                                    value={formData.flat_name}
                                                    required={true}

                                                />
                                            </div>
                                        </div>
                                        <div className='flex  flex-col md:flex-row'>
                                            <div className='w-full mt-2 md:w-full'>
                                                <label className='text-gray-500'>Capital Maximo(AO)</label>
                                                <div className='mt-2'>
                                                    <Input
                                                        name='maximum_capital'
                                                        type='text'
                                                        placeholder='capital maximo'
                                                        oninput={(e) => {
                                                            const input = e.target as HTMLInputElement;
                                                            input.value = input.value.replace(/[^0-9.]/g, '')
                                                        }}
                                                        onchage={handleChangePlanData}
                                                        value={formData.maximum_capital}
                                                        required={true}
                                                    />
                                                </div>
                                            </div>

                                            <div className='w-full mt-2 md:ml-4 md:w-full'>
                                                <label className='text-gray-500'>Capital Minimo(AO)</label>
                                                <div className='mt-2'>
                                                    <Input
                                                        name='minimum_capital'
                                                        type='text'
                                                        placeholder="Capital Minimo"
                                                        onchage={handleChangePlanData}
                                                        value={formData.minimum_capital}
                                                        required={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex  flex-col md:flex-row'>
                                            <div className='w-full mt-2  md:w-full'>
                                                <label className='text-gray-500'>spread(%)</label>
                                                <div className='mt-2'>
                                                    <Input
                                                        name='spread'
                                                        type='text'
                                                        placeholder='spread'
                                                        onchage={handleChangePlanData}
                                                        value={formData.spread}
                                                        required={true}
                                                    />
                                                </div>
                                            </div>

                                            <div className='w-full mt-2 md:ml-4 md:w-full'>
                                                <label className='text-gray-500'>Comissão de abertura de dossiê(%)</label>
                                                <div className='mt-2'>
                                                    <Input
                                                        name='commission'
                                                        type='text'
                                                        placeholder='comissão de abertura de dossiê'
                                                        onchage={handleChangePlanData}
                                                        value={formData.commission}
                                                        required={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col  items-center justify-center mt-2  md:flex md:flex-row'>
                                            <div className='w-full mt-2  md:w-full'>
                                                <label className='text-gray-500'>Taxa de juros(%)</label>
                                                <div className=''>
                                                    <Input
                                                        name='interest_rate'
                                                        type='text'
                                                        placeholder='taxa de juros'
                                                        onchage={handleChangePlanData}
                                                        value={formData.interest_rate}
                                                        required={true}
                                                    />
                                                </div>
                                            </div>

                                            <div className='w-full flex-col justify-center items-center md:ml-4'>
                                                <div className='w-full   flex justify-start'>
                                                    <label className='text-gray-500'>Periodo de Reembolso(dias)</label>
                                                </div>
                                                <div className='mt-2  w-full'>
                                                    <Input
                                                        name='refund_period'
                                                        type='number'
                                                        placeholder='Periodo de Reembolso'
                                                        onchage={handleChangePlanData}
                                                        value={formData.refund_period}
                                                        required={true}
                                                    />
                                                </div>


                                            </div>


                                        </div>



                                        <div className=" mt-2">
                                            <label className='text-gray-500'>Quantidades de Parcelas(uni)</label>
                                            <div className='mt-2'>
                                                <Input
                                                    name='installment_quantity'
                                                    type='number'
                                                    placeholder='Quantidades de Parcelas'
                                                    onchage={handleChangePlanData}
                                                    value={formData.installment_quantity}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mt-2">
                                            <label className='text-gray-500'>Número Maxímo de Operação(uni)</label>
                                            <div className='mt-2'>
                                                <Input
                                                    name='maximum_number_of_plan_operations'
                                                    type='number'
                                                    placeholder='número Maxímo de Operação(uni)'
                                                    onchage={handleChangePlanData}
                                                    value={formData.maximum_number_of_plan_operations}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <div className=" mt-2">
                                            <label className='text-gray-500'>Juros Por Mora(%)</label>
                                            <div className='mt-2'>
                                                <Input
                                                    name='interest_on_arrears_for_each_day_of_delay'
                                                    desible={false}
                                                    type='text'
                                                    placeholder='Juros Por Mora(%)'
                                                    onchage={handleChangePlanData}
                                                    value={formData.interest_on_arrears_for_each_day_of_delay}
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        <div className=" mt-2">
                                            <label className='text-gray-500'>descrição</label>
                                            <div className='mt-2'>
                                                <Input
                                                    name='description'
                                                    type='text'
                                                    placeholder='descrição'
                                                    onchage={handleChangePlanData}
                                                    value={formData.description}
                                                    required={true}
                                                />
                                            </div>
                                        </div>


                                        <div className='mt-6'>
                                            <Button
                                                name='Criar Plano'
                                                typeOfButtonCustom='fullBg'
                                                type='submit'
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    loaderControl && (
                        <LoaderComponent />
                    )
                }

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
