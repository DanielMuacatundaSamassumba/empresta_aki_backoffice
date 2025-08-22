import Header from '@/shered-elements/components/Header';
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop';
import { useState } from 'react';
import AuthModal from '@/shered-elements/components/AuthModal';
import useSessionTimeout from '@/hooks/useSessionTimeout';
import TopElementForAllForm from '@/shered-elements/components/TopElementForAllForm';
import Input from '@/shered-elements/components/Input';
import Button from '@/shered-elements/components/Button';
import useCreateBank from '../services/useCreateBank';
import useStatusPlan from '@/modules/plans/services/useStatusPlan';
import { handleStatusPlan } from '@/modules/plans/types/PlanDataType';
import LoaderComponent from '@/shered-elements/utils/LoaderComponent';

export default function CreateBankPage() {
    const [menuIsOpened, setMenuIsOpened] = useState(false);
    const { time, timeSession } = useSessionTimeout()
    const {
        handleSubmit,
        handleChangeValue,
        formData,
        loaderControl
    } = useCreateBank()
    const { dataStatusPlan }= useStatusPlan()
    console.log(time)
    return (
        <div>
            <div className='bg-background min-h-svh w-full flex flex-row dark:bg-zinc-800'>
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

                        <div className="h-full  flex flex-row items-center justify-center">
                            <div className='w-full  flex justify-center'>
                                <div className='bg-white border border-green rounded p-4 w-11/12 lg:w-6/12'>
                                    <TopElementForAllForm title={'Criar Banco'} />
                                    <form  onSubmit={handleSubmit}>
                                        <div className='flex mt-5'>
                                            <div className='w-1/2'>
                                                <label htmlFor="">Nome</label>
                                                <div className='mt-3'>
                                                    <Input
                                                        onchage={handleChangeValue}
                                                        name={'bank_name'}
                                                        type={'text'}
                                                        placeholder={'Nome do banco'}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className='w-1/2 ml-2'>
                                                <label htmlFor="">Sigla do Banco</label>
                                                <div className='mt-3'>
                                                    <Input
                                                        onchage={handleChangeValue}
                                                        name={'short_name'}
                                                        type={'text'}
                                                        placeholder={'Sigla do Banco'}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="">Prefixo do Banco</label>
                                            <div className='mt-3'>
                                                <Input
                                                     onchage={(event)=>{
                                                        if(event.target.value.length < 5){
                                                            handleChangeValue(event)
                                                            return;
                                                        }
                                                        return;
                                                     }}
                                                    value={formData.bank_prefix}
                                                    name={'bank_prefix'}
                                                    type={'string'}
                                                    placeholder={'Prefixo do Banco'}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className=" mt-2">
                                        <label className='text-gray-500'>Status</label>
                                        <div className='mt-2'>
                                            <select
                                            required
                                                className="border border-zinc-400 w-full p-3 rounded outline-none bg-white dark:bg-zinc-900 dark:text-white"
                                                onChange={(e: any) => handleChangeValue(e)}
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
                                        <div className='mt-4'>
                                            <Button name={'Criar'} typeOfButtonCustom={'fullBg'} type={'submit'} />
                                        </div>
                                    </form>

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
         {  loaderControl && (<LoaderComponent/>) }
        </div>
    );
}

