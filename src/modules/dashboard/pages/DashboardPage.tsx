
import { images } from '@/shered-elements/constents/Images'
import Header from '@/shered-elements/components/Header'
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop'
import CardResume from '@/modules/dashboard/components/CardResume'
import TablePlanResume from '../components/TablePlanResume'
import type { PlanResumeType } from '../types/PlanResumeType'
import TableResume from '../components/TableResume'
import { ChartResume } from '@/modules/dashboard/components/Chart'
import { useState } from 'react'
import useSessionTimeout from '@/hooks/useSessionTimeout'
import AuthModal from '@/shered-elements/components/AuthModal'
export default function DashboardPage() {
    const [menuIsOpened, setMenuIsOpened] = useState(false)
    const [dataChartResume, setDataChartResume] = useState(true)
    const { time, timeSession } = useSessionTimeout()
        console.log(time, timeSession)
    const [data, setData] = useState<{ description: string }[]>([
        { description: "Total de usuários com plano activo - 50" },
        { description: "Total de usuários com plano activo - 50" },
        { description: "Total de usuários com plano activo - 50" },
        { description: "Total de usuários com plano activo - 50" },
        { description: "Total de usuários com plano activo - 50" },
        { description: "Total de usuários com plano activo - 50" },
        { description: "Total de usuários com plano activo - 50" },
    ]);
    const [dataChartWeek, setDataChartWeek] = useState([
        ["Dia da Semana", "Total", { role: "style" }],
        ["Segunda", 120, "#3366cc"],
        ["Terça", 90, "#dc3912"],
        ["Quarta", 150, "#ff9900"],
        ["Quinta", 70, "#109618"],
        ["Sexta", 200, "#990099"],
        ["Sábado", 80, "#0099c6"],
        ["Domingo", 40, "#dd4477"],
    ]);
    const [dataChartByDay, setDataChartByDay] = useState([
        ["Dia", "Total", { role: "style" }],
        ["1", 0, "#c49c6b"],
        ["2", 0, "#c49c6b"],
        ["3", 0, "#c49c6b"],
        ["4", 0, "#c49c6b"],
        ["5", 0, "#c49c6b"],
        ["6", 0, "#c49c6b"],
        ["7", 0, "#c49c6b"],
        ["8", 0, "#c49c6b"],
        ["9", 0, "#c49c6b"],
        ["10", 0, "#c49c6b"],
        ["11", 1001, "#a0522d"], // destaque do dia com pagamento
        ["12", 0, "#c49c6b"],
        ["13", 0, "#c49c6b"],
        ["14", 0, "#c49c6b"],
        ["15", 0, "#c49c6b"],
        ["16", 0, "#c49c6b"],
        ["17", 0, "#c49c6b"],
        ["18", 0, "#c49c6b"],
        ["19", 0, "#c49c6b"],
        ["20", 0, "#c49c6b"],
        ["21", 0, "#c49c6b"],
        ["22", 0, "#c49c6b"],
        ["23", 0, "#c49c6b"],
        ["24", 0, "#c49c6b"],
        ["25", 0, "#c49c6b"],
        ["26", 0, "#c49c6b"],
        ["27", 0, "#c49c6b"],
        ["28", 0, "#c49c6b"],
        ["29", 0, "#c49c6b"],
        ["30", 0, "#c49c6b"],
        ["31", 0, "#c49c6b"]
    ]);
    const [dataChartByMoth, setDataChartByMoth] = useState([
        ["Mês", "Total", { role: "style" }],
        ["Janeiro", 10, "#d88c00"],
        ["Fevereiro", 1001, "#cccccc"], // destaque
        ["Março", 5, "#d88c00"],
        ["Abril", 0, "#d88c00"],
        ["Maio", 0, "#d88c00"],
        ["Junho", 0, "#d88c00"],
        ["Julho", 0, "#d88c00"],
        ["Agosto", 0, "#d88c00"],
        ["Setembro", 0, "#d88c00"],
        ["Outubro", 2, "green"],
        ["Novembro", 1, "red"],
        ["Dezembro", 0, "#d88c00"],
    ]);
    const [buttoPlanResume, setButtonPlanResume] = useState(true)
    const [dataPlan, setDataPlan] = useState<PlanResumeType[]>([

        {
            name: "Empresta Rápido",
            quantity: "10",
            total: "1000000000,00"
        },
        {
            name: "Empresta Já",
            quantity: "10",
            total: "1000000000,00"
        },
        {
            name: "Empresta Agora",
            quantity: "10",
            total: "1000000000,00"
        },
        {
            name: "Empresta Mais",
            quantity: "10",
            total: "1000000000,00"
        },
        {
            name: "Empresta Bué",
            quantity: "10",
            total: "1000000000,00"
        }


    ]);
    return (
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
            <div className='flex flex-row w-full' onClick={() => {
                setData([])
                setDataPlan([])
                setDataChartByMoth([])
                setDataChartWeek([])
                setDataChartByDay([])
            }}>
                <div className='flex flex-col w-full h-full '>
                    <Header />
                    <div className=' text-2xl  text-center text- mt-2 p-2 w-full   '>
                        <div className='flex justify-end'>
                            <div className='flex justify-start w-full items-center hidden xl:hidden 2xl:flex lg:w-1/2 2xl:w-1/3 '>
                                <div className="">
                                    <button className={buttoPlanResume ?
                                        "bg-green text border-1 border-green rounded-sm p-2 text-white cursor-pointer  text-sm" :
                                        "border-2  border-green text rounded p-2 text-green ml-2 cursor-pointer  text-sm w-full"}
                                        onClick={() => setButtonPlanResume(true)}>Pedidos Por Planos</button>
                                </div>
                                <div className=' '>
                                    <button className={buttoPlanResume ?
                                        "border-2 border-green text rounded p-2 text-green ml-2 cursor-pointer  text-sm w-full"
                                        : "bg-green text border-1 border-green rounded-sm p-2 text-white cursor-pointer  text-sm ml-4"}
                                        onClick={() => setButtonPlanResume(false)}
                                    >Reembolso de Crédito por Planos</button>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col    md:flex md:flex-col md:w-full  lg:flex lg:flex-col lg:justify-between lg:w-full xl:flex xl:flex-col 2xl:flex 2xl:flex-row  '>

                            <div className='flex flex-col   w-full  lg:w-w-full xl:w-full '>
                                <div className='flex flex-wrap  md:flex md:flex-row md:flex-nowrap md:w-full xl:flex'>
                                    <CardResume
                                        title='Dados dos usuários do App'
                                        icon={images.userAppIcon}
                                        data={data}
                                    />
                                    <CardResume
                                        title='Dados dos Pedidos'
                                        icon={images.requestCreditIcon}
                                        data={data}
                                    />
                                </div>
                                <div className='flex flex-wrap mt-3  md:flex md:flex-row md:flex-nowrap md:w-ffull '>
                                    <CardResume
                                        title='Dados dos Reembolso'
                                        icon={images.moneyBakIcon}
                                        data={data}
                                    />
                                    <CardResume
                                        title='Dados do Aplicativo'
                                        icon={images.phoneIcon}
                                        data={data}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-start w-full 2xl:hidden '>
                                <div className='flex justify-start w-full  items-center  lg:flex xl:flex md:w-1/2 2xl:hidden'>
                                    <div className="">
                                        <button className={buttoPlanResume ?
                                            "bg-green text border-1 border-green rounded-sm p-2 text-white cursor-pointer  text-sm" :
                                            "border-2  border-green text rounded p-2 text-green ml-2 cursor-pointer  text-sm w-full"}
                                            onClick={() => setButtonPlanResume(true)}>Pedidos Por Planos</button>
                                    </div>
                                    <div className=' '>
                                        <button className={buttoPlanResume ?
                                            "border-2 border-green text rounded p-2 text-green ml-2 cursor-pointer  text-sm w-full"
                                            : "bg-green text border-1 border-green rounded-sm p-2 text-white cursor-pointer  text-sm ml-4"}
                                            onClick={() => setButtonPlanResume(false)}
                                        >Reembolso de Crédito por Planos</button>
                                    </div>
                                </div>
                            </div>
                            {
                                buttoPlanResume ? (
                                    <TablePlanResume
                                        data={dataPlan}
                                        title='Pedidos Por Planos'
                                    />
                                ) : (
                                    <TablePlanResume
                                        data={dataPlan}
                                        title='Reembolso de Crédito por Planos'
                                    />
                                )
                            }
                        </div>
                        <div className='flex flex-col justify-around mt-7  w-full xl:flex-col 2xl:ml-2 2xl:flex-row  '>
                            <div className='w-full mt-4 2xl:w-1/2 2xl:mt-0'>
                                <TableResume />
                            </div>                            <div className='w-full  mt-4  2xl:mt-0 2xl:w-1/2 2xl:mr-2 2xl:ml-2'>

                                <TableResume />
                            </div>

                        </div>

                        <div>
                            <div className='flex justify-start w-full mt-4 items-center  lg:flex xl:flex md:w-1/2 '>
                                <div className="">
                                    <button className={dataChartResume ?
                                        "bg-green text border-1 ml-2 border-green rounded-sm p-2 text-white cursor-pointer  text-sm" :
                                        "border-2  border-green text rounded p-2 text-green ml-0 cursor-pointer  text-sm w-full"}
                                        onClick={() => setDataChartResume(true)}>Dados dos Pedidos{timeSession}</button>
                                </div>
                                <div className=' '>
                                    <button className={dataChartResume ?
                                        "border-2 border-green text rounded p-2 text-green ml-2 cursor-pointer  text-sm w-full"
                                        : "bg-green text border-1 border-green rounded-sm p-2 text-white cursor-pointer  text-sm ml-4"}
                                        onClick={() => setDataChartResume(false)}
                                    >Dados dos Reembolso</button>
                                </div>
                            </div>
                        </div>
                        {
                            dataChartResume ? (
                                <div>
                                    <div className='flex flex-col justify-start mt-4  w-full xl:flex-col 2xl:ml-2 2xl:flex-row  '>
                                        <div className='w-full mt-4 xl:w-[98%] 2xl:w-11/12 2xl:mt-0'>
                                            <ChartResume data={dataChartByMoth} title={"Grafico de Pedido Mensal "} />
                                        </div>

                                    </div>
                                    <div className='flex flex-col justify-start mt-4  w-full xl:flex-col 2xl:ml-2 2xl:flex-row  '>
                                        <div className='w-full mt-4 xl:w-[98%] 2xl:w-11/12 2xl:mt-0'>
                                            <ChartResume data={dataChartByDay} title={"Grafico de Pedido Diario"} />
                                        </div>

                                    </div>
                                    <div className='flex flex-col justify-start mt-4  w-full xl:flex-col 2xl:ml-2 2xl:flex-row  '>
                                        <div className='w-full mt-4 xl:w-[98%] 2xl:w-11/12 2xl:mt-0'>
                                            <ChartResume data={dataChartWeek} title={"Grafico de Pedidos Semanal "} />
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <div>

                                    <div className='flex flex-col justify-start mt-4  w-full xl:flex-col 2xl:ml-2 2xl:flex-row  '>
                                        <div className='w-full mt-4 xl:w-[98%] 2xl:w-11/12 2xl:mt-0'>
                                            <ChartResume data={dataChartByMoth} title={"Grafico de Reembolso Mensal "} />
                                        </div>

                                    </div>
                                    <div className='flex flex-col justify-start mt-4  w-full xl:flex-col 2xl:ml-2 2xl:flex-row  '>
                                        <div className='w-full mt-4 xl:w-[98%] 2xl:w-11/12 2xl:mt-0'>
                                            <ChartResume data={dataChartByDay} title={"Grafico de Reembolso Diario "} />
                                        </div>

                                    </div>
                                    <div className='flex flex-col justify-start mt-4  w-full xl:flex-col 2xl:ml-2 2xl:flex-row  '>
                                        <div className='w-full mt-4 xl:w-[98%] 2xl:w-11/12 2xl:mt-0'>
                                            <ChartResume data={dataChartWeek} title={"Grafico de Reembolso Semanal "} />
                                        </div>

                                    </div>
                                </div>
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



            </div>


        </div>
    )
}
