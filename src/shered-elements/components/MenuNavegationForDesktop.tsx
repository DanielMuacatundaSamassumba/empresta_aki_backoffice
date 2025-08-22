
import { images } from "../constents/Images";
import { Link, useLocation } from "react-router-dom";
import type { ModalElementsType } from "@/modules/dashboard/types/ModalElemetsType";
import { typeOfUser } from "../types/TypesOfUser";
export default function MenuNavegationForDesktop(params: ModalElementsType) {
    const location = useLocation()
    const dataUserAuth = JSON.parse(localStorage.getItem("dataUser") || "{}")
    const { menuIsOpened, setMenuIsOpened } = params

    return (
        <div className="h-screen
        flex flex-col justify-between
        ">
            <div className="flex flex-col justify-evily">
                <div className={menuIsOpened ? `flex flex-col-reverse items-center justify-center border-b-1 mt-5 border-zinc-300 w-full p-2 ` : `flex flex-row items-center justify-between border-b-1 mt-5 border-zinc-300 w-full p-2 `}>
                    <div className="flex flex-row  justify-center items-center mt-2 ">
                        <img src={images.logo}
                            className={
                                menuIsOpened ? "w-12" : "w-16"
                            }

                        />

                        {
                            menuIsOpened ? (
                                ""
                            ) : (
                                <h1
                                    className=" text-xl font-bold text-blue   lg:-ml-2 dark:text-white"
                                >EmprestaAki { }
                                </h1>
                            )
                        }
                    </div>
                    {
                        menuIsOpened ? (
                            <div className="">
                                <img src={images.arrowMenuIcon}
                                    className="w-5   cursor-pointer rotate-180"
                                    onClick={() => setMenuIsOpened(!menuIsOpened)}
                                />
                            </div>
                        ) : (
                            <div className="">
                                <img src={images.arrowMenuIcon}
                                    className="w-5   cursor-pointer"
                                    onClick={() => setMenuIsOpened(!menuIsOpened)}
                                />
                            </div>
                        )
                    }
                </div>
                {
                    dataUserAuth?.roles[0] == typeOfUser.SUPER_ADMIN && (
                        <div className='  flex flex-col justify-center  mt-5 '>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center cursor-pointer' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname == "/dashboard" ? (
                                        <span className='bg-green h-8 w-[5px]'></span>
                                    ) : ""
                                }
                                <Link to={"/dashboard"}>

                                    <img
                                        src={images.dashboardIcon}
                                        alt="dashboard-icon"
                                        className='w-8 h-8 ml-2'
                                    />
                                </Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link to={"/dashboard"}
                                            className={location.pathname === "/dashboard" ?
                                                "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Dashboard</Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2 relative' : 'flex items-center p-2 justify-center  w-47 cursor-pointer  relative  '}>                        {
                                location.pathname === "/customer" || location.pathname === "/customer/create" ? (
                                    <span className='bg-green h-8 w-1'></span>
                                ) : ""
                            }
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <img
                                            src={images.userAppIcon}
                                            alt="dashboard-icon"
                                            className="w-8 h-8 ml-2 cursor-pointer"
                                        />
                                    )
                                }
                                {
                                    menuIsOpened && (
                                        <div className="relative group  flex justify-center w-11/12">
                                            <Link to={"/customer"}>
                                                <img
                                                    src={images.userAppIcon}
                                                    alt="dashboard-icon"
                                                    className="w-8 h-8 ml-2 cursor-pointer"
                                                />
                                            </Link>


                                        </div>
                                    )
                                }

                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <div className='flex flex-row relative '>
                                            <h1
                                                className={location.pathname === "/customer" ?
                                                    " text-blue text-xl font-semibold  dark:text-white" :
                                                    "text-font-color text-[17px] font-medium dark:text-white"}
                                            >
                                                <Link to={"/customer"}>Clintes</Link>
                                            </h1>
                                        </div>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2 relative' : 'flex items-center p-2 justify-center  w-47 cursor-pointer  relative  '}>                        {
                                location.pathname === "/maneger" ? (
                                    <span className='bg-green h-8 w-1 ml-2'></span>
                                ) : ""
                            }
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <img
                                            src={images.usersBackoffice}
                                            alt="dashboard-icon"
                                            className="w-8 h-8 ml-2 cursor-pointer"
                                        />
                                    )
                                }
                                {
                                    menuIsOpened && (
                                        <div className="relative group  flex justify-center w-11/12">
                                            <Link to={"/maneger"}>
                                                <img
                                                    src={images.usersBackoffice}
                                                    alt="dashboard-icon"
                                                    className="w-8 h-8 ml-2 cursor-pointer"
                                                />
                                            </Link>


                                        </div>
                                    )
                                }

                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <div className='flex flex-row relative '>
                                            <h1
                                                className={location.pathname === "/maneger" ?
                                                    " text-blue text-xl font-medium  dark:text-white" :
                                                    "text-font-color text-[17px] font-medium dark:text-white"}
                                            >
                                                <Link to={"/maneger"}>Usuarios</Link>
                                            </h1>
                                        </div>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2 relative' : 'flex items-center p-2 justify-center  w-47 cursor-pointer  relative  '}>                        {
                                location.pathname === "/banks" || location.pathname === "/banks/create" ? (
                                    <span className='bg-green h-8 w-1 ml-2'></span>
                                ) : ""
                            }
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <img
                                            src={images.bankIcon}
                                            alt="dashboard-icon"
                                            className="w-7 h-7 ml-2 cursor-pointer"
                                        />
                                    )
                                }
                                {
                                    menuIsOpened && (
                                        <div className="relative group  flex justify-center w-11/12">
                                            <Link to={"#"}>
                                                <img
                                                    src={images.bankIcon}
                                                    alt="dashboard-icon"
                                                    className="w-7 h-7 ml-2 cursor-pointer"
                                                />
                                            </Link>


                                        </div>
                                    )
                                }

                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <div className='flex flex-row relative '>
                                            <h1
                                                className={location.pathname === "/banks" ?
                                                    " text-blue text-xl font-medium  dark:text-white" :
                                                    "text-font-color text-[17px] font-medium dark:text-white"}
                                            >
                                                <Link to={"/banks"} className="ml-1">Bancos</Link>
                                            </h1>
                                        </div>
                                    )
                                }


                            </div>

                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2 relative' : 'flex items-center p-2 justify-center  w-47 cursor-pointer  relative  ml-2'}>                        {
                                location.pathname === "/profissions" || location.pathname === "/profissions/create" ? (
                                    <span className='bg-green h-8 w-1 ml-2'></span>
                                ) : ""
                            }
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <img
                                            src={images.ProfissionsIcon}
                                            alt="dashboard-icon"
                                            className="w-7 h-7 ml-2 cursor-pointer"
                                        />
                                    )
                                }
                                {
                                    menuIsOpened && (
                                        <div className="relative group  flex justify-center w-11/12">
                                            <Link to={"/profissions"}>
                                                <img
                                                    src={images.ProfissionsIcon}
                                                    alt="dashboard-icon"
                                                    className="w-7 h-7 ml-2 cursor-pointer"
                                                />
                                            </Link>


                                        </div>
                                    )
                                }

                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <div className='flex flex-row relative '>
                                            <h1
                                                className={location.pathname === "#" ?
                                                    " text-blue text-xl font-medium  dark:text-white" :
                                                    "text-font-color text-[17px] font-medium dark:text-white"}
                                            >
                                                <Link to={"/profissions"} className="ml-1">Profissões</Link>
                                            </h1>
                                        </div>
                                    )
                                }


                            </div>

                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2' : 'flex items-center p-2 justify-center  w-45 cursor-pointer    '}>
                                {
                                    location.pathname === "/plan" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <Link to={"/plan"}>
                                    <img
                                        src={images.planIcon}
                                        alt="dashboard-icon"
                                        className='w-8 h-8 ml-2'
                                    />
                                </Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <h1
                                            className={location.pathname === "/plan" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >
                                            <Link to={"/plan"}>Planos</Link>
                                        </h1>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2  justify-center' : 'flex items-center p-2 justify-center  w-40 cursor-pointer    '}>                             {
                                location.pathname == "/blog" || location.pathname == "/blog/create" ? (
                                    <span className='bg-green h-8 w-1'></span>
                                ) : ""
                            }
                                <img
                                    src={images.blogIcon}
                                    alt="dashboard-icon"
                                    className='w-8 h-8 ml-2'
                                />
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link
                                            to={"/blog"} className={location.pathname === "/blog" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Blog</Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2' : 'flex items-center p-2  w- cursor-pointer  ml-8 '}>
                                {
                                    location.pathname === "/credit-request" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <Link to={'/credit-request'}>
                                    <img
                                        src={images.requestCreditIcon}
                                        alt="dashboard-icon"
                                        className='w-8 h-8 ml-2'
                                    /></Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link to={"/credit-request"}> <h1
                                            className={location.pathname === "/credit-request" ? "text-blue text-xl font-semibold cursor-pointer" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}>Solicitação de Crédito</h1></Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2 justify-center -ml-2' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname === "/payment" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <Link
                                    to={"/payment"}
                                >
                                    <img
                                        src={images.paymentIcon}
                                        alt="dashboard-icon"
                                        className='w-12 h-8 ml-2'
                                    /></Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link
                                            to={"/payment"}
                                            className={location.pathname === "/payment" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Pagamentos</Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2 justify-center -ml-2' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname === "/reimbursement" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <Link to={"/reimbursement"}>
                                    <img
                                        src={images.RestituicaoIcon}
                                        alt="dashboard-icon"
                                        className='w-10 h-10 ml-2'
                                    />
                                </Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link
                                            to={"/reimbursement"}
                                            className={location.pathname === "/reimbursement" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white ml-1" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white  ml-1"}
                                        >Reembolso</Link>
                                    )
                                }


                            </div>

                        </div>
                    )
                }
                {
                    dataUserAuth?.roles[0] == typeOfUser.FINANCIAL_MANEGER && (
                        <div className='  flex flex-col justify-center  mt-5 '>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center cursor-pointer' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname == "/dashboard" ? (
                                        <span className='bg-green h-8 w-[5px]'></span>
                                    ) : ""
                                }
                                <Link to={"/dashboard"}>

                                    <img
                                        src={images.dashboardIcon}
                                        alt="dashboard-icon"
                                        className='w-8 h-8 ml-2'
                                    />
                                </Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link to={"/dashboard"}
                                            className={location.pathname === "/dashboard" ?
                                                "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Dashboard</Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2 relative' : 'flex items-center p-2 justify-center  w-47 cursor-pointer  relative  '}>                        {
                                location.pathname === "/customer" || location.pathname === "/customer/create" ? (
                                    <span className='bg-green h-8 w-1'></span>
                                ) : ""
                            }
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <img
                                            src={images.userAppIcon}
                                            alt="dashboard-icon"
                                            className="w-8 h-8 ml-2 cursor-pointer"
                                        />
                                    )
                                }
                                {
                                    menuIsOpened && (
                                        <div className="relative group  flex justify-center w-11/12">
                                            <Link to={"/customer"}>
                                                <img
                                                    src={images.userAppIcon}
                                                    alt="dashboard-icon"
                                                    className="w-8 h-8 ml-2 cursor-pointer"
                                                />
                                            </Link>


                                        </div>
                                    )
                                }

                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <div className='flex flex-row relative '>
                                            <h1
                                                className={location.pathname === "/customer" ?
                                                    " text-blue text-xl font-semibold  dark:text-white" :
                                                    "text-font-color text-[17px] font-medium dark:text-white"}
                                            >
                                                <Link to={"/customer"}>Clintes</Link>
                                            </h1>
                                        </div>
                                    )
                                }


                            </div>

                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2 relative' : 'flex items-center p-2 justify-center  w-47 cursor-pointer  relative  '}>                        {
                                location.pathname === "/banks" || location.pathname === "/banks/create" ? (
                                    <span className='bg-green h-8 w-1 ml-2'></span>
                                ) : ""
                            }
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <img
                                            src={images.bankIcon}
                                            alt="dashboard-icon"
                                            className="w-7 h-7 ml-2 cursor-pointer"
                                        />
                                    )
                                }
                                {
                                    menuIsOpened && (
                                        <div className="relative group  flex justify-center w-11/12">
                                            <Link to={"#"}>
                                                <img
                                                    src={images.bankIcon}
                                                    alt="dashboard-icon"
                                                    className="w-7 h-7 ml-2 cursor-pointer"
                                                />
                                            </Link>


                                        </div>
                                    )
                                }

                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <div className='flex flex-row relative '>
                                            <h1
                                                className={location.pathname === "/banks" ?
                                                    " text-blue text-xl font-medium  dark:text-white" :
                                                    "text-font-color text-[17px] font-medium dark:text-white"}
                                            >
                                                <Link to={"/banks"} className="ml-1">Bancos</Link>
                                            </h1>
                                        </div>
                                    )
                                }


                            </div>



                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2' : 'flex items-center p-2 justify-center  w-45 cursor-pointer    '}>
                                {
                                    location.pathname === "/plan" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <Link to={"/plan"}>
                                    <img
                                        src={images.planIcon}
                                        alt="dashboard-icon"
                                        className='w-8 h-8 ml-2'
                                    />
                                </Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <h1
                                            className={location.pathname === "/plan" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >
                                            <Link to={"/plan"}>Planos</Link>
                                        </h1>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2  justify-center' : 'flex items-center p-2 justify-center  w-40 cursor-pointer    '}>                             {
                                location.pathname == "/blog" || location.pathname == "/blog/create" ? (
                                    <span className='bg-green h-8 w-1'></span>
                                ) : ""
                            }
                                <img
                                    src={images.blogIcon}
                                    alt="dashboard-icon"
                                    className='w-8 h-8 ml-2'
                                />
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link
                                            to={"/blog"} className={location.pathname === "/blog" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Blog</Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2' : 'flex items-center p-2  w- cursor-pointer  ml-8 '}>
                                {
                                    location.pathname === "/credit-request" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <Link to={'/credit-request'}>
                                    <img
                                        src={images.requestCreditIcon}
                                        alt="dashboard-icon"
                                        className='w-8 h-8 ml-2'
                                    /></Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link to={"/credit-request"}> <h1
                                            className={location.pathname === "/credit-request" ? "text-blue text-xl font-semibold cursor-pointer" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}>Solicitação de Crédito</h1></Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2 justify-center -ml-2' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname === "/" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <img
                                    src={images.paymentIcon}
                                    alt="dashboard-icon"
                                    className='w-12 h-8 ml-2'
                                />
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <h1
                                            className={location.pathname === "/" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Pagamentos</h1>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2 justify-center -ml-2' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname === "/" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <img
                                    src={images.RestituicaoIcon}
                                    alt="dashboard-icon"
                                    className='w-10 h-10 ml-2'
                                />
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <h1
                                            className={location.pathname === "/" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white ml-1" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white  ml-1"}
                                        >Reembolso</h1>
                                    )
                                }


                            </div>

                        </div>
                    )
                }
                {
                    dataUserAuth?.roles[0] == typeOfUser.CREDIT_ANALIST && (
                        <div className='  flex flex-col justify-center  mt-5 '>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center cursor-pointer' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname == "/dashboard" ? (
                                        <span className='bg-green h-8 w-[5px]'></span>
                                    ) : ""
                                }
                                <Link to={"/dashboard"}>

                                    <img
                                        src={images.dashboardIcon}
                                        alt="dashboard-icon"
                                        className='w-8 h-8 ml-2'
                                    />
                                </Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link to={"/dashboard"}
                                            className={location.pathname === "/dashboard" ?
                                                "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Dashboard</Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2 relative' : 'flex items-center p-2 justify-center  w-47 cursor-pointer  relative  '}>                        {
                                location.pathname === "/customer" || location.pathname === "/customer/create" ? (
                                    <span className='bg-green h-8 w-1'></span>
                                ) : ""
                            }
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <img
                                            src={images.userAppIcon}
                                            alt="dashboard-icon"
                                            className="w-8 h-8 ml-2 cursor-pointer"
                                        />
                                    )
                                }
                                {
                                    menuIsOpened && (
                                        <div className="relative group  flex justify-center w-11/12">
                                            <Link to={"/customer"}>
                                                <img
                                                    src={images.userAppIcon}
                                                    alt="dashboard-icon"
                                                    className="w-8 h-8 ml-2 cursor-pointer"
                                                />
                                            </Link>


                                        </div>
                                    )
                                }

                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <div className='flex flex-row relative '>
                                            <h1
                                                className={location.pathname === "/customer" ?
                                                    " text-blue text-xl font-semibold  dark:text-white" :
                                                    "text-font-color text-[17px] font-medium dark:text-white"}
                                            >
                                                <Link to={"/customer"}>Clintes</Link>
                                            </h1>
                                        </div>
                                    )
                                }


                            </div>

                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2 relative' : 'flex items-center p-2 justify-center  w-47 cursor-pointer  relative  '}>                        {
                                location.pathname === "/banks" || location.pathname === "/banks/create" ? (
                                    <span className='bg-green h-8 w-1 ml-2'></span>
                                ) : ""
                            }
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <img
                                            src={images.bankIcon}
                                            alt="dashboard-icon"
                                            className="w-7 h-7 ml-2 cursor-pointer"
                                        />
                                    )
                                }
                                {
                                    menuIsOpened && (
                                        <div className="relative group  flex justify-center w-11/12">
                                            <Link to={"#"}>
                                                <img
                                                    src={images.bankIcon}
                                                    alt="dashboard-icon"
                                                    className="w-7 h-7 ml-2 cursor-pointer"
                                                />
                                            </Link>


                                        </div>
                                    )
                                }

                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <div className='flex flex-row relative '>
                                            <h1
                                                className={location.pathname === "/banks" ?
                                                    " text-blue text-xl font-medium  dark:text-white" :
                                                    "text-font-color text-[17px] font-medium dark:text-white"}
                                            >
                                                <Link to={"/banks"} className="ml-1">Bancos</Link>
                                            </h1>
                                        </div>
                                    )
                                }


                            </div>


                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2' : 'flex items-center p-2 justify-center  w-45 cursor-pointer    '}>
                                {
                                    location.pathname === "/plan" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <Link to={"/plan"}>
                                    <img
                                        src={images.planIcon}
                                        alt="dashboard-icon"
                                        className='w-8 h-8 ml-2'
                                    />
                                </Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <h1
                                            className={location.pathname === "/plan" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >
                                            <Link to={"/plan"}>Planos</Link>
                                        </h1>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2  justify-center' : 'flex items-center p-2 justify-center  w-40 cursor-pointer    '}>                             {
                                location.pathname == "/blog" || location.pathname == "/blog/create" ? (
                                    <span className='bg-green h-8 w-1'></span>
                                ) : ""
                            }
                                <img
                                    src={images.blogIcon}
                                    alt="dashboard-icon"
                                    className='w-8 h-8 ml-2'
                                />
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link
                                            to={"/blog"} className={location.pathname === "/blog" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Blog</Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2' : 'flex items-center p-2  w- cursor-pointer  ml-8 '}>
                                {
                                    location.pathname === "/credit-request" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <Link to={'/credit-request'}>
                                    <img
                                        src={images.requestCreditIcon}
                                        alt="dashboard-icon"
                                        className='w-8 h-8 ml-2'
                                    /></Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link to={"/credit-request"}> <h1
                                            className={location.pathname === "/credit-request" ? "text-blue text-xl font-semibold cursor-pointer" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}>Solicitação de Crédito</h1></Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2 justify-center -ml-2' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname === "/" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <img
                                    src={images.paymentIcon}
                                    alt="dashboard-icon"
                                    className='w-12 h-8 ml-2'
                                />
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <h1
                                            className={location.pathname === "/" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Pagamentos</h1>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2 justify-center -ml-2' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname === "/" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <img
                                    src={images.RestituicaoIcon}
                                    alt="dashboard-icon"
                                    className='w-10 h-10 ml-2'
                                />
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <h1
                                            className={location.pathname === "/" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white ml-1" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white  ml-1"}
                                        >Reembolso</h1>
                                    )
                                }


                            </div>

                        </div>
                    )
                }
                {
                    dataUserAuth?.roles[0] == typeOfUser.ADMIN && (
                        <div className='  flex flex-col justify-center  mt-5 '>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center cursor-pointer' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname == "/dashboard" ? (
                                        <span className='bg-green h-8 w-[5px]'></span>
                                    ) : ""
                                }
                                <Link to={"/dashboard"}>

                                    <img
                                        src={images.dashboardIcon}
                                        alt="dashboard-icon"
                                        className='w-8 h-8 ml-2'
                                    />
                                </Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link to={"/dashboard"}
                                            className={location.pathname === "/dashboard" ?
                                                "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Dashboard</Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2 relative' : 'flex items-center p-2 justify-center  w-47 cursor-pointer  relative  '}>                        {
                                location.pathname === "/customer" ? (
                                    <span className='bg-green h-8 w-1'></span>
                                ) : ""
                            }
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <img
                                            src={images.userAppIcon}
                                            alt="dashboard-icon"
                                            className="w-8 h-8 ml-2 cursor-pointer"
                                        />
                                    )
                                }
                                {
                                    menuIsOpened && (
                                        <div className="relative group  flex justify-center w-11/12">
                                            <Link to={"/customer"}>
                                                <img
                                                    src={images.userAppIcon}
                                                    alt="dashboard-icon"
                                                    className="w-8 h-8 ml-2 cursor-pointer"
                                                />
                                            </Link>


                                        </div>
                                    )
                                }

                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <div className='flex flex-row relative '>
                                            <h1
                                                className={location.pathname === "/customer" ?
                                                    " text-blue text-xl font-semibold  dark:text-white" :
                                                    "text-font-color text-[17px] font-medium dark:text-white"}
                                            >
                                                <Link to={"/customer"}>Clintes</Link>
                                            </h1>
                                        </div>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2 relative' : 'flex items-center p-2 justify-center  w-47 cursor-pointer  relative  '}>                        {
                                location.pathname === "/maneger" ? (
                                    <span className='bg-green h-8 w-1 ml-2'></span>
                                ) : ""
                            }
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <img
                                            src={images.usersBackoffice}
                                            alt="dashboard-icon"
                                            className="w-8 h-8 ml-2 cursor-pointer"
                                        />
                                    )
                                }
                                {
                                    menuIsOpened && (
                                        <div className="relative group  flex justify-center w-11/12">
                                            <Link to={"/maneger"}>
                                                <img
                                                    src={images.usersBackoffice}
                                                    alt="dashboard-icon"
                                                    className="w-8 h-8 ml-2 cursor-pointer"
                                                />
                                            </Link>


                                        </div>
                                    )
                                }

                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <div className='flex flex-row relative '>
                                            <h1
                                                className={location.pathname === "/maneger" ?
                                                    " text-blue text-xl font-medium  dark:text-white" :
                                                    "text-font-color text-[17px] font-medium dark:text-white"}
                                            >
                                                <Link to={"/maneger"}>Usuarios</Link>
                                            </h1>
                                        </div>
                                    )
                                }


                            </div>

                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2' : 'flex items-center p-2 justify-center  w-45 cursor-pointer    '}>
                                {
                                    location.pathname === "/plan" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <Link to={"/plan"}>
                                    <img
                                        src={images.planIcon}
                                        alt="dashboard-icon"
                                        className='w-8 h-8 ml-2'
                                    />
                                </Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <h1
                                            className={location.pathname === "/plan" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >
                                            <Link to={"/plan"}>Planos</Link>
                                        </h1>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2  justify-center' : 'flex items-center p-2 justify-center  w-40 cursor-pointer    '}>                             {
                                location.pathname === "/" ? (
                                    <span className='bg-green h-8 w-1'></span>
                                ) : ""
                            }
                                <img
                                    src={images.blogIcon}
                                    alt="dashboard-icon"
                                    className='w-8 h-8 ml-2'
                                />
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <h1
                                            className={location.pathname === "/" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Blog</h1>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2 justify-center -ml-2' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname === "/" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <img
                                    src={images.paymentIcon}
                                    alt="dashboard-icon"
                                    className='w-12 h-8 ml-2'
                                />
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <h1
                                            className={location.pathname === "/" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Pagamentos</h1>
                                    )
                                }


                            </div>

                        </div>
                    )
                }
                {
                    dataUserAuth?.roles[0] == typeOfUser.TALLER && (
                        <div className='  flex flex-col justify-center  mt-5 '>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center cursor-pointer' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname == "/dashboard" ? (
                                        <span className='bg-green h-8 w-[5px]'></span>
                                    ) : ""
                                }
                                <Link to={"/dashboard"}>

                                    <img
                                        src={images.dashboardIcon}
                                        alt="dashboard-icon"
                                        className='w-8 h-8 ml-2'
                                    />
                                </Link>
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link to={"/dashboard"}
                                            className={location.pathname === "/dashboard" ?
                                                "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Dashboard</Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center justify-center mt-2 relative' : 'flex items-center p-2 justify-center  w-47 cursor-pointer  relative  '}>                        {
                                location.pathname == "/customer" || location.pathname == "/customer/create" || location.pathname == "/customer/update" ? (
                                    <span className='bg-green h-8 w-1'></span>
                                ) : ""
                            }
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <img
                                            src={images.userAppIcon}
                                            alt="dashboard-icon"
                                            className="w-8 h-8 ml-2 cursor-pointer"
                                        />
                                    )
                                }
                                {
                                    menuIsOpened && (
                                        <div className="relative group  flex justify-center w-11/12">
                                            <Link to={"/customer"}>
                                                <img
                                                    src={images.userAppIcon}
                                                    alt="dashboard-icon"
                                                    className="w-8 h-8 ml-2 cursor-pointer"
                                                />
                                            </Link>


                                        </div>
                                    )
                                }

                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <div className='flex flex-row relative '>
                                            <h1
                                                className={location.pathname === "/customer" ?
                                                    " text-blue text-xl font-semibold  dark:text-white" :
                                                    "text-font-color text-[17px] font-medium dark:text-white"}
                                            >
                                                <Link to={"/customer"}>Clintes</Link>
                                            </h1>
                                        </div>
                                    )
                                }


                            </div>



                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2  justify-center' : 'flex items-center p-2 justify-center  w-40 cursor-pointer    '}>                             {
                                location.pathname === "/blog" || location.pathname === "/blog/create" || location.pathname === "/blog/update" ? (
                                    <span className='bg-green h-8 w-1'></span>
                                ) : ""
                            }
                                <img
                                    src={images.blogIcon}
                                    alt="dashboard-icon"
                                    className='w-8 h-8 ml-2'
                                />
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <Link to={"/blog"}
                                            className={location.pathname === "/blog" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Blog</Link>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2 justify-center -ml-2' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname === "/" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <img
                                    src={images.paymentIcon}
                                    alt="dashboard-icon"
                                    className='w-12 h-8 ml-2'
                                />
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <h1
                                            className={location.pathname === "/" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white"}
                                        >Pagamentos</h1>
                                    )
                                }


                            </div>
                            <div className={menuIsOpened ? 'flex flex-row items-center mt-2 justify-center -ml-2' : 'flex items-center p-2  w-56 cursor-pointer justify-center'}>
                                {
                                    location.pathname === "/" ? (
                                        <span className='bg-green h-8 w-1'></span>
                                    ) : ""
                                }
                                <img
                                    src={images.RestituicaoIcon}
                                    alt="dashboard-icon"
                                    className='w-8 h-8 ml-2'
                                />
                                {
                                    menuIsOpened ? (
                                        ""
                                    ) : (
                                        <h1
                                            className={location.pathname === "/" ? "text-blue text-xl font-semibold cursor-pointer dark:text-white ml-1" : "text-font-color text-[18px] font-normal cursor-pointer dark:text-white ml-1"}
                                        >Reembolso</h1>
                                    )
                                }


                            </div>

                        </div>
                    )
                }
            </div>

        </div>
    )
}

