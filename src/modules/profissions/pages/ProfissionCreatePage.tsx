import useSessionTimeout from "@/hooks/useSessionTimeout"
import AuthModal from "@/shered-elements/components/AuthModal"
import Header from "@/shered-elements/components/Header"
import MenuNavegationForDesktop from "@/shered-elements/components/MenuNavegationForDesktop"
import { useState } from "react"
import TopElementForAllForm from "@/shered-elements/components/TopElementForAllForm"
import Input from "@/shered-elements/components/Input"
import Button from "@/shered-elements/components/Button"
import useCReateProfission from "../services/useCReateProfission"
import LoaderComponent from "@/shered-elements/utils/LoaderComponent"
import { handleStatusPlan } from "@/modules/plans/types/PlanDataType"
import useStatusPlan from "@/modules/plans/services/useStatusPlan"

export default function ProfissionCreatePage() {
    const [menuIsOpened, setMenuIsOpened] = useState(false)

    const {
        handleSubmit,
        formData,
        handleChangeValue,
        loaderControl
    } = useCReateProfission()

    const { dataStatusPlan } = useStatusPlan()
    const { timeSession } = useSessionTimeout()

    return (
        <div>
            <div className='bg-background min-h-screen w-full flex flex-row dark:bg-zinc-800'>
                {/* MENU */}
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

                {/* CONTEÚDO PRINCIPAL */}
                <div className='flex flex-row w-full'>
                    <div className='flex flex-col w-full h-full'>
                        <Header />
                        <div className="h-full flex flex-row items-center justify-center">
                            <div className="bg-white border border-green rounded p-5 w-11/12 md:w-7/12 xl:w-5/12">
                                <TopElementForAllForm title="Adicionar Profissão" />

                                <form onSubmit={handleSubmit}>
                                    {/* INPUT NOME */}
                                    <div>
                                        <label htmlFor="name">Nome</label>
                                        <div className="mt-2">
                                            <Input
                                                name="name"
                                                type="text"
                                                placeholder="nome"
                                                value={formData.name}
                                                onchage={handleChangeValue}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* SELECT STATUS */}
                                    <div className="mt-4">
                                        <label htmlFor="statu_id" className='text-gray-500'>Status</label>
                                        <div className='mt-2'>
                                            <select
                                                className="border border-zinc-400 w-full p-3 rounded outline-none bg-white dark:bg-zinc-900 dark:text-white"
                                                onChange={handleChangeValue}
                                                value={formData.statu_id}
                                                name="statu_id"
                                                required
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

                                    {/* BOTÃO */}
                                    <div className="mt-6">
                                        <Button
                                            name="Adicionar"
                                            typeOfButtonCustom="fullBg"
                                            type="submit"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LOADER */}
            {loaderControl && (
                <LoaderComponent />
            )}

            {/* MODAL DE SESSÃO */}
            {timeSession && (
                <div className='flex justify-center w-full'>
                    <AuthModal />
                </div>
            )}
        </div>
    )
}
