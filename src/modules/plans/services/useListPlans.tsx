import { api } from '@/api/api'
import { useEffect, useState } from 'react'
import type { InstallmentType, PlanDataType } from '../types/PlanDataType'
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom'
import { headerConfig } from '@/shered-elements/utils/headers'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function useListPlans() {
    const [dataPlans, setDataPlans] = useState<PlanDataType[]>([])
    const [loaderControl, selectLoaderControl] = useState<boolean>(true)
    const [installMentData, setInstalmentData] = useState<InstallmentType[] | undefined>([])
    const [planData, setPlanData] = useState<PlanDataType[]>([])
    const [loanValue, setLoanValue] = useState(0)
    const [loanValueControl, setLoanValueControl] = useState(true)
    const [InstalmentSelected, setInstallmentSelected] = useState<{ id: string, installment_number: "" }>({
        id: "",
        installment_number: ""
    })
    const [planResumeControl, setPlanResumeControl] = useState(false)
    const [methodId, setMethodId] = useState("")
    const location = useLocation()
    const data = location?.state?.data
    console.log("user", data)
    const listPlans = async () => {
        selectLoaderControl(true)
        try {
            const response = await api.get("/plans", headerConfig())
            setDataPlans(response.data.data)
            console.log(response.data.data)
            selectLoaderControl(false)
        } catch (error) {

        }
    }
    function handleShowInstalments(name: any) {
        const dataPlan = dataPlans.filter((item) =>
            item.flat_name == name
        )
        setPlanData(dataPlan)
        setInstalmentData(dataPlan[0].avalable_installments)
        setLoanValueControl(false)
    }
    function handleAmmountOfLoan(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        const min = planData[0].minimum_capital
        const max = planData[0].maximum_capital
        if (value >= min && value <= max) {
            setPlanResumeControl(true)
            setLoanValue(Number(value))
            return;
        }
        setLoanValue(0)

    }
    async function handleCreditRquest() {
        selectLoaderControl(true)
        if (loanValue > 0 && InstalmentSelected.id != "" && methodId.length > 0) {
            const dataCreditRequest = {
                ammount: loanValue,
                customer_id: data.id,
                plan_id: planData[0].id,
                payment_method_id: methodId,
                avalableInstallment_id: InstalmentSelected.id
            }
            console.log(dataCreditRequest)
            try {
                const response = await api.post("credit/request", dataCreditRequest, headerConfig())
                console.log(response)
                selectLoaderControl(false)
                Swal.fire({
                    title: "Sucesso",
                    text: "Solicitação de crédito realizada com sucesso",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                     window.location.reload()
                    }
                });

            } catch (error) {
                console.log(error)
                selectLoaderControl(false)
                const errorMessage = (error as any)?.response?.data?.message || "An unexpected error occurred";
                showSweetAlert(
                    {
                        title: "Erro",
                        text: errorMessage,
                        icon: "error"
                    }
                )
            }

        } else {
            selectLoaderControl(false)
            showSweetAlert({
                text: "Selecione O montante e a Parcela e Método de Pagamento",
                title: "Erro ao Solicitar Plano",
                icon: "error"
            })
        }
    }
    useEffect(() => {
        listPlans()
    }, [])
    return {
        dataPlans,
        loaderControl,
        selectLoaderControl,
        setDataPlans,
        listPlans,
        installMentData,
        handleShowInstalments,
        planData,
        loanValue, setLoanValue,
        planResumeControl, setPlanResumeControl,
        handleAmmountOfLoan,
        InstalmentSelected,
        setInstallmentSelected,
        handleCreditRquest,
        setMethodId,
        loanValueControl,


    }
}
