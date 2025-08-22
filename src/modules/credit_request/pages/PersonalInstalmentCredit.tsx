import useSessionTimeout from '@/hooks/useSessionTimeout'
import AuthModal from '@/shered-elements/components/AuthModal'
import Header from '@/shered-elements/components/Header'
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop'
import { images } from '@/shered-elements/constents/Images'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleStatus, StatusEnum } from '../types/CreditRequestDataType'
import { typeOfUser } from '@/shered-elements/types/TypesOfUser'
export default function PersonalInstalmentCredit() {
    const location = useLocation()
    const { data } = location.state
    const navegate = useNavigate()
    const [menuIsOpened, setMenuIsOpened] = useState(false);
    const { time, timeSession } = useSessionTimeout()
    const [cardControl, setCardControl] = useState(0)

    console.log(time, timeSession)
    const dataUserInLocalStorage = localStorage.getItem("dataUser");
    const dataUser = JSON.stringify(dataUserInLocalStorage);
    const user = JSON.parse(dataUser);
    const role = JSON.parse(user).roles[0]
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
                            <div className='w-11/12  flex   flex-col justify-center items-center'>
                                <div className="  w-full  mt-2 flex flex-col justify-center items-center md:flex md:flex-col md:items-end md:w-8/12  ">
                                    {
                                        cardControl == 0 && (
                                            <div className="  w-full  mt-2 flex flex-col justify-center items-center md:flex md:flex-col md:items-end md:w-full  ">
                                                <div className=' w-11/12 rounded flex flex-col items-center cursor-pointer md:flex md:flex-row md:justify-between bg-white p-5 md:w-full md:ml-40 ' onClick={() => navegate("/customer/profile", { state: { data: data.customer } })}>
                                                    <div className='flex flex-col items-center  justify-start w-full  p-2  md:flex md:flex-row md:w-9/12 lg:w-11/12 xl:w-10/12'>
                                                        <img
                                                            src={images.avatarIcon}
                                                            alt="image-profile-user"
                                                            className='rounded-full w-20 border-green  md:w-30'
                                                        />
                                                        <div className='flex flex-col justify-center text-font-color ml-5'>
                                                            <h1 className='text-[20px] text-center md:text-start'>{data.customer.name}</h1>
                                                            <p className='text-center md:text-start'>{data.customer.bi_number}</p>
                                                            <p className='text-center md:text-start'>Data de Cadastro  -
                                                                {data.customer.created_at.split("T")[0]}
                                                            </p>
                                                            <p className='flex text-center md:text-start'>Status- <p className='font-bold text-green-800 text-center md:text-start'>Activo</p></p>
                                                        </div>
                                                    </div>
                                                    <div className=' flex justify-center w-1/5 md:w-1/4 md:justify-center'>
                                                        <div className=' w-28 h-28 rounded-full p-2 flex  flex-col justify-center items-center bg-gradient-to-r from-blue to-green mt-2'
                                                            onClick={() => setCardControl(1)}
                                                        >
                                                            <div className="bg-white w-24 h-24 rounded-full p-3 flex flex-col justify-center items-center">
                                                                <h1 className=" font-normal text-blue text-center text-sm">Pontuação</h1>
                                                                <h1 className="text-blue font-bold text-2xl break-words text-center max-w-full overflow-hidden">
                                                                    10.5
                                                                </h1>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>


                                                <div className='bg-white p-4 w-11/12 md:w-full' >
                                                    <div className='mt-10  border-border-color border-b '>
                                                        <h3 className='text-font-color  mb-2 text-[17px]'>Detalhes do Credito</h3>
                                                    </div>
                                                    <div className='w-full flex justify-between mt-2 text-font-color'>
                                                        <p>ID do Crédito </p>
                                                        <p>2025-0003 </p>
                                                    </div>
                                                    <div className='w-full flex justify-between mt-2 text-font-color'>
                                                        <p>Plano  </p>
                                                        <p>{data.plan.flat_name} </p>
                                                    </div>
                                                    <div className='w-full flex justify-between mt-2 text-font-color'>
                                                        <p>Número de Parcelas  </p>
                                                        <p>{data.installments.length}</p>
                                                    </div>


                                                    <div className='w-full flex justify-between mt-2 text-font-color '>
                                                        <p>Status</p>
                                                        <p className=' font-bold' style={{ color: handleStatus(data.statu.name).color }}>{
                                                            handleStatus(data.statu.name).statusName
                                                        } </p>
                                                    </div>



                                                    <div className='w-full flex justify-between mt-2 text-font-color   border-border-color border-t'>
                                                        <p>Valor do Crédito</p>
                                                        <p>{data.ammount} Kz</p>
                                                    </div>
                                                    <div className='w-full flex justify-between mt-2 text-font-color'>
                                                        <p>Taxa de Juros   </p>
                                                        <p>{data.plan.interest_rate} %  </p>
                                                    </div>
                                                    <div className='w-full flex justify-between mt-2 text-font-color'>
                                                        <p>spread  </p>
                                                        <p>{
                                                            data.plan.spread + "%"
                                                        } </p>
                                                    </div>
                                                    <div className='w-full flex justify-between mt-2 text-font-color'>
                                                        <p> Juros  por Mora  </p>
                                                        <p>{
                                                            data.plan.spread + "%"
                                                        } </p>
                                                    </div>
                                                    <div className='w-full flex justify-between mt-2 text-font-color'>
                                                        <p> Comissão de Abertura de Dociê  </p>
                                                        <p>{
                                                            data.plan.commission + "%"
                                                        } </p>
                                                    </div>
                                                    <div className='w-full flex justify-between mt-2 text-font-color'>
                                                        <p>Total a Pagar com Juros   </p>
                                                        <p>{
                                                            data?.totalEffectiveCost
                                                                ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                                    .format(data.totalEffectiveCost)
                                                                : 'Valor inválido'
                                                        } </p>
                                                    </div>


                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                                {
                                    cardControl == 0 && (
                                        <div className=' w-11/12 md:w-8/12 xl:w-8/12'>
                                            <div className=' w-11/12 md:w-full xl:w-full'>
                                                {
                                                    data.statu.name == StatusEnum.processed && role != typeOfUser.FINANCIAL_MANEGER && role != typeOfUser.CREDIT_ANALIST &&
                                                    data.installments.map((item: any, i: any) => (
                                                        <div key={i} className='bg-white border border-green  rounded p-3 flex justify-between items-center mt-4 '>
                                                            <div className='r'>
                                                                <p className='text-zinc-600 '>Parcela - {i + 1}</p>
                                                                <p className='text-zinc-600 '>Valor {
                                                                    new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                                        .format(item.installment_value)
                                                                }
                                                                </p>
                                                            </div>
                                                            <div className='flex flex-col '>
                                                                <p className='text-zinc-600  '> Termina em   {item.end_at.split(" ")[0]}</p>
                                                            </div>
                                                           
                                                        </div>

                                                    ))
                                                }
                                            </div>
                                           
                                        </div>
                                    )
                                }
                                
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
        </div>
    );

}
