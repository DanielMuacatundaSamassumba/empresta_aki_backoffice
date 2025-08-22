import { useMemo, useState } from 'react'
import Header from '@/shered-elements/components/Header'
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop'
import ButtonReturn from '@/shered-elements/components/ButtonReturn'
import { images } from '@/shered-elements/constents/Images'
import { Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import useRequestValidation from '../services/useRequestValidation'
import LoaderComponent from '@/shered-elements/utils/LoaderComponent'
import { handleStatus, StatusEnum, type CreditRequestDataType } from '../types/CreditRequestDataType'
import { useNavigate } from 'react-router-dom'
import DialogModalForNotAcceptCredit from '../components/DialogModalForNotAcceptCredit'
import useSessionTimeout from '@/hooks/useSessionTimeout'
import AuthModal from '@/shered-elements/components/AuthModal'
import usePersonalCredit from '../services/usePersonalCredit'
import DocumentsImages from '@/shered-elements/components/DocumentsImages'
import { typeOfUser } from '@/shered-elements/types/TypesOfUser'
import DialogModalProcessRequest from '../components/DialogModalProcessRequest'
import { PaymentTypeCode } from '../types/paymentTypeCode'
export const PersonalRequestCreditePage = () => {
    const [menuIsOpened, setMenuIsOpened] = useState(false)
    const [buttonControl, setButtonControl] = useState(0)
    const { timeSession, time } = useSessionTimeout()
    console.log(time, timeSession)
    const dataUserInLocalStorage = localStorage.getItem("dataUser");
    const dataUser = JSON.stringify(dataUserInLocalStorage);
    const user = JSON.parse(dataUser);
    const role = JSON.parse(user).roles[0]
    const {
        requestValidation,
        loaderControl,
        modalIsOpended,
        message, setMessage,
        setModalIsOpended,
        requestValidationWithModal,
        editor, config,
        setoPenModalProcessing,
        oPenModalProcessing,
        pdfFileRef,
        setFile
    } = useRequestValidation()

    const { personalDataCredit } = usePersonalCredit()
    const location = useLocation()
    const { data } = location.state
    const statusName = data.statu?.name
    const navegate = useNavigate()
    const parseHtmlToText = (html: string) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = html;
        return tempElement.textContent || "";
    };
    //const profilePathImage = `https://emprestaki.beeangola.com/storage/${data.customer.path_profile_photo}`;
    //const biFrontalPathImage = `https://emprestaki.beeangola.com/storage/${data.customer.path_profile_photo}`;
    //const biBackPathImage = `https://emprestaki.beeangola.com/storage/${data.customer.path_profile_photo}`;
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>();
    const [sortField, setSortField] = useState<"name" | "ammount">("name");
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5);
    const [filteRedData, setFilteredData] = useState<CreditRequestDataType[]>();
    const [filterByPlan, setFilterByPlan] = useState("")
    const [filterByStatus, setFilterByStatus] = useState("")
    const [ammountFieldControl, setAmmountFieldControl] = useState(true)
    const [nameFieldControl, setNameFieldControl] = useState(true)
    const pageData = useMemo(() => {
        let filtered = [...(personalDataCredit ?? [])];
        if (filterByPlan != "") {
            filtered = filtered.filter(
                r => r.plan[0].flat_name == filterByPlan
            );
        }
        if (filterByStatus != "") {
            filtered = filtered.filter(
                r => handleStatus(r.statu?.name as StatusEnum).statusName === filterByStatus
            );
            console.log("data--->", filtered)
        }
        filtered.sort((a, b) => {
            if (sortField === "name") {
                return sortOrder === "asc"
                    ? a.plan[0].flat_name.localeCompare(b.plan[0].flat_name)
                    : b.plan[0].flat_name.localeCompare(a.plan[0].flat_name);
            } else if (sortField === "ammount") {
                const aCap = Number(a.ammount);
                const bCap = Number(b.ammount);
                return sortOrder === "asc"
                    ? aCap - bCap
                    : bCap - aCap;
            }

            return 0;
        });

        const currentData = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        setFilteredData(currentData);
    }, [personalDataCredit, page, rowsPerPage, filterByPlan, filterByStatus, sortOrder]);
    const total = ((filteRedData?.length ?? 0) / rowsPerPage);
    console.log(total)
    console.log(pageData)
    const handleSort = (field: typeof sortField) => {
        const isAsc = sortField === field && sortOrder === "asc";
        if (field == "name") {
            setNameFieldControl(!nameFieldControl)
        } else field == "ammount"
        setAmmountFieldControl(!ammountFieldControl)
        setSortField(field);
        setSortOrder(isAsc ? "desc" : "asc");
    };
    return (
        <div onClick={()=>{setFilterByPlan(""), setFilterByStatus(""), handleSort("name")}}>
            <div onClick={()=>setPage(0)} className='bg-background min-h-svh w-full flex  flex-row dark:bg-zinc-800'>
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
                        <div className="  p-5 ">
                            <div className='w-11/12 lg:w-/12'>
                                <ButtonReturn />
                            </div>
                        </div>
                        <div className="h-full  flex  flex-col justify-center items-center ">
                            <div className='flex  flex-col justify-end  w-11/12  md:w-8/12 md:flex md:flex-row md:justify-end    '>
                                <button
                                    onClick={() => setButtonControl(0)}
                                    className={buttonControl == 0 ?
                                        `bg-green text-white p-3 rounded  cursor-pointer ` :
                                        "cursor-pointer  border border-green text-green p-3 rounded "}
                                >
                                    Resumo do Pedido</button>

                                <button
                                    onClick={() => setButtonControl(1)}
                                    className={buttonControl == 1 ?
                                        `bg-green text-white p-3 rounded  mt-2 cursor-pointer md:ml-3 md:mt-0` :
                                        " cursor-pointer mt-2 border border-green text-green p-3 rounded md:mt-0 md:ml-3"}
                                >Analise de Risco</button>
                                <button
                                    onClick={() => setButtonControl(4)}
                                    className={buttonControl == 4 ?
                                        `bg-green text-white p-3 rounded  mt-2 cursor-pointer md:ml-3 md:mt-0`
                                        : "  border border-green mt-2 text-green p-3 rounded cursor-pointer md:mt-0 md:ml-3"}>
                                    Documentos </button>
                                <button
                                    onClick={() => setButtonControl(5)}
                                    className={buttonControl == 5 ?
                                        `bg-green text-white p-3 rounded  mt-2 cursor-pointer md:ml-3 md:mt-0`
                                        : "  border border-green mt-2 text-green p-3 rounded cursor-pointer md:mt-0 md:ml-3"}>
                                    Dados Bancários</button>
                                <button
                                    onClick={() => setButtonControl(2)}
                                    className={buttonControl == 2 ?
                                        `bg-green text-white p-3 rounded  mt-2 cursor-pointer md:ml-3 md:mt-0`
                                        : "  border border-green mt-2 text-green p-3 rounded cursor-pointer md:mt-0 md:ml-3"}>
                                    Historico</button>
                                {
                                    handleStatus(statusName).itsTrue && (
                                        <button
                                            onClick={() => setButtonControl(3)}
                                            className={buttonControl == 3 ?
                                                `bg-green text-white p-3 rounded  mt-2 cursor-pointer md:ml-3 md:mt-0`
                                                : "  border border-green mt-2 text-green p-3 rounded cursor-pointer md:mt-0 md:ml-3"}>
                                            Razão da Negação</button>
                                    )
                                }
                                {
                                    statusName == StatusEnum.Pending && (
                                        <button
                                            onClick={() => setButtonControl(3)}
                                            className={buttonControl == 3 ?
                                                `bg-green text-white p-3 rounded  mt-2 cursor-pointer md:ml-3 md:mt-0`
                                                : "  border border-green mt-2 text-green p-3 rounded cursor-pointer md:mt-0 md:ml-3"}>
                                            Razão da Pendência</button>
                                    )
                                }

                            </div>
                            {
                                buttonControl == 0 && (
                                    <div className='bg-white rounded   w-11/12 p-6 mt-5 md:w-8/12'>
                                        <div className='flex flex-col  cursor-pointer justify-center items-center md:flex md:flex-row md:justify-between' onClick={() => navegate("/customer/profile", { state: { data: data.customer } })}>
                                            <div className='flex flex-col items-center  justify-start   p-2 md:flex md:flex-row md:w-8/12 lg:w-11/12 xl:w-6/12'>
                                                <img
                                                    src={data.customer.path_profile_photo ? data.customer.path_profile_photo : images.avatarIcon}
                                                    alt="image-profile-user"
                                                    className="rounded-full border-2 border-green object-cover
             w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36"
                                                />
                                                <div className='flex flex-col text-font-color ml-5'>
                                                    <h1 className='text-[20px]'>{data.customer.name}</h1>
                                                    <p>{data.customer.bi_number}</p>
                                                    <p>Data de Cadastro  -
                                                        {data.customer.created_at.split("T")[0]}
                                                    </p>
                                                    <p className='flex'>Status- <p className='font-bold text-green-800'>{'activo'}</p></p>
                                                </div>
                                            </div>
                                            <div className='w-1/4 flex justify-center md:justify-center'>
                                                <div className=' w-28 h-28 rounded-full p-2 flex  flex-col justify-center items-center bg-gradient-to-r from-blue to-green mt-2'

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
                                        <div className='mt-10  border-border-color border-b '>
                                            <h3 className='text-font-color  mb-2 text-[17px]'>Detalhes do Credito</h3>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p>ID do Crédito </p>
                                            <p>2025-0003 </p>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p>Plano  </p>
                                            <p>{data.plan[0].flat_name} </p>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p>Número de Parcelas  </p>
                                            <p>{data.installments.length}</p>
                                        </div>

                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p>Data de Validação </p>
                                            <p>{data.validated_at != null ? data.validated_at.split(" ")[0] : "Em Analise"} </p>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color '>
                                            <p>Status</p>
                                            <p className=' font-bold' style={{ color: handleStatus(data.statu.name).color }}>{
                                                handleStatus(data.statu.name).statusName
                                            } </p>
                                        </div>
                                        <div className='border-border-color border-b mt-2'>

                                            <div className=''>
                                                <h1 className='text-zinc-500 text-[17px]'>Parcelas</h1>
                                                <div>
                                                    <div className='mt-2'>
                                                        {
                                                            data.installments.map((item: any, i: any) => (
                                                                <div key={i} className='bg-zinc-400 rounded p-3 flex justify-between  items-center mt-4 '>
                                                                    <div className='r'>
                                                                        <p className='text-white'>Parcela - {i + 1}</p>
                                                                        <p className='text-white '>Valor {
                                                                            new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                                                .format(item.installment_value)
                                                                        }
                                                                        </p>
                                                                    </div>
                                                                    <div className='flex flex-col '>
                                                                        <p className='text-white '> Termina em {

                                                                            data.statu.name == StatusEnum.processed && item.end_at ? item.end_at.split(" ")[0] : "N/A"
                                                                        } </p>
                                                                    </div>
                                                                </div>

                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className='w-full flex justify-between mt-2 text-font-color   border-border-color border-t'>
                                            <p>Valor do Crédito</p>
                                            <p>
                                                {data?.ammount
                                                    ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                        .format(data.ammount)
                                                    : 'Valor inválido'
                                                } </p>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p>Taxa de Juros   </p>
                                            <p>{data.plan[0]?.interest_rate} %  </p>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p>spread  </p>
                                            <p>{
                                                data.plan[0]?.spread + "%"
                                            } </p>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p> Juros  por Mora  </p>
                                            <p>{
                                                data.plan[0]?.Interest_on_arrears_for_each_day_of_delay + "%"
                                            } </p>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p> Comissão de Abertura de Dociê  </p>
                                            <p>{
                                                data.plan[0].commission + "%"
                                            } </p>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p>Taxa de Juro Total</p>
                                            <p>{
                                                data?.totalInterestRate + '%'

                                            } </p>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p>Comissão da Abertura da Solicitação  </p>
                                            <p>{
                                                data?.openingCommittee
                                                    ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                        .format(data.openingCommittee)
                                                    : 'Valor inválido'
                                            } </p>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p>Valor líquido a receber </p>
                                            <p>{
                                                data?.netAmountReceivable
                                                    ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                        .format(data.netAmountReceivable)
                                                    : 'Valor inválido'
                                            } </p>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p>Custo Efectivo Total  </p>
                                            <p>


                                                {
                                                    data?.totalEffectiveCost
                                                        ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                            .format(data.totalEffectiveCost)
                                                        : 'Valor inválido'
                                                } </p>
                                        </div>
                                        <div className='w-full flex justify-between mt-2 text-font-color'>
                                            <p>Multa por atraso  </p>
                                            <p>
                                                {
                                                    data.fineForLate
                                                        ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                            .format(data.fineForLate)
                                                        : 'N/A'
                                                }
                                                {

                                                }  </p>
                                        </div>





                                        {
                                            (
                                                data.statu.name === StatusEnum.Pending &&
                                                (
                                                    role === typeOfUser.CREDIT_ANALIST ||
                                                    role === typeOfUser.SUPER_ADMIN ||
                                                    role === typeOfUser.ADMIN
                                                )
                                            ) && (
                                                <div className='p-2 flex justify-end mt-10'>
                                                    <button
                                                        className='bg-green text-white p-3 rounded cursor-pointer'
                                                        onClick={() => requestValidation('approved', data.id)}
                                                    >
                                                        Aceitar Solicitação
                                                    </button>
                                                    <button
                                                        className='bg-red text-white p-3 rounded ml-5 cursor-pointer'
                                                        onClick={() => requestValidation('denied', data.id)}
                                                    >
                                                        Rejeitar Solicitação
                                                    </button>
                                                </div>
                                            )
                                        }

                                        {
                                            (
                                                data.statu.name === StatusEnum.UnderAnalysi &&
                                                (
                                                    role === typeOfUser.CREDIT_ANALIST ||
                                                    role === typeOfUser.SUPER_ADMIN ||
                                                    role === typeOfUser.ADMIN
                                                )
                                            ) && (
                                                <div className='p-2  flex flex-col md:flex md md:justify-end md:flex-row md:items-center mt-10'>
                                                    <button
                                                        className='bg-green text-white p-3 rounded cursor-pointer'
                                                        onClick={() => requestValidation('approved', data.id)}
                                                    >
                                                        Aceitar Solicitação
                                                    </button>
                                                    <button
                                                        className='bg-yellow-500 mt-4 text-white p-3 rounded cursor-pointer md:ml-3 md:mt-0'
                                                        onClick={() => requestValidation('pending', data.id)}
                                                    >
                                                        Deixar a Solicitação como Pendente
                                                    </button>
                                                    <button
                                                        className='bg-red mt-4 text-white p-3 rounded md:ml-5 cursor-pointer md:mt-0'
                                                        onClick={() => requestValidation('denied', data.id)}
                                                    >
                                                        Rejeitar Solicitação
                                                    </button>
                                                </div>
                                            )
                                        }

                                        {
                                            (
                                                data.statu.name === StatusEnum.validated &&
                                                (role === typeOfUser.FINANCIAL_MANEGER || role === typeOfUser.SUPER_ADMIN)  
                                            ) && (
                                                <div className='p-2 flex justify-end mt-10'>
                                                    <button
                                                        className='bg-green text-white p-3 rounded cursor-pointer w-1/3'
                                                        onClick={() => requestValidation('process', data.id, data.payment_method.id)}
                                                    >
                                                        Processar Pagamento
                                                    </button>
                                                </div>
                                            )
                                        }

                                    </div>
                                )

                            }

                            {
                                buttonControl == 1 && (
                                    <div className='bg-white rounded flex justify-center items-center w-11/12  md:w-8/12 p-6 mt-5 h-[750px]'>
                                        <h1 className='text-2xl text-font-color'>Analise Não desponivel</h1>
                                    </div>
                                )
                            }
                            {
                                buttonControl == 2 && (
                                    <div className='rounded flex flex-col justify-center items-center w-full  md:w-5/7 p-6 mt-5 h-[750px]'>
                                         <div className='flex flex-col  cursor-pointer justify-center bg-white items-center md:flex md:flex-row md:justify-between w-full' onClick={() => navegate("/customer/profile", { state: { data: data.customer } })}>
                                            <div className='flex flex-col items-center  justify-start   p-2 md:flex md:flex-row md:w-8/12 lg:w-11/12 xl:w-/12'>
                                                <img
                                                    src={data.customer.path_profile_photo ? data.customer.path_profile_photo : images.avatarIcon}
                                                    alt="image-profile-user"
                                                    className="rounded-full border-2 border-green object-cover
                                                           w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36"
                                                />
                                                <div className='flex flex-col text-font-color ml-5'>
                                                    <h1 className='text-[20px]'>{data.customer.name}</h1>
                                                    <p>{data.customer.bi_number}</p>
                                                    <p>Data de Cadastro  -
                                                        {data.customer.created_at.split("T")[0]}
                                                    </p>
                                                    <p className='flex'>Status- <p className='font-bold text-green-800'>{'activo'}</p></p>
                                                </div>
                                            </div>
                                            <div className='w-1/4 flex justify-center md:justify-center'>
                                                <div className=' w-28 h-28 rounded-full p-2 flex  flex-col justify-center items-center bg-gradient-to-r from-blue to-green mt-2'

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
                                        <div className='w-full'>

                                            <div className=" p-4 rounded mt-2">
                                                <div className='w-1/2 bg-white p-2 flex mt-2 border border-zinc-400 rounded justify-between md:w-1/3 lg:w-1/3 xl:w-1/4 '>
                                                    <input type="text"
                                                        placeholder='Número da transação'
                                                        className='outline-none text-font-color'
                                                    />
                                                    <Search color='#6666' />
                                                </div>

                                                <div className="w-full overflow-x-auto">
                                                    <table className="w-full border-collapse mt-2 min-w-max">
                                                        <thead className="bg-white">
                                                            <tr className="text-font-color">
                                                                <th className="px-1 py-5">Número da transação</th>

                                                                <th className="px-1 py-2">Parcela</th>
                                                                <th className="px-1 py-2">Montante</th>

                                                                <th className="px-1 py-2">Data de Pagamento</th>
                                                                <th className="px-1 py-2">Status</th>
                                                                <th className="px-1 py-2">Ação</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan={8} className="h-5"></td>
                                                            </tr>

                                                            <tr className="bg-white text-font-color">
                                                                <td className="px-2 py-4 text-center">2024-0001</td>
                                                                <td className="px-2 py-4 text-center">1</td>
                                                                <td className="px-2 py-4 text-center">30.0000 kz</td>
                                                                <td className="px-2 py-4 text-center">20-02-2026</td>

                                                                <td className="px-2 py-4 text-center">Pago</td>
                                                                <td className="px-2 py-1 text-center">
                                                                    <button className="bg-green text-white p-2 rounded cursor-pointer">Saber Mais</button>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td colSpan={8} className="h-5"></td>
                                                            </tr>

                                                            <tr className="bg-white text-font-color">
                                                                <td className="px-2 py-4 text-center">2024-0001</td>
                                                                <td className="px-2 py-4 text-center">1</td>
                                                                <td className="px-2 py-4 text-center">30.0000 kz</td>
                                                                <td className="px-2 py-4 text-center">20-02-2026</td>

                                                                <td className="px-2 py-4 text-center">Pago</td>
                                                                <td className="px-2 py-1 text-center">
                                                                    <button className="bg-green text-white p-2 rounded cursor-pointer">Saber Mais</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className='bg-white w-full p-4 mt-2 flex justify-end'>
                                                    <div>
                                                        <button className='border p-2 border-zinc-400  rounded cursor-pointer text-font-color'>Anterior</button>
                                                        <button className='border p-2 border-zinc-400  rounded ml-4 cursor-pointer text-font-color'>Proximo</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            }
                            {
                                buttonControl == 3 && (
                                    <div className=' rounded flex flex-col justify-center items-center w-11/12  md:w-8/12 h-[750px]'>
                                        <div className='bg-white rounded flex flex-col  items-center w-11/12 md:w-full  p-6 h-[650px]'>
                                            <h1 className='text-2xl text-font-color font-bold'>
                                                Razão Pela Negação
                                            </h1>
                                            <p className='text-zinc-500 text-center mt-5'>
                                                <p>
                                                    {data.reason_for_rejection
                                                        ? parseHtmlToText(data.reason_for_rejection)
                                                        : "Nenhuma razão informada"}
                                                </p>
                                            </p>
                                        </div>
                                        <div className=' rounded flex flex-row  justify-end w-11/12  md:w-full mt-4'>
                                            <button className='bg-green cursor-pointer text-white p-3 rounded w-1/4' onClick={() => setModalIsOpended(true)}>Actualizar </button>
                                        </div>
                                    </div>

                                )
                            }
                            {
                                buttonControl == 4 && (
                                    <div className='bg-white rounded flex justify-center items-center w-11/12  md:w-8/12 p-6 mt-5 h-[750px]'>
                                        <DocumentsImages
                                            galleryID={'gallery-54'}
                                            style={""}
                                            images={[
                                                {
                                                    thumbnailURL: data.customer.path_front_identity_card ? ` ${data.customer.path_front_identity_card}` : "N/A",
                                                    width: 400,
                                                    largeURL: data.customer.path_front_identity_card ? ` ${data.customer.path_front_identity_card}` : "N/A",
                                                    height: 400,
                                                    imageWidth: 200,
                                                    style: "",

                                                },
                                                {
                                                    thumbnailURL: data.customer.path_back_identity_card ? ` ${data.customer.path_back_identity_card}` : "N/A",
                                                    width: 400,
                                                    largeURL: data.customer.path_back_identity_card ? ` ${data.customer.path_back_identity_card}` : "N/A",
                                                    height: 400,
                                                    imageWidth: 200,
                                                    style: "",

                                                }
                                            ]}
                                        />
                                    </div>
                                )
                            }
                            {
                                buttonControl == 5 && (
                                    <div className=' rounded flex  w-11/12  md:w-8/12  mt-5 h-[750px]'>
                                        <div className=' bg-white w-full rounded border-green  p-4 h-[220px] md:h-[190px]' >
                                            <div className='border rounded border-zinc-400 border-dashed p-2'>
                                                <div className='flex items-center'>
                                                    {
                                                        data.payment_method.code == PaymentTypeCode.TRANSFERENCIA_BANCARIA ?
                                                            <img src={images.bankIcon} className='w-16 h-16 ' /> :
                                                            <img src={images.ExpressIcon} className='w-16 h-16 rounded-full' />
                                                    }

                                                    <p className='text-2xl ml-3 text-black font-semibold'>{
                                                        data.payment_method.code == PaymentTypeCode.TRANSFERENCIA_BANCARIA ?
                                                            '   Transferência  Bancária' :
                                                            'Multicaixa Express'

                                                    }</p>

                                                </div>
                                                <div className='p-2'>
                                                    <p className='text-xl ml-3 text-zinc-600 '>
                                                        {
                                                            data.payment_method.code == PaymentTypeCode.TRANSFERENCIA_BANCARIA ?
                                                                (
                                                                    <div>
                                                                        <p className='ml-15'> IBAN-{data.customer.iban}</p>
                                                                        <p className='ml-15 mt-1'> Nome do Cliente-{data.customer.name}</p>
                                                                    </div>
                                                                ) :
                                                                data.customer.multicaixaExpress ?
                                                                    <div>
                                                                        <p className='ml-15'> Número-{data.customer.multicaixaExpress}</p>
                                                                        <p className='ml-15 mt-1'> Nome do Cliente -{data.customer.name}</p>
                                                                    </div>
                                                                    : "N/A"

                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <div>
                            < DialogModalForNotAcceptCredit
                                isPonded={modalIsOpended}
                                setIsPonded={setModalIsOpended}
                                message={message}
                                setMessage={setMessage}
                                editor={editor}
                                config={config}
                                ButtonSubmit={requestValidationWithModal}
                            />

                        </div>
                        <div>
                            <DialogModalProcessRequest
                                isPonded={oPenModalProcessing}
                                setIsPonded={setoPenModalProcessing}
                                ButtonSubmit={requestValidationWithModal}
                                pdfFileRef={pdfFileRef}
                                setFile={setFile}
                            />

                        </div>
                    </div>
                    {
                        loaderControl && (
                            <LoaderComponent />
                        )
                    }

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
