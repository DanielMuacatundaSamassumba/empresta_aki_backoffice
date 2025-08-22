import Button from '@/shered-elements/components/Button'
import Header from '@/shered-elements/components/Header'
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop'
import { useState } from 'react'
import useUpdatePlan from '@/modules/plans/services/useUpdatePlan'
import Input from '@/shered-elements/components/Input'
import TopElementForAllForm from '@/shered-elements/components/TopElementForAllForm'
import LoaderComponent from '@/shered-elements/utils/LoaderComponent'
import useStatusPlan from '../services/useStatusPlan'
import { handleStatusPlan } from '../types/PlanDataType'
import useSessionTimeout from '@/hooks/useSessionTimeout'
import AuthModal from '@/shered-elements/components/AuthModal'
export default function PlanUpdatePage() {
    const [menuIsOpened, setMenuIsOpened] = useState(true)
    const {
        formData,

        handleChangePlanData,
        handleSubmit,
        installmentData,
        loaderControl,
        handleUpdateAvalable_installment

    } = useUpdatePlan()
    const { dataStatusPlan, } = useStatusPlan()
    const { time, timeSession } = useSessionTimeout()
    console.log(time, timeSession)
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
                            <div className='w-11/12 mt-25 lg:w-8/12'>

                                <form className='bg-white  rounded w-full p-6 border border-green  dark:bg-zinc-900' onSubmit={handleSubmit}>
                                    <TopElementForAllForm
                                        title='Actualizar  Plano '
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

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex  flex-col md:flex-row'>
                                        <div className='w-full mt-2  md:w-full'>
                                            <label className='text-gray-500'>Spreed(%)</label>
                                            <div className='mt-2'>
                                                <Input
                                                    name='spread'
                                                    type='text'
                                                    placeholder='spread'
                                                    onchage={handleChangePlanData}
                                                    value={formData.spread}

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

                                                />
                                            </div>


                                        </div>


                                    </div>



                                    <div className=" mt-2">
                                        <label className='text-gray-500'>Quantidades de Parcelas(uni)</label>
                                        <div className='mt-2'>
                                            <Input
                                                name='installment_quantity'
                                                type='text'
                                                placeholder='Quantidades de Parcelas'
                                                onchage={handleChangePlanData}
                                                value={formData.installment_quantity}

                                            />
                                        </div>
                                    </div>
                                    <div className=" mt-2">
                                        <label className='text-gray-500'>Número Maxímo de Operação(uni)</label>
                                        <div className='mt-2'>
                                            <Input
                                                name='maximum_number_of_plan_operations'
                                                type='number'
                                                placeholder='Quantidades de Parcelas'
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
                                                onchage={handleChangePlanData}
                                                type='text'
                                                placeholder='Juros Por Mora(%)'
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

                                            />
                                        </div>
                                    </div>
                                    <div className=" mt-2">
                                        <label className='text-gray-500'>Status</label>
                                        <div className='mt-2'>
                                            <select
                                                className="border border-zinc-400 w-full p-3 rounded outline-none bg-white dark:bg-zinc-900 dark:text-white"
                                                onChange={(e: any) => handleChangePlanData(e)}
                                                value={formData.statu_id}
                                                name="statu_id"
                                            >
                                                <option value="">Selecione o Status</option>
                                                {dataStatusPlan?.map((item: any) => (
                                                    <option value={item.status_id} key={item.status_id}>
                                                        {handleStatusPlan(item.status.name).status_name}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                    </div>
                                    <div className='mt-6'>
                                        <Button
                                            name='Actualizar Plano'
                                            typeOfButtonCustom='fullBg'
                                            type='submit'
                                        />
                                    </div>
                                    <div className=''>
                                        <h1 className='text-font-color text-2xl font-semibold mt-10 text-center'>Parcelas</h1>
                                        <table className="border-separate border-spacing-y-2 w-full mt-4">
                                            <thead className='bg-zinc-200 p-2'>
                                                <th>Descrição</th>
                                                <th> Status</th>
                                                <th>Acção</th>
                                            </thead>
                                            <tbody>
                                                {installmentData &&
                                                    installmentData
                                                        .slice() // cria uma cópia para não alterar o original
                                                        .reverse() // inverte a ordem
                                                        .map((item, i) => (
                                                            <tr key={item.id || i} className="p-2 mt-2 text-center bg-zinc-200">
                                                                <td>
                                                                    {item.installment_number + "x  em " +  formData.refund_period + " dias"}
                                                                </td>
                                                                <td
                                                                    className={
                                                                        item.status === 1
                                                                            ? "text-green-800 font-bold"
                                                                            : "text-red font-bold"
                                                                    }
                                                                >
                                                                    {item.status === 1 ? "Activo" : "Inactivo"}
                                                                </td>
                                                                <td className="p-2">
                                                                    <button
                                                                        type="button"
                                                                        className={
                                                                            item.status === 1
                                                                                ? "bg-red p-2 text-white rounded cursor-pointer"
                                                                                : "bg-green p-2 text-white rounded cursor-pointer"
                                                                        }
                                                                        onClick={() => {
                                                                            item.status === 1
                                                                                ? handleUpdateAvalable_installment(item.id, "desactivar")
                                                                                : handleUpdateAvalable_installment(item.id, "activar");
                                                                        }}
                                                                    >
                                                                        {item.status === 1 ? "Desactivar" : "Activar"}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}

                                            </tbody>

                                        </table>

                                    </div>

                              
                                </form>
                            </div>
                        </div>
                    </div>
                </div >

                {
                    loaderControl && (
                        <LoaderComponent />
                    )
                }

            </div >
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
