import Header from '@/shered-elements/components/Header';
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop';
import { useMemo, useState } from 'react';
import { images } from '@/shered-elements/constents/Images';
import { ArrowDown, ArrowUp, Search } from 'lucide-react';
import BackButtton from '@/shered-elements/components/BackButtton';
import UseListClient from '@/hooks/UseShowClient';
import useListPlans from '@/modules/plans/services/useListPlans';
import useMethodPayment from '../services/useMethodPayment';
import LoaderComponent from '@/shered-elements/utils/LoaderComponent';
import {  useNavigate } from 'react-router-dom';
import AuthModal from '@/shered-elements/components/AuthModal';
import useSessionTimeout from '@/hooks/useSessionTimeout';
import { handleStatusUser, statusUsers } from '../types/CreateClientType';
import DocumentsImages from '@/shered-elements/components/DocumentsImages';
import { PaymentTypeCode } from '@/modules/credit_request/types/paymentTypeCode';
import useReimbursementPay from '@/modules/credit_request/services/useReimbursementPay';
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom';
import { handleStatus, StatusEnum, type CreditRequestDataType } from '@/modules/credit_request/types/CreditRequestDataType';
import usePersonalCredit from '@/modules/credit_request/services/usePersonalCredit';
export default function CustomerProfilePage() {
    const [menuIsOpened, setMenuIsOpened] = useState(false);
    const [butttonControl, setButtonControl] = useState(0)
    const [writeValueOfLoan, setWriteValueOfLoan] = useState(false)
    const [cardControl, setCardControl] = useState(0)
    const [hasFile, setHasfile] = useState(false)
    const { timeSession, time } = useSessionTimeout()
    console.log(time, timeSession)


  


    const { personalDataCredit } = usePersonalCredit()
    console.log("items--->", personalDataCredit)
    const navegate = useNavigate()

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
    const navigate = useNavigate()
    const {
        handleChangeValue,
        ammountOfReimbursement,
        selectedInstallments,
        handleSelectAllInstament,
        getRootProps, getInputProps, isDragActive,
        imageOfPdf,
        handleSubmit,
    
        uploudReasonFileRef
    } = useReimbursementPay()


    const { data, deleteClient, } = UseListClient()
    
    const {
        dataPlans,
        installMentData,
        handleShowInstalments,
        planData, loanValue,
        planResumeControl,
        handleAmmountOfLoan,
        InstalmentSelected,
        setInstallmentSelected,
        handleCreditRquest,
        setMethodId,
        loanValueControl,
        loaderControl
    } = useListPlans()
    const { methodData } = useMethodPayment()
    return (
        <div>
            <div className='bg-background h-[2000px]  w-full flex flex-row dark:bg-zinc-800'>

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

                <div className='flex flex-row w-full'>
                    <div className='flex flex-col w-full h-full'>
                        <Header />

                        <div className="h-full  flex flex-col items-center ">
                            <div className='p-8 w-full'>
                                <BackButtton />
                            </div>
                            <div className='w-11/12 lg:w-9/12 xl:w-7/12'>

                                <div className='flex flex-col justify-center mt-20'>
                                    <div className=' rounded flex flex-col justify-end md:flex md:flex-row md:justify-end'>
                                        <button className={butttonControl == 0 ? "border cursor-pointer mt-2 bg-green border-green text-white  w-full ml-2 p-2 rounded md:w-1/4 lg:w-1/3 xl:w-1/6 2xl:w-1/4" :
                                            "border border-green text-green cursor-pointer mt-2 ml-2 p-2 w-full rounded md:w-1/4 lg:w-1/3 xl:w-1/6 2xl:w-1/4"}
                                            onClick={() => setButtonControl(0)}
                                        >Perfil</button>
                                        <button
                                            className={butttonControl == 1 ? "border cursor-pointer mt-2 bg-green border-green text-white  w-full ml-2 p-2 rounded md:w-1/4 lg:w-1/3 xl:w-1/4 2xl:w-1/4" :
                                                "border border-green text-green cursor-pointer mt-2 ml-2 p-2 w-full rounded md:w-1/4 lg:w-1/3  xl:w-1/4  2xl:w-1/4"}
                                            onClick={() => setButtonControl(1)}
                                        >Analise de Risco</button>
                                        <button
                                            className={butttonControl == 3 ? "border cursor-pointer mt-2 bg-green border-green text-white  w-full ml-2 p-2 rounded md:w-1/4 lg:w-1/3 xl:w-1/4 2xl:w-1/4" :
                                                "border border-green text-green cursor-pointer mt-2 ml-2 p-2 w-full rounded md:w-1/4 lg:w-1/3  xl:w-1/4  2xl:w-1/4"}
                                            onClick={() => setButtonControl(3)}
                                        >Solicitar Crédito</button>
                                        {
                                            data.creditRequestProcessed ?
                                                <button
                                                    className={butttonControl == 4 ? "border cursor-pointer mt-2 bg-green border-green text-white  w-full ml-2 p-2 rounded md:w-1/4 lg:w-1/3 xl:w-1/4 2xl:w-1/4" :
                                                        "border border-green text-green cursor-pointer mt-2 ml-2 p-2 w-full rounded md:w-1/4 lg:w-1/3  xl:w-1/4  2xl:w-1/4"}
                                                    onClick={() => setButtonControl(4)}
                                                >Reembolso</button> : ""
                                        }

                                        <button
                                            className={butttonControl == 2 ? "border bg-green mt-2 border-green text-white w-full cursor-pointer  ml-2 p-2 rounded md:w-1/6 lg:w-1/3 xl:w-1/6 2xl:w-1/4" :
                                                "border cursor-pointer border-green text-green  mt-2 ml-2 p-2 rounded w-full md:w-1/4 lg:w-1/3 xl:w-1/6 2xl:w-1/4"}
                                            onClick={() => setButtonControl(2)}
                                        >Histórico</button>
                                    </div>
                                    {
                                        butttonControl == 0 && (
                                            <div className='bg-white p-5 border border-green rounded mt-3 '>
                                                <div className='border border-zinc-300 p-3  rounded'>
                                                    <div className='p-2 flex flex-col justify-center  items-center md:flex-row'>
                                                        <div className='flex flex-col items-center    p-2 md:flex md:flex-row md:w-8/12 lg:w-11/12 xl:w-8/12'>
                                                            <img
                                                                src={data.path_profile_photo ? data.path_profile_photo : images.avatarIcon}
                                                                alt="image-profile-user"
                                                                className="rounded-full border-2 border-green object-cover aspect-square
             w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32"
                                                            />



                                                            <div className='flex flex-col text-font-color ml-5 md:text-start'>
                                                                <h1 className='text-[20px] text-center md:text-start'>{data?.name}</h1>
                                                                <p className='text-center md:text-start'>{data?.bi_number}</p>
                                                                <p className='text-center md:text-start'>
                                                                    Data de Cadastro - {
                                                                        data.created_at ? new Date(String(data.created_at).split("T")[0]).toLocaleDateString('pt-BR') : "Data não disponível"
                                                                    }
                                                                </p>
                                                                {
                                                                    //<p className='flex'>Status- <p style={{ color: handleStatusUser(data?.status[0] ?? "")?.color }}> {handleStatusUser(data?.status[0] ?? "")?.name}</p></p>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className='w-1/2 flex justify-center md:justify-end'>
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
                                                </div>

                                                <div className='border border-zinc-300 p-3  rounded mt-4'>
                                                    <div>
                                                        <h1 className='text-2xl font-medium text-font-color'>Informações Pessoais</h1>
                                                    </div>
                                                    <div className='flex   flex-col mt-5 text-font-color md:flex md:flex-row md:justify-between'>
                                                        <div>
                                                            <h1 className='font-semibold mt-1 md:mt-0'>Nome</h1>
                                                            <p className='font-light mt-2'>{data.name}</p>
                                                        </div>
                                                        <div>
                                                            <h1 className='font-semibold mt-1 md:mt-0'>Email</h1>
                                                            <p className='font-light mt-2'>{data?.email ? data.email : "N/A"} </p>
                                                        </div>
                                                        <div>
                                                            <h1 className='font-semibold mt-1 md:mt-0'>Número de Telefone</h1>
                                                            <p className='font-light mt-2'> {data.phone_number}  </p>
                                                        </div>

                                                    </div>
                                                    <div className='flex   flex-col mt-2 text-font-color md:flex md:flex-row md:justify-between'>
                                                        <div className='text-font-color mt-5'>
                                                            <h1 className='font-semibold'>Número do B.I</h1>
                                                            <p className='font-light mt-2'> {data?.bi_number}</p>
                                                        </div>
                                                        <div className='text-font-color mt-5 '>
                                                            <h1 className='font-semibold'>Data de Nascimento</h1>
                                                            <p className='font-light mt-2'> {data.birtday_date}</p>
                                                        </div>
                                                        <div className='text-font-color mt-5 bg-white '>
                                                        <h1 className='font-semibold'>Estado Civíl</h1>
                                                        <p className='font-light mt-2'> {data.marital_status}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col md:flex-row'>

                                                    <div className='border border-zinc-300 p-3  rounded mt-4 md:w-1/2'>
                                                        <div>
                                                            <h1 className='text-2xl font-medium text-font-color'>Endereço</h1>
                                                        </div>
                                                        <div className='flex text-font-color mt-5 flex-row justify-between w-8/12 '>
                                                            <div>
                                                                <h1 className='font-semibold'>Rua</h1>
                                                                <p>{data.address?.street ?? "N/A"}</p>
                                                            </div>
                                                            <div>
                                                                <h1 className='font-semibold'>Província</h1>
                                                                <p className='font-light mt-2'> {data.address?.province ?? "N/A"}</p>
                                                            </div>
                                                        </div>
                                                        <div className='flex text-font-color mt-5 flex-row justify-between w-9/12 '>

                                                            <div>
                                                                <h1 className='font-semibold'>Casa N</h1>
                                                                <p className='font-light mt-2'> {data.address?.house_number ?? "N/A"}</p>
                                                            </div>
                                                            <div>
                                                                <h1 className='font-semibold'>Bairro</h1>
                                                                <p className='font-light mt-2'> {data.address?.neighborhood ?? "N/A"}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='border border-zinc-300 p-3  rounded mt-4 ml-2  text-font-color md:w-1/2'>
                                                        <div>
                                                            <h1 className='text-2xl font-medium text-font-color'>Dados Bancários</h1>
                                                        </div>
                                                        <div className='mt-4'>
                                                            <p className='font-light mt-2' >IBAN - {data?.iban ? data?.iban : "N/A"}</p>
                                                            <p className='font-light mt-2'>Número de Conta - {data?.accountNumber ? data?.accountNumber : "N/A"}</p>
                                                            <p className='font-light mt-2'>Multicaixa Express- {data?.multicaixaExpress ? data?.multicaixaExpress : "N/A"}</p>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className='border border-zinc-300 p-3  rounded mt-4   text-font-color w-full'>
                                                    <div className=''>
                                                        <h1 className='text-2xl font-medium text-font-color'>Documentos</h1>
                                                        <DocumentsImages
                                                            galleryID={'gallery-54'}
                                                            style='flex items-center  mt-8'
                                                            images={[
                                                                {
                                                                    thumbnailURL: data.path_front_identity_card ? ` ${data.path_front_identity_card}` : "N/A",
                                                                    width: 400,
                                                                    largeURL: data.path_front_identity_card ? ` ${data.path_front_identity_card}` : "N/A",
                                                                    height: 400,
                                                                    imageWidth: 200,
                                                                    style: "",

                                                                },
                                                                {
                                                                    thumbnailURL: data.path_back_identity_card ? ` ${data.path_back_identity_card}` : "N/A",
                                                                    width: 400,
                                                                    largeURL: data.path_back_identity_card ? ` ${data.path_back_identity_card}` : "N/A",
                                                                    height: 400,
                                                                    imageWidth: 200,
                                                                    style: "",

                                                                }
                                                            ]}
                                                        />
                                                    </div>

                                                </div>
                                                <div className='border border-zinc-300 p-3  rounded mt-4  text-font-color w-full'>
                                                    <div>
                                                        <h1 className='text-2xl font-medium text-font-color'>Plano activo</h1>
                                                    </div>
                                                    <div className='mt-4 flex flex-col  md:flex md:flex-row  md:justify-between md:items-center '>
                                                        <div>
                                                            <h1 className='font-semibold mt-1 md:mt-0  text-sm'>Plano</h1>
                                                            <p className='font-light mt-2   text-sm  '>{data.creditRequestProcessed?.plan ? data.creditRequestProcessed.plan[0].flat_name : "N/A"}</p>
                                                        </div>
                                                        <div>
                                                            <h1 className='font-semibold mt-1  text-sm md:mt-0'>Data de Pedido </h1>
                                                            <p className='font-light   text-sm mt-2 '>{data.creditRequestProcessed ? data.creditRequestProcessed.created_at.split("T")[0] : "N/A"}</p>
                                                        </div>
                                                        <div>
                                                            <h1 className='font-semibold  text-sm  mt-1 md:mt-0'>Montante Emprestado</h1>
                                                            <p className='font-light mt-2  text-sm '>
                                                                {
                                                                    data.creditRequestProcessed?.ammount ?

                                                                        new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                                            .format(Number(data.creditRequestProcessed?.ammount))

                                                                        : "N/A"
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h1 className='font-semibold    text-sm mt-1 md:mt-0'>Montante já Reembolsado</h1>
                                                            <p className='font-light mt-2  text-sm text-center'>{
                                                                data.creditRequestProcessed?.totalEffectiveCost ?

                                                                    new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                                        .format(data.creditRequestProcessed.totalEffectiveCost)

                                                                    : "N/A"
                                                            }</p>
                                                        </div>
                                                        <div>
                                                            <h1 className='font-semibold mt-1  text-sm md:mt-0'>Total a Pagar com Juros </h1>
                                                            <p className='font-light mt-2  text-sm '>{data.creditRequestProcessed ? data.creditRequestProcessed.totalEffectiveCost : "N/A"}</p>
                                                        </div>
                                                        <div>
                                                            <h1 className='font-semibold mt-1  text-sm md:mt-0'>Data Final de Reembolso</h1>
                                                            <p className='font-light mt-2  text-sm '>{data.creditRequestProcessed ? data.creditRequestProcessed.created_at.split("T")[0] : "N/A"}</p>
                                                        </div>
                                                    </div>
                                                    {
                                                       /* data.creditRequestProcessed && (
                                                            <div className='flex justify-end mt-6'>
                                                                <button className='bg-green cursor-pointer text-white p-3 rounded'
                                                                    onClick={() => navigate('/credit-request/personal', { state: { data: data.creditRequestProcessed } })}
                                                                >Saber Mais</button>
                                                            </div>
                                                        )*/
                                                    }
                                                </div>
                                                <div className='p-2 flex w-full justify-end'>

                                                    <div className='w-full flex flex-col md:flex md:flex-row  '>
                                                        <div className='bg-green cursor-pointer text-white p-1 rounded-sm w-full flex flex-row-reverse mt-2 items-center justify-center md:w-5/12 xl:w-8/12 2xl:w-6/12' onClick={() => navigate("/customer/update", { state: { data: data } })}>
                                                            <img
                                                                src={images.UpdateUserIcon}
                                                                alt="image-update-user-icon"
                                                                className='w-7'
                                                            />
                                                            Actualizar usuario
                                                        </div>
                                                        <div className='bg-red cursor-pointer text-white p-2 rounded-sm w-full flex flex-row-reverse mt-2 ml-0 items-center justify-center md:ml-4 md:w-4/12 xl:w-6/12'
                                                            onClick={deleteClient}
                                                        >
                                                            <img
                                                                src={images.DeleteIcon}
                                                                alt="image-update-user-icon"
                                                                className='w-7'
                                                            />
                                                            <p>Apagar o usuário</p>
                                                        </div>
                                                        <div className='bg-blue cursor-pointer text-white p-2 rounded-sm w-full flex flex-row-reverse mt-2 items-center justify-center ml-0 md:w-5/12 md:ml-3'>
                                                            <img
                                                                src={images.DownloadIcon}
                                                                alt="image-update-user-icon"
                                                                className='w-7 ml-2'
                                                            />
                                                            <p>Baixar ficha do usuario</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        butttonControl == 1 && (
                                            <div className='h-[760px]'>
                                                <h1 className='text-black text-center font-bold text-xl mt-2'>Conteodo Não  disponivel</h1>
                                            </div>
                                        )
                                    }
                                    {
                                        butttonControl == 2 && (
                                            <div className=' rounded flex justify-center items-center w-11/12  md:w-full    '>

                                                <div className="  w-full  mt-30 flex flex-col justify-center items-center md:flex md:flex-col md:items-end md:w-full  ">
                                                    <div className=' w-11/12 rounded flex flex-col items-center cursor-pointer md:flex md:flex-row md:justify-between bg-white p-5 md:w-full md:ml-40 ' >
                                                        <div className='flex flex-col items-center  justify-start w-full  p-2  md:flex md:flex-row md:w-9/12 lg:w-11/12 xl:w-7/12'>
                                                            <img
                                                                src={data.path_profile_photo ? data.path_profile_photo : images.avatarIcon}
                                                                alt="image-profile-user"
                                                                className="rounded-full border-2 border-green object-cover aspect-square
             w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32"
                                                            />
                                                            <div className='flex flex-col justify-center text-font-color ml-5'>
                                                                <h1 className='text-[20px] text-center md:text-start'>{data.name}</h1>
                                                                <p className='text-center md:text-start'>{data.bi_number}</p>
                                                                <p className='text-center md:text-start'>Data de Cadastro  -
                                                                    {typeof data?.created_at === 'string' ? data.created_at : "N/A"}
                                                                </p>
                                                                <p className='flex text-center md:text-start'>Status- <p className='font-bold text-green-800 text-center md:text-start'>Activo</p></p>
                                                            </div>
                                                        </div>
                                                        <div className=' flex justify-center w-1/5 md:w-1/4 md:justify-center'>
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


                                                    <div className='md:w-full md:flex md:items-center md:justify-between  '>
                                                        <div className='flex  justify-between w-full items-center mt-10'>
                                                            <div className=' '>

                                                                <div className='flex flex-col'>
                                                                    <div>
                                                                        <select className='border border-zinc-300 rounded p-3 outline-none bg-white' onChange={(e) => setFilterByPlan(e.target.value)}>
                                                                            <option value="">Selecionar plano</option>
                                                                            {
                                                                                dataPlans.map(item => (
                                                                                    <option key={item.id} value={item.flat_name}>{item.flat_name}</option>
                                                                                ))

                                                                            }
                                                                        </select>
                                                                        <select className='border ml-4 border-zinc-300 rounded p-3 outline-none bg-white' onChange={(e) => setFilterByStatus(e.target.value)}>
                                                                            <option value="">Selecionar Status</option>
                                                                            <option value="Validado">Validado</option>
                                                                            <option value="Não Validado">Não Validado</option>
                                                                            <option value="Processado">Processado</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className=' bg-white w-full p-2 flex  border  border-zinc-400 rounded justify-between md:w-8/3 lg:w-1/3 xl:w-1/2 '>
                                                                <input type="text"
                                                                    placeholder='pesquisar por ID'
                                                                    className='outline-none text-font-color'
                                                                />
                                                                <Search color='#6666' />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="w-11/12 overflow-x-auto md:w-full">
                                                        <table className="w-full border-collapse mt-2 ">
                                                            <thead className="bg-white">
                                                                <tr className="text-font-color">
                                                                    <th className="px-1 py-5">ID do Crédito</th>
                                                                    <th className="px-1 py-2" onClick={() => handleSort("name")}>
                                                                        <div className="flex justify-center items-center gap-1 cursor-pointer group" >
                                                                            Valor do Crédito
                                                                            {nameFieldControl ? (
                                                                                <div className="transition ease-in duration-500 ">
                                                                                    <ArrowUp className='text-zinc-500' />
                                                                                </div>
                                                                            ) : (
                                                                                <div className="transition ease-in duration-500 ">
                                                                                    <ArrowDown className='text-zinc-500' />
                                                                                </div>
                                                                            )}
                                                                        </div>

                                                                    </th>
                                                                    <th className="px-1 py-2">Parcelas</th>
                                                                    <th className="px-1 py-2" onClick={() => handleSort("ammount")}>

                                                                        <div className="flex justify-center items-center gap-1 cursor-pointer group" >
                                                                            Valor do Crédito
                                                                            {ammountFieldControl ? (
                                                                                <div className="transition ease-in duration-500 ">
                                                                                    <ArrowUp className='text-zinc-500' />
                                                                                </div>
                                                                            ) : (
                                                                                <div className="transition ease-in duration-500 ">
                                                                                    <ArrowDown className='text-zinc-500' />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </th>

                                                                    <th className="px-1 py-2">Valor do Reembolso</th>
                                                                    <th className="px-1 py-2">Status do crédito</th>
                                                                    <th className="px-1 py-2">Status do reembolso</th>
                                                                    <th className="px-1 py-2">Ação</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {
                                                                    filteRedData?.map(item => (
                                          
                                                                            <tr
                                                                                className="bg-white text-font-color mt-4 border-t-1 cursor-pointer border-t-zinc-300 hover:bg-zinc-100"

                                                                                key={item.id}
                                                                            >
                                                                                <td className="px-2 py-4 text-center">2024-002</td>
                                                                                <td className="px-2 py-4 text-center">{item.plan[0].flat_name}</td>
                                                                                <td className="px-2 py-4 text-center">{item.installments.length}</td>
                                                                                <td className="px-2 py-4 text-center">
                                                                                    {item?.ammount
                                                                                        ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(Number(item.ammount))
                                                                                        : 'Valor inválido'}
                                                                                </td>
                                                                                <td className="px-2 py-4 text-center">
                                                                                    {item?.totalEffectiveCost
                                                                                        ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(item.totalEffectiveCost)
                                                                                        : 'Valor inválido'}
                                                                                </td>
                                                                                <td
                                                                                    className="px-2 py-4 text-center"
                                                                                    style={{
                                                                                        color: handleStatus(item.statu?.name as StatusEnum).color,
                                                                                        fontWeight: 'bold',
                                                                                    }}
                                                                                >
                                                                                    {handleStatus(item.statu?.name as StatusEnum).statusName}
                                                                                </td>
                                                                                <td className="px-2 py-4 text-center">Pendente</td>
                                                                                <td className="px-2 py-1 text-center">
                                                                                    <button
                                                                                        className="bg-green text-white p-2 rounded cursor-pointer"
                                                                                        onClick={() => navegate("/credit-request/personal", { state: { data: item } })}
                                                                                    >
                                                                                        Saber Mais
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        

                                                                    ))
                                                                }

                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div className='bg-white w-11/12  p-4 mt-2 flex justify-end md:w-full'>
                                                        <div className='flex items-center  justify-center'>
                                                            <button className='border p-2 border-zinc-400  rounded cursor-pointer text-font-color' onClick={() => {
                                                                if (page > 0) {
                                                                    setPage(page - 1)
                                                                }
                                                            }}>Anterior</button>
                                                            <div className='flex justify-center items-center'>
                                                                <input
                                                                    disabled
                                                                    type="text"
                                                                    className='border w-10 ml-4 p-1 text-center rounded border-zinc-400'
                                                                    value={Math.floor(total)}
                                                                />
                                                            </div>
                                                            <button className='border p-2 border-zinc-400  rounded ml-4 cursor-pointer text-font-color' onClick={() => {
                                                                if (page < total && page > 0) {
                                                                    setPage(page + 1)
                                                                }
                                                            }}>Proximo</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        butttonControl == 3 && (
                                            <div className='h-[760px] w-full'>
                                                <div className='border mt-4 border-zinc-300 p-3 bg-white  rounded'>
                                                    <div className='p-2 flex flex-col justify-center  items-center md:flex-row'>
                                                        <div className='flex flex-col items-center    p-2 md:flex md:flex-row md:w-8/12 lg:w-11/12 xl:w-8/12'>
                                                            <img
                                                                src={data.path_profile_photo ? data.path_profile_photo : images.avatarIcon}
                                                                alt="image-profile-user"
                                                                className="rounded-full border-2 border-green object-cover aspect-square
             w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32"
                                                            />
                                                            <div className='flex flex-col text-font-color ml-5'>
                                                                <h1 className='text-[20px]'>{data?.name}</h1>
                                                                <p>{data?.bi_number}</p>
                                                                <p>
                                                                    Data de Cadastro - {
                                                                        data.created_at ? new Date(String(data.created_at).split("T")[0]).toLocaleDateString('pt-BR') : "Data não disponível"
                                                                    }
                                                                </p>
                                                                {data?.status && (
                                                                    <p className='flex'>
                                                                        Status -{" "}
                                                                        <p style={{ color: handleStatusUser(data.status.name as statusUsers)?.color }}>
                                                                            {handleStatusUser(data.status.name as statusUsers)?.name}
                                                                        </p>
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className='w-1/2 flex justify-center md:justify-end'>
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
                                                </div>
                                                <div className='w-full bg-white mt-4 p-4 rounded    '>
                                                    <div className='w-full '>
                                                        <label className='flex text-font-color'>
                                                            Plano
                                                            <span className='text-red'>*</span>
                                                        </label>

                                                        <select name="plans" className=' text-font-color w-full p-2 outline-none border border-zinc-400 rounded' onChange={(e) => handleShowInstalments(e.target.value)}>
                                                            <option value="">Selecione um Plano</option>
                                                            {
                                                                dataPlans?.map((item: any) => (
                                                                    <option value={item.flat_name} key={item.flat_name} >{item.flat_name}</option>
                                                                ))
                                                            }

                                                        </select>
                                                    </div>
                                                    <div className='mt-5'>
                                                        <label className='flex text-font-color'>
                                                            Selecione o Metodo de Pagamento
                                                            <span className='text-red'>*</span>
                                                        </label>
                                                        <select name="plans" className=' text-font-color w-full p-2 outline-none border border-zinc-400 rounded' onChange={(e) => setMethodId(e.target.value)}>
                                                            <option value="">Selecione o Metodo de Pagamento</option>
                                                            {
                                                                methodData?.map((item: any) => (

                                                                    item.code != PaymentTypeCode.PAGAMENTO_REFERENCIA && (
                                                                        <option value={item.id} key={item.id} >{item.payment_type}</option>
                                                                    )

                                                                ))
                                                            }

                                                        </select>
                                                    </div>
                                                    <div className='w-full  mt-4'>
                                                        <label className='flex text-font-color'>
                                                            Parcela
                                                            <span className='text-red'>*</span>
                                                        </label>

                                                        <div className='flex  flex-wrap gap-2 w-full'>
                                                            {
                                                                installMentData?.map((item: any) => (
                                                                    <div className={`${InstalmentSelected.id == item.id ? " p-3  text-xl cursor-pointer text-center rounded ml-2 text-white bg-blue border border-green" : "p-3 text-zinc-500  text-xl cursor-pointer text-center rounded ml-2  border border-green"}`}
                                                                        onClick={() => {
                                                                            setInstallmentSelected(item)
                                                                        }}
                                                                        key={item.id}  >
                                                                        {item.installment_number}X
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>
                                                        <div className='mt-10'>
                                                            <h1 className='font-bold text-2xl text-center'>
                                                                {
                                                                    new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                                        .format(loanValue)
                                                                }
                                                            </h1>
                                                        </div>
                                                        <p className='text-zinc-500 text-center mt-5'>Escolhe até 4 parcelas (Pagamento Semanal em 30 dias )</p>
                                                        <div>
                                                            <div className='text-zinc-400 flex'>
                                                                <p className='text-[12px]'>Pretende Digitar o valor do emprestimo?</p>
                                                                <input
                                                                    type="checkbox"
                                                                    className='ml-2'
                                                                    onChange={() => setWriteValueOfLoan(!writeValueOfLoan)}
                                                                />
                                                            </div>
                                                            {
                                                                writeValueOfLoan == false && (
                                                                    <input
                                                                        onChange={(e: any) => handleAmmountOfLoan(e)}
                                                                        type="range"
                                                                        step={"500"}
                                                                        min={Number(planData?.[0]?.minimum_capital) || 0}
                                                                        max={Number(planData?.[0]?.maximum_capital) || 0}
                                                                        className="w-full h-2 bg-black rounded-lg p-4 appearance-auto cursor-pointer range-input"
                                                                    />

                                                                )
                                                            }

                                                            <div className='flex justify-between'>
                                                                <p className='font-bold'>
                                                                    {
                                                                        new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                                            .format(Number(planData?.[0]?.minimum_capital) || 0)
                                                                    }
                                                                </p>
                                                                <p className='font-bold'>
                                                                    {
                                                                        new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                                            .format(Number(planData?.[0]?.maximum_capital) || 0)
                                                                    }
                                                                    { } </p>
                                                            </div>
                                                            {
                                                                writeValueOfLoan && (
                                                                    <input
                                                                        disabled={loanValueControl}
                                                                        type="number"
                                                                        min={Number(planData?.[0]?.minimum_capital) || 0}
                                                                        max={Number(planData?.[0]?.maximum_capital) || 0}
                                                                        onChange={(e: any) => handleAmmountOfLoan(e)}
                                                                        placeholder="Digite um valor"
                                                                        className="w-full rounded p-3 outline-none border border-zinc-300"
                                                                    />
                                                                )
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className='w-full '>
                                                        <div className='w-full'>
                                                            <h1 className='text-font-color text-xl mt-4'>Resumo da Solicitação</h1>
                                                            <span className='text-font-color border-t-2 border-dashed mt-2'></span>
                                                        </div>
                                                        {
                                                            planResumeControl === true && (
                                                                <div>
                                                                    <div className="flex flex-col mt-3">
                                                                        <label className=' text-font-color font-semibold'>Plano</label>
                                                                        <span className='text-sm mt-2 text-font-color'>{planData[0]?.flat_name}</span>
                                                                        <span className='text-font-color border-t-2 border-dashed mt-2'></span>
                                                                    </div>
                                                                    <div className="flex flex-col mt-3">
                                                                        <label className=' text-font-color font-semibold'>parcelas a pagar</label>
                                                                        <span className='text-sm mt-2 text-font-color'>{InstalmentSelected?.installment_number}</span>
                                                                        <span className='text-font-color border-t-2 border-dashed mt-2'></span>
                                                                    </div>
                                                                    <div className="flex flex-col mt-3">
                                                                        <label className=' text-font-color font-semibold'>Total a Receber</label>
                                                                        <span className='text-sm mt-2 text-font-color'>
                                                                            {
                                                                                new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                                                    .format(loanValue)
                                                                            }
                                                                        </span>
                                                                        <span className='text-font-color border-t-2 border-dashed mt-2'></span>
                                                                    </div>
                                                                    <div className="flex flex-col mt-3">
                                                                        <label className=' text-font-color font-semibold'>Taxa de Juro</label>
                                                                        <span className='text-sm mt-2 text-font-color'> {planData[0]?.interest_rate} %</span>
                                                                        <span className='text-font-color border-t-2 border-dashed mt-2'></span>
                                                                    </div>
                                                                    <div className="flex flex-col mt-3">
                                                                        <label className=' text-font-color font-semibold'>Spread</label>
                                                                        <span className='text-sm mt-2 text-font-color'>{planData[0]?.spread} %</span>
                                                                        <span className='text-font-color border-t-2 border-dashed mt-2'></span>
                                                                    </div>
                                                                    <div className="flex flex-col mt-3">
                                                                        <label className=' text-font-color font-semibold'>Comissão de abertura de dossiê</label>
                                                                        <span className='text-sm mt-2 text-font-color'>{planData[0]?.commission} %</span>
                                                                        <span className='text-font-color border-t-2 border-dashed mt-2'></span>
                                                                    </div>
                                                                    <div className="flex flex-col mt-3">
                                                                        <label className=' text-font-color font-semibold'>Período de reembolso</label>
                                                                        <span className='text-sm mt-2 text-font-color'>{planData[0]?.refund_period} dias</span>
                                                                        <span className='text-font-color border-t-2 border-dashed mt-2'></span>

                                                                    </div>
                                                                    <div className="flex flex-col mt-3">
                                                                        <label className=' text-font-color font-semibold'>Juro de mora por cada dia de atraso</label>
                                                                        <span className='text-sm mt-2 text-font-color'>1%</span>
                                                                        <span className='text-font-color border-t-2 border-dashed mt-2'></span>

                                                                    </div>
                                                                    <div className="flex flex-col mt-3">
                                                                        <label className=' text-font-color font-semibold'>Total do Reembolso</label>
                                                                        <span className='text-sm mt-2 text-font-color'>
                                                                            {
                                                                                planData[0]?.interest_rate && loanValue
                                                                                    ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                                                        .format(Number(planData[0]?.interest_rate) * loanValue / 100 + Number(loanValue))
                                                                                    : 'Valor inválido'
                                                                            }
                                                                        </span>
                                                                        <span className='text-font-color border-t-2 border-dashed mt-2'></span>

                                                                    </div>
                                                                    <div>
                                                                        <button className='p-3 border-none bg-green text-white rounded mt-4 w-full ' onClick={() => handleCreditRquest()}>Solicitar Crédito</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    }


                                    {
                                        butttonControl == 4 && (
                                            <div className='h-[760px] w-full'>
                                                <div className='border mt-4 border-zinc-300 p-3 bg-white  rounded'>
                                                    <div className='p-2 flex flex-col justify-center  items-center md:flex-row'>
                                                        <div className='flex flex-col items-center    p-2 md:flex md:flex-row md:w-8/12 lg:w-11/12 xl:w-8/12'>
                                                            <img
                                                                src={images.avatarIcon}
                                                                alt="image-profile-user"
                                                                className='rounded-full w-20 border-green  md:w-30'
                                                            />
                                                            <div className='flex flex-col text-font-color ml-5'>
                                                                <h1 className='text-[20px]'>{data?.name}</h1>
                                                                <p>{data?.bi_number}</p>
                                                                <p>
                                                                    Data de Cadastro - {
                                                                        data.created_at ? new Date(String(data.created_at).split("T")[0]).toLocaleDateString('pt-BR') : "Data não disponível"
                                                                    }
                                                                </p>
                                                                {data?.status && (
                                                                    <p className='flex'>
                                                                        Status -{" "}
                                                                        <p style={{ color: handleStatusUser(data.status.name as statusUsers)?.color }}>
                                                                            {handleStatusUser(data.status.name as statusUsers)?.name}
                                                                        </p>
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className='w-1/2 flex justify-center md:justify-end'>
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
                                                </div>
                                                <div className='w-full bg-white mt-4 p-4 rounded    '>
                                                    {
                                                        cardControl == 0 && (
                                                            <div>
                                                                <h1 className='text-font-color text-xl mt-4'>Parcelas Pagas</h1>
                                                                <div

                                                                    className='border border-zinc-300 p-2 rounded flex justify-between items-center w-full mt-4'
                                                                >
                                                                    <div className='flex'>
                                                                        <img
                                                                            src={images.logo}
                                                                            alt="logo"
                                                                            className='border rounded-full border-green h-20 w-20'
                                                                        />
                                                                        <div className='ml-5'>
                                                                            <div className='flex flex-col justify-center itemr text-zinc-600 md:flex md:flex-col'>
                                                                                <p className='text-[20px]'>Parcela - 1</p>
                                                                                <p className='text-[15px] '>
                                                                                    Data de Término - {"20-04-2025"}
                                                                                </p>
                                                                            </div>
                                                                            <div>
                                                                                <p className='text-[16px] text-zinc-500 font-semibold mt-2'>
                                                                                    Total a Pagar - {
                                                                                        new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(545445)
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <img src={images.PaidIcon} alt="paid-icon" className='w-10 h-10' />
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                    {
                                                        cardControl == 0 && (
                                                            <div className='w-full'>
                                                                <div className='w-full'>
                                                                    <h1 className='text-font-color text-xl mt-4'>Parcelas Por Pagar</h1>

                                                                    {data?.creditRequestProcessed?.installments?.map((item: any, i: number) => (
                                                                        <div
                                                                            key={item.id}
                                                                            className='border border-zinc-300 p-2 rounded flex justify-between items-center w-full mt-4'
                                                                        >
                                                                            <div className='flex'>
                                                                                <img
                                                                                    src={images.logo}
                                                                                    alt="logo"
                                                                                    className='border rounded-full border-green h-20 w-20'
                                                                                />
                                                                                <div className='ml-5'>
                                                                                    <div className='flex flex-col justify-center itemr text-zinc-600 md:flex md:flex-col'>
                                                                                        <p className='text-[20px]'>Parcela - {i + 1}</p>
                                                                                        <p className='text-[15px] '>
                                                                                            Data de Término - {item?.end_at?.split(" ")[0] ?? ""}
                                                                                        </p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className='text-[16px] text-zinc-500 font-semibold mt-2'>
                                                                                            Total a Pagar - {item.installment_value
                                                                                                ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(item.installment_value)
                                                                                                : 'Valor inválido'}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div>
                                                                                {
                                                                                    (Math.ceil(
                                                                                        (new Date(item.end_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                                                                                    ) === 1) ? (
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            checked={selectedInstallments.includes(item.id)}
                                                                                            onChange={(e) => handleChangeValue(item.id, item.installment_value, e.target.checked, i + 1)}
                                                                                            className="w-10 h-10 appearance-none rounded-full border-2 border-green checked:bg-blue checked:border-green cursor-pointer"
                                                                                        />
                                                                                    ) : data?.creditRequestProcessed?.installments.length == selectedInstallments.length ?
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            checked={selectedInstallments.includes(item.id)}
                                                                                            onChange={(e) => handleChangeValue(item.id, item.installment_value, e.target.checked, i + 1)}
                                                                                            className="w-10 h-10 appearance-none rounded-full border-2 border-green checked:bg-blue checked:border-green cursor-pointer"
                                                                                        /> : <img src={images.LockIcon} alt="icon-lock" className='w-10 h-10' />
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    ))}

                                                                    <div className='flex justify-between mt-2'>
                                                                        {
                                                                            (data.creditRequestProcessed?.installments ?? []).length > 1 && (
                                                                                <div className='flex items-center'>
                                                                                    <label htmlFor='select_all' className='text-xl text-zinc-700 cursor-pointer font-bold'>
                                                                                        Selecionar Todas
                                                                                    </label>
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id='select_all'
                                                                                        onChange={(e) => handleSelectAllInstament(e.target.checked)}
                                                                                        className="ml-2 w-10 h-10 appearance-none rounded-full border-2 border-green checked:bg-blue checked:border-green cursor-pointer"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }

                                                                        <button className='bg-green text-white p-3 rounded w-40 cursor-pointer mt-2' onClick={() => {
                                                                            if (selectedInstallments.length > 0) {
                                                                                setCardControl(1);
                                                                                return;
                                                                            }
                                                                            showSweetAlert({
                                                                                title: "Erro ao Proceguir",
                                                                                text: "Selecione Pelomenos uma Percela para avençar",
                                                                                icon: "warning",

                                                                            })
                                                                        }}>Avançar</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                </div>
                                                {
                                                    cardControl == 1 && (
                                                        <div className=' w-full md:w-full xl:w-full'>
                                                            <div className='w-full'>
                                                                <div className='bg-white p-10'>
                                                                    <label className='flex text-font-color'>
                                                                        Selecione o Metodo de Pagamento
                                                                        <span className='text-red'>*</span>
                                                                    </label>
                                                                    <select name="plans" className=' mt-2 text-font-color w-full p-2 outline-none border border-zinc-400 rounded'>
                                                                        <option value="">Selecione o Metodo de Pagamento</option>
                                                                        {
                                                                            methodData?.map((item: any) => (

                                                                                item.code != PaymentTypeCode.PAGAMENTO_REFERENCIA && (
                                                                                    <option value={item.id} key={item.id} >{item.payment_type}</option>
                                                                                )

                                                                            ))
                                                                        }

                                                                    </select>
                                                                    <p className='mt-5'>  <span className='text-red'>*</span> Anexar Comprovativo(*pdf)</p>
                                                                    <div {...getRootProps()} className="border border-dashed border-zinc-400 p-10 mt-3">
                                                                        <input {...getInputProps()} className="hidden" accept="application/pdf" />
                                                                        <div className="flex flex-col justify-center items-center">
                                                                            {isDragActive ? (
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    fill="none"
                                                                                    viewBox="0 0 24 24"
                                                                                    strokeWidth={1.5}
                                                                                    stroke="currentColor"
                                                                                    className="w-8 h-8 text-gray-600"
                                                                                >
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        d="M12 10v6m3-3H9m6.75-11.25H6.75A2.25 2.25 0 004.5 4.5v15A2.25 2.25 0 006.75 21h10.5a2.25 2.25 0 002.25-2.25V9L15.75 2.25z"
                                                                                    />
                                                                                </svg>
                                                                            ) : (
                                                                                <>
                                                                                    <img src={images.UploudIcon} alt="upload" />
                                                                                    <p>
                                                                                        Arraste  o Arquivo aqui ou <span className="font-bold">escolha nos seus ficheiros</span>
                                                                                    </p>
                                                                                </>
                                                                            )}
                                                                            {imageOfPdf && <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png' alt="preview" className="w-20 mt-4" />}
                                                                        </div>
                                                                    </div>

                                                                    {
                                                                        selectedInstallments.length == data.creditRequestProcessed?.installments.length && (data.creditRequestProcessed?.installments ?? []).length > 1 && (
                                                                            <div>
                                                                                <p className='mt-5'>  <span className='text-red'>*</span> Motivo do Pagamento de todas as Pareclas(*pdf)</p>
                                                                                <div className="border border-dashed border-zinc-400 p-10 mt-3">

                                                                                    <div className="flex flex-col justify-center items-center space-y-2">
                                                                                        <img
                                                                                            src={images.UploudIcon}
                                                                                            alt="Ícone de upload"
                                                                                            className="w-10 h-10"
                                                                                        />

                                                                                        <label htmlFor="file-reason" className="cursor-pointer text-center">

                                                                                            <span className="font-bold ">escolha nos seus ficheiros</span>
                                                                                        </label>

                                                                                        <input
                                                                                            type="file"
                                                                                            id="file-reason"
                                                                                            className="hidden"
                                                                                            accept='application/pdf'
                                                                                            ref={uploudReasonFileRef}
                                                                                            onChange={() => setHasfile(true)}
                                                                                        />
                                                                                    </div>
                                                                                    <div className='flex justify-center'>
                                                                                        {hasFile && <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png' alt="preview" className="w-20 mt-4" />}
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    <div>
                                                                        <p className='mt-4 text-xl font-semibold text-zinc-500'>
                                                                            Resumo do Reembolso
                                                                        </p>

                                                                        <div className='flex  justify-between items-center   border-t  border-dashed mt-4 border-t-zinc-500'>
                                                                            <p className='mt-3 text-zinc-600'>Quantidade de Parcelas</p>
                                                                            <p className='mt-3'>{ammountOfReimbursement.number}</p>
                                                                        </div>
                                                                        <div className='flex  justify-between items-center   border-t  border-dashed mt-4 border-t-zinc-500'>
                                                                            <p className='mt-3 text-zinc-600'>Total a Pagar</p>
                                                                            <p className='mt-3'>
                                                                                {ammountOfReimbursement?.value
                                                                                    ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(ammountOfReimbursement.value)
                                                                                    : 'Valor inválido'}
                                                                            </p>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className='flex justify-end mt-2   '>
                                                                <button className='text-green border p-2 rounded mr-2 cursor-pointer' onClick={() => { setCardControl(0) }}>Voltar</button>
                                                                <button className=' bg-green text-white rounded  p-2 cursor-pointer' onClick={() => handleSubmit()}>Finalizar</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                                {
                                    loaderControl && (
                                        <LoaderComponent />
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
    )
}
