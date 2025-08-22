import { images } from '@/shered-elements/constents/Images'
import { useLocation } from 'react-router-dom'
import { Sun, Moon } from "lucide-react"
import { UseDarkMode } from '@/context/ThemeProvider'

export default function MenuNavegationForMobile() {
    const location = useLocation()
    const themeContext = UseDarkMode()
    const { darkMode, setDarkMode } = themeContext || { darkMode: false, setDarkMode: () => { } }
    return (
        <div className='  h-screen flex flex-col overflow-auto dark:bg-zinc-900   sm:overflow-hidden '>
            <div className='flex flex-col justify-between  items-center  h-11/12 '>
                <div className='flex flex-col items-center p-2 '>
                    <div className='flex items-center p-2 w-full '>
                        {
                            location.pathname == "/dashboard" ? (
                                <span className='bg-green h-8 w-1'></span>
                            ) : ""
                        }

                        <img
                            src={images.dashboardIcon}
                            alt="dashboard-icon"
                            className='w-8 h-8'
                        />
                        <h1
                            className={location.pathname === "/" ? "text-white text-xl font-semibold dark:text-white " : "text-font-color text-[17px] font-medium dark:text-white"}
                        >Dashboard</h1>



                    </div>
                    <div className='flex items-center p-2 w-full '>
                        {
                            location.pathname == "/" ? (
                                <span className='bg-green h-8 w-1'></span>
                            ) : ""
                        }

                        <img
                            src={images.userAppIcon}
                            alt="dashboard-icon"
                            className='w-8 h-8'
                        />
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <h1
                                    className={location.pathname === "/" ? " text-white text-xl font-semibold  dark:text-white" : "text-font-color text-[17px] font-medium dark:text-white"}
                                >Clientes
                                </h1>
                              

                            </div>

                        </div>

                    </div>
                    <div className='flex items-center p-2 w-full '>
                        {
                            location.pathname == "/" ? (
                                <span className='bg-green h-8 w-1'></span>
                            ) : ""
                        }

                        <img
                            src={images.usersBackoffice}
                            alt="dashboard-icon"
                            className='w-8 h-8'
                        />
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <h1
                                    className={location.pathname === "/" ? " text-white text-xl font-semibold  dark:text-white" : "text-font-color text-[17px] font-medium dark:text-white"}
                                >Usuarios
                                </h1>
                              

                            </div>

                        </div>

                    </div>

                    <div>
                      
                    </div>


                    <div className='flex items-center p-2 w-full '>
                        {
                            location.pathname == "/" ? (
                                <span className='bg-green h-8 w-1'></span>
                            ) : ""
                        }

                        <img
                            src={images.planIcon}
                            alt="dashboard-icon"
                            className='w-8 h-8'
                        />
                        <div className='flex flex-col'>

                            <h1
                                className={location.pathname === "/" ? "text-white text-xl font-semibold dark:text-white " : "text-font-color text-[17px] font-medium dark:text-white"}
                            >Planos
                            </h1>

                        </div>

                    </div>
                    <div className='flex items-center p-2 w-full '>
                        {
                            location.pathname == "/" ? (
                                <span className='bg-green h-8 w-1'></span>
                            ) : ""
                        }

                        <img
                            src={images.blogIcon}
                            alt="dashboard-icon"
                            className='w-8 h-8'
                        />
                        <div className='flex flex-col'>

                            <h1
                                className={location.pathname === "/" ? "text-white text-xl font-semibold dark:text-white" : "text-font-color text-[17px] font-medium dark:text-white"}
                            >Blog
                            </h1>

                        </div>

                    </div>

                    <div className='flex flex-row items-center p-2 w-full '>
                        {
                            location.pathname == "/" ? (
                                <span className='bg-green h-8 w-1'></span>
                            ) : ""
                        }

                        <img
                            src={images.planIcon}
                            alt="dashboard-icon"
                            className='w-8 h-8'
                        />
                        <div className='flex flex-col'>

                            <h1
                                className={location.pathname === "/" ? "text-white text-xl font-semibold dark:text-white " : "text-font-color text-[15px] font-medium dark:text-white"}
                            >Solicitação de Crédito
                            </h1>

                        </div>

                    </div>
                    <div className='flex items-center p-2 w-full '>
                        {
                            location.pathname == "/" ? (
                                <span className='bg-green h-8 w-1'></span>
                            ) : ""
                        }

                        <img
                            src={images.paymentIcon}
                            alt="dashboard-icon"
                            className='w-8 h-8'
                        />
                        <div className='flex flex-col'>

                            <h1
                                className={location.pathname === "/" ? "text-white text-xl font-semibold dark:text-white" : "text-font-color text-[17px] font-medium dark:text-white"}
                            >Pagamentos
                            </h1>

                        </div>

                    </div>

                </div>
                <div className='flex justify-between items-center p-2  w-full'>
                    <div>
                        <img
                            src={images.logoutIcon}
                            alt="logout-icon"
                            className='w-5'
                        />
                    </div>
                    <div className='flex flex-row items-center'>
                        <Sun className='text-blue' />

                        <div className={darkMode ? 'ml-2 h-5 w-12 rounded-full flex items-center justify-end border border-green' : ' ml-2 h-6 w-12 rounded-full flex items-center justify-start border border-green'}>
                            <div className='bg-blue h-4 w-4 ml-1 rounded-full' onClick={() => setDarkMode(!darkMode)}>

                            </div>

                        </div>
                        <Moon className='text-blue ml-2' />
                    </div>
                </div>
            </div>

        </div>
    )
}


