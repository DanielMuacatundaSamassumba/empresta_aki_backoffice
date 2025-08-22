import React, { useState } from 'react'
import type { PlanDataType } from '@/modules/plans/types/PlanDataType'
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom';
import { getRefundInDays } from '@/modules/plans/utils/ConverPeriod';
import { headerConfig } from '@/shered-elements/utils/headers';
import { api } from '@/api/api';

import { useNavigate } from 'react-router-dom';
export default function useCreatePlan() {
    const [maxCapitalControl, setMaxCapitalControl] = useState<number>(0)
    const [loaderControl, setLoaderControl] = useState(false)
    const [durationControl, setDurationControl] = useState<number>(0)
    const navegate = useNavigate()
    const [installmentData, setInstallmentData] = useState<{ id: number; duration: string; installment_value: string }[]>([])
    const [formData, setFormData] = useState<PlanDataType>({
        flat_name: "",
        maximum_capital: "0",
        interest_rate: "",
        spread: "",
        commission: "",
        refund_period: 0,
        description: "",
        refund_duration_type: "1",
        installment_quantity: 0,
        minimum_capital: "0",
        avalable_installments: [],
        status_name: "",
        interest_on_arrears_for_each_day_of_delay: "",
        maximum_number_of_plan_operations:""
    })

    /*function handleAddInstallmentData() {
         const newElement = {
             id: Date.now(),
             duration: "",
             installment_value: "",
         };
         console.log("max", maxCapitalControl);
         console.log("maximum_capital", formData.maximum_capital);
         if (maxCapitalControl < formData.maximum_capital && durationControl < parseInt(formData.refund_period, 10) && formData.maximum_capital > 499) {
             setInstallmentData(prev => [...prev, newElement]);
 
         } else {
             showSweetAlert({
                 "title": "Erro",
                 "icon": "error",
                 "text": `O valor maximo do capital da parcela e  a duração não devem ser maiores que o capital máximo do plano e o período de reembolso respectivamente. Capital maximo deve ser maior que 599.`,
             })
         }
 
     }*/

    function handleChangeInstallmentData(e: any, id: any) {
        const { name, value } = e.target;

        const updateInstallmentData = installmentData.map(item =>
            item.id === id ? { ...item, [name]: value } : item
        );

        setInstallmentData(updateInstallmentData);
        const maxCapitalCheck = updateInstallmentData
            .map(item => parseInt(item.installment_value || "0", 10))
            .reduce((acc, curr) => acc + curr, 0);

        const durationCheck = updateInstallmentData
            .map(item => parseInt(item.duration || "0", 10))
            .reduce((acc, curr) => acc + curr, 0);
        setDurationControl(durationCheck);
        setMaxCapitalControl(maxCapitalCheck);
        console.log(maxCapitalCheck);

    }


    function handleDeleteInstallmentData(id: any) {
        const updateInstallmentData = installmentData.filter(item => item.id !== id);
        setInstallmentData(updateInstallmentData);
    }
    function handleChangePlanData(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target





        if (name == "maximum_capital") {

            //const formattedValue = rawValue.match(/.{1,4}/g)?.join(".") || "";
            setFormData((prev) => {
                return {
                    ...prev, [name]: value
                }
            })
            return;
        }
        setFormData((prev) => {
            return {
                ...prev, [name]: value

            }
        })

    }
    async function handleSubmit(e: any) {
        e.preventDefault();
        setLoaderControl(true)
        const {
            flat_name,
            maximum_capital,
            refund_period,
            interest_rate,
            commission,
            description,
            spread,
            refund_duration_type, minimum_capital, maximum_number_of_plan_operations,interest_on_arrears_for_each_day_of_delay, installment_quantity } = formData;
        const refundInDays = getRefundInDays(refund_duration_type, refund_period);
        console.log(refundInDays)
        console.log("ad", maximum_capital)
        const maximumCapitalConverted = parseInt(maximum_capital)

        if (maximumCapitalConverted <= 0) {
            showSweetAlert({
                title: "Erro de Validação",
                text: "O Capital Maximo deve ser maior que 1000 kz",
                icon: "info"
            })
            return;
        }
        const data = {
            flat_name: flat_name,
            maximum_capital: maximum_capital,
            interest_rate: interest_rate,
            spread: spread,
            commission: commission,
            description: description,
            refund_period: refundInDays,
            minimum_capital: minimum_capital,
            Interest_on_arrears_for_each_day_of_delay: interest_on_arrears_for_each_day_of_delay,
            installment: installment_quantity,
            maximum_number_of_plan_operations:maximum_number_of_plan_operations
        }


        try {

            const response = await api.post("/plan", data, headerConfig());
            console.log(response);
            setLoaderControl(false)
            showSweetAlert(
                {
                    title: "Sucesso",
                    text: "Plano Cadastrado com sucesso!",
                    icon: "success"
                }
            ).then((result) => {
                if (result.isConfirmed) {
                    navegate("/plan")
                }
            })
        } catch (error) {
            console.log(error)
            setLoaderControl(false)
            const errorMessage = (error as any)?.response?.data?.message || "An unexpected error occurred";
            showSweetAlert(
                {
                    title: "Erro",
                    text: errorMessage,
                    icon: "error"
                }
            )
        }

    }
    return {
        formData,
        setFormData,
        handleChangeInstallmentData,
        handleDeleteInstallmentData,
        handleChangePlanData,
        handleSubmit,
        loaderControl,
        durationControl,
        maxCapitalControl
    }
}

