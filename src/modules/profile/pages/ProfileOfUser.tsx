import useSessionTimeout from "@/hooks/useSessionTimeout";
import AuthModal from "@/shered-elements/components/AuthModal";
import BackButtton from "@/shered-elements/components/BackButtton";
import Header from "@/shered-elements/components/Header";
import MenuNavegationForDesktop from "@/shered-elements/components/MenuNavegationForDesktop";
import { images } from "@/shered-elements/constents/Images";
import { useState } from "react";

export default function ProfileOfUser() {
    const [menuIsOpened, setMenuIsOpened] = useState(false);
    const { time, timeSession } = useSessionTimeout()
    console.log(time, timeSession)
    const [buttonChoosed, setButtonChoosed] = useState<"profile" | "updateData" | "updatePassword">("profile");
    const data = JSON.parse(localStorage.getItem('dataUser') || '{}');
    console.log(data)
    return (
        <div>
            <div className='bg-background min-h-svh w-full flex flex-row dark:bg-zinc-800'>
                <div className={`
          transition-all duration-500 ease-in-out
          ${menuIsOpened
                        ? 'h-screen w-28 bg-white dark:bg-zinc-900'
                        : 'h-screen w-1/5 bg-white dark:bg-zinc-900 hidden lg:block'
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
                        <div className="p-4 w-full">
                            <BackButtton />
                        </div>
                        <div className="h-full  flex flex-col  justify-center items-center ">

                            <div className="w-full">
                                <div className="  w-11/12 lg:w-8/12 mx-auto p-5 rounded-sm ">
                                    <div className="flex  flex-col justify-end md:flex md:flex-row">
                                        <button className={buttonChoosed == "profile" ? "bg-green mt-3  text-white rounded p-3 ml-2 mr-2 cursor-pointer" : "border border-green  text-green rounded p-3 ml-2 mt-3 mr-2 cursor-pointer"}
                                            onClick={() => setButtonChoosed("profile")}>
                                            Perfil
                                        </button>
                                        <button className={buttonChoosed == "updateData" ? "bg-green text-white rounded p-3 ml-2 mr-2 cursor-pointer mt-3 " : "border border-green mt-3   text-green rounded p-3 ml-2 mr-2 cursor-pointer"}
                                            onClick={() => setButtonChoosed("updateData")}
                                        >Actualizar Dados</button>
                                        <button
                                            className={buttonChoosed == "updatePassword" ? "bg-green text-white rounded p-3 ml-2 mr-2 cursor-pointer mt-3 " : "border border-green  mt-3  text-green rounded p-3 ml-2 mr-2 cursor-pointer"}
                                            onClick={() => setButtonChoosed("updatePassword")}
                                        >Actualizar Palavra-passe</button>
                                    </div>
                                    {
                                        buttonChoosed == "profile" && (
                                            <div className="bg-white mt-4 border border-green dark:bg-zinc-900 w-full mx-auto p-5 rounded-sm ">
                                                <div className="flex flex-col items-center justify-center border  border-zinc-300 rounded p-5 md:flex md:flex-row md:justify-start ">
                                                    <img
                                                        src={images.avatarIcon}
                                                        alt="profile-image"
                                                        className="w-30"
                                                    />
                                                    <div className="flex flex-col ml-4 text-zinc-500">
                                                        <div className="flex ">
                                                            <p className="text-[24px] text-center">{data.name}</p>
                                                        </div>

                                                        <div className="flex text-zinc-500 mt-2 text-[14px] text-center">
                                                            <p className="text-center">Data de Cadastro - </p>
                                                            <p className="text-center">{data.created_at.split("T")[0]}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col  border  border-zinc-300 rounded p-5 mt-4">
                                                    <h1 className="text-zinc-500  font-semibold text-[22px]">Informações Pessoais</h1>
                                                    <div className="flex flex-col justify-between mt-4 text-zinc-500 md:flex md:flex-row">
                                                        <div>
                                                            <p>Nome</p>
                                                            <p>{data.name}</p>
                                                        </div>
                                                        <div>
                                                            <p>Email</p>
                                                            <p>{data.email}</p>
                                                        </div>
                                                        <div>
                                                            <p>Número de Telefone</p>
                                                            <p>{data.phone_number ?? "N/A"}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    }
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
        </div>)
}

