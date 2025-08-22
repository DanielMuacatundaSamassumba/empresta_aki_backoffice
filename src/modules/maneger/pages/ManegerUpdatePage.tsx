import useSessionTimeout from '@/hooks/useSessionTimeout';
import BackButtton from '@/shered-elements/components/BackButtton';
import Button from '@/shered-elements/components/Button';
import Header from '@/shered-elements/components/Header';
import Input from '@/shered-elements/components/Input';
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop';
import TopElementForAllForm from '@/shered-elements/components/TopElementForAllForm';
import LoaderComponent from '@/shered-elements/utils/LoaderComponent';
import  { useEffect, useState } from 'react'
import AuthModal from '@/shered-elements/components/AuthModal';
import useUpdateManeger from '../services/useUpdateManeger';
import { handleStatusPlan } from '@/modules/plans/types/PlanDataType';
import useStatusPlan from '@/modules/plans/services/useStatusPlan';

export default function ManegerUpdatePage() {
    const [menuIsOpened, setMenuIsOpened] = useState(false);
    const { time, timeSession } = useSessionTimeout();
   console.log(time, timeSession);
    const { handleChangeValue, formData, handleSubmit, loaderControl } = useUpdateManeger()
    const { dataStatusPlan } = useStatusPlan()
    useEffect(() => {
        const data = async () => {
            const res = await fetch('/api/customer')
            const data = await res.json()
            return data
        }
        console.log(data())
    }, [])
    return (
        <div>
            <div className='bg-background  h-full w-full flex flex-row dark:bg-zinc-800'>
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
                                    <div className=' w-11/12  bg-white  flex flex-col justify-center md:w-1/2'>
                                        <TopElementForAllForm
                                            title='Actualizar  usúario'
                                        />
                                        <form className='bg-white p-8   w-full flex flex-col  justify-center  items-center' onSubmit={handleSubmit}>
                                            <div className='w-10/12'>
                                                <label htmlFor="">Nome Completo</label>
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    onchage={handleChangeValue}
                                                    value={formData.name}
                                                    required={true}
                                                    placeholder="Nome Completo"
                                                />
                                            </div>
                                            <div className='w-10/12 mt-3'>
                                                <label htmlFor="">Email</label>
                                                <Input

                                                    type="email"
                                                    name="email"
                                                    required={true}
                                                    placeholder="mail@exemplo.com"
                                                    onchage={handleChangeValue}
                                                    value={formData.email}
                                                />
                                            </div>

                                            <div className='w-10/12 mt-3'>
                                                <label htmlFor="">Número de Telefone</label>
                                                <Input
                                                    type="number"
                                                    name="phone_number"
                                                    required={true}
                                                    placeholder="número de telefone"
                                                    onchage={handleChangeValue}
                                                    value={formData.phone_number}
                                                />
                                            </div>

                                            <div className='w-10/12 mt-3'>
                                                <label htmlFor="">Número do B.I</label>
                                                <Input
                                                    type="text"
                                                    name="bi_number"
                                                    required={true}
                                                    placeholder="número do b.i"
                                                    onchage={(e) => {
                                                        if (e.target.value.length != 15) {
                                                            handleChangeValue(e)
                                                        }
                                                    }}
                                                    value={formData.bi_number}
                                                />
                                            </div>

                                            <div className='w-10/12 mt-3'>
                                                <label htmlFor="">Tipo de usúario</label>
                                                <select
                                                    value={formData.type_of_user}
                                                    name="type_of_user"
                                                    onChange={(e: any) => handleChangeValue(e)}
                                                    className="border border-zinc-400 w-full p-4 rounded outline-none bg-white dark:bg-zinc-900 dark:text-white "
                                                >
                                                    <option value="">Selecione O tipo de úsuario</option>
                                                    <option value="teller">caixa</option>
                                                    <option value="administrator">Administrador</option>
                                                    <option value="credit-analyst">Analista de Crédito</option>
                                                </select>
                                            </div>
                                            <div className='w-10/12 mt-3'>
                                                <label htmlFor="">Status</label>
                                                <select
                                                    value={formData.statu_id}
                                                    name="statu_id"
                                                    onChange={(e: any) => handleChangeValue(e)}
                                                    className="border border-zinc-400 w-full p-4 rounded outline-none bg-white dark:bg-zinc-900 dark:text-white "
                                                >
                                                    <option value="">Selecione o Status</option>
                                                    {dataStatusPlan?.map((item: any) => (
                                                        <option value={item.status_id} key={item.status_id}>
                                                            {handleStatusPlan(item.status.name).status_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='w-10/12 mt-6'>
                                                <Button name='Criar usuario' type='submit' typeOfButtonCustom='fullBg' />
                                            </div>
                                        </form>
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
            {
                loaderControl && (
                    <LoaderComponent />
                )
            }
        </div>
    );
}
