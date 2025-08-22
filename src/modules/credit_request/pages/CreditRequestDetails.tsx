import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop'
import { useState } from 'react'
import Header from '@/shered-elements/components/Header'
import CreditStatusMessage from '../components/CreditStatusMessage'
import { Download } from 'lucide-react'
import useSessionTimeout from '@/hooks/useSessionTimeout'
import AuthModal from '@/shered-elements/components/AuthModal'

export default function CreditRequestDetails() {
    const [menuIsOpened, setMenuIsOpened] = useState(false)
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
                            <div className='w-11/12 lg:w-1/2 bg-white mt-10  p-5  rounded border-green'>
                                <CreditStatusMessage
                                    icon='success'
                                    title='Credito Aceite com Sucesso'
                                    message='O seu pedido de crédito foi aprovado. Em breve entraremos em contacto para os próximos passos.'
                                />
                                <div className='mt-10  border-border-color border-b '>
                                    <h3 className='text-font-color  mb-2 text-[17px]'>Detalhes do Credito</h3>
                                </div>
                                <div className='w-full flex justify-between mt-2 text-font-color'>
                                    <p>ID do Crédito </p>
                                    <p>2025-0003 </p>
                                </div>
                                <div className='w-full flex justify-between mt-2 text-font-color'>
                                    <p>Plano  </p>
                                    <p>Empresta Rápido </p>
                                </div>
                                <div className='w-full flex justify-between mt-2 text-font-color'>
                                    <p>Número de Parcelas  </p>
                                    <p>4 </p>
                                </div>
                                <div className='w-full flex justify-between mt-2 text-font-color'>
                                    <p>Data de reembolso </p>
                                    <p>03/03/2025 </p>
                                </div>
                                <div className='w-full flex justify-between mt-2 text-font-color'>
                                    <p>Data de Validação </p>
                                    <p>Pendente </p>
                                </div>
                                <div className='w-full flex justify-between mt-2 text-font-color '>
                                    <p>Status</p>
                                    <p className='text-amber-600 font-bold'>Pendente </p>
                                </div>
                                <div className='border-border-color border-b mt-2'>

                                </div>

                                <div className='w-full flex justify-between mt-2 text-font-color'>
                                    <p>Valor do Crédito</p>
                                    <p>80.000 kz </p>
                                </div>
                                <div className='w-full flex justify-between mt-2 text-font-color'>
                                    <p>Taxa de Juros   </p>
                                    <p> 18% </p>
                                </div>
                                <div className='w-full flex justify-between mt-2 text-font-color'>
                                    <p>Total a Pagar com Juros   </p>
                                    <p>100.000,00 kz </p>
                                </div>
                                <div className='flex justify-end'>
                                    <button className='bg-blue text-white p-3 flex rounded mt-4'>
                                        Baixar Comprovante
                                        <Download className='ml-4' />
                                    </button>
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
        </div>
    )
}
