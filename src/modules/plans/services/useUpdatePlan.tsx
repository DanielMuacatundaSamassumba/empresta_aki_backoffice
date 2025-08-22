import React, {  useEffect, useState } from 'react'
import type { InstallmentType, PlanDataType } from '@/modules/plans/types/PlanDataType'
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom';
import { getRefundInDays } from '@/modules/plans/utils/ConverPeriod';
import { headerConfig } from '@/shered-elements/utils/headers';
import { api } from '@/api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { sweetAlertConfirm } from '@/shered-elements/utils/SweetAlertConfirm';
export default function useUpdatePlan() {
    const [durationInstallment, setDurationInstallment] = useState<number>(0)
    const [maxCapitalInstallment, setMaxCapitalInstallment] = useState<number>(0)
    const [installmentID, setInstallmentID] = useState<number>(0)
    const [loaderControl, setLoaderControl] = useState(false)
    const [newNstallmentData, setNewInstalmentData] = useState([])
    const location = useLocation()
    const data: PlanDataType = location.state.data || {};
    const navegate = useNavigate()
    const [installmentData, setInstallmentData] = useState<InstallmentType[]>(data.avalable_installments?.reverse() || []);
    const [formData, setFormData] = useState<PlanDataType>({
        id: data.id,
        flat_name: data.flat_name || "",
        maximum_capital: data.maximum_capital || "",
        interest_rate: data.interest_rate || "",
        spread: data.spread || "",
        commission: data.commission || "",
        refund_period: Number(data.refund_period) || 0,
        description: data.description || "",
        refund_duration_type: "1",
        installment_quantity: Math.floor(Number(data.refund_period) / 7),
        minimum_capital: data.minimum_capital || "0",
        avalable_installments: data.avalable_installments?.reverse() || [],
        statu_id:data.statu?.status_id,
        interest_on_arrears_for_each_day_of_delay:data.interest_on_arrears_for_each_day_of_delay,
        status_name:"",
        maximum_number_of_plan_operations:""
    })

     useEffect(()=>{
        setFormData({
            id: data.id,
            flat_name: data.flat_name || "",
            maximum_capital: data.maximum_capital || "",
            interest_rate: data.interest_rate || "",
            spread: data.spread || "",
            commission: data.commission || "",
            refund_period: Number(data.refund_period) || 0,
            description: data.description || "",
            refund_duration_type: "1",
            installment_quantity: data.installment || 0,
            minimum_capital: data.minimum_capital || "0",
            avalable_installments: data.avalable_installments?.reverse() || [],
            statu_id: data.statu?.status_id,
            interest_on_arrears_for_each_day_of_delay:data.interest_on_arrears_for_each_day_of_delay,
            status_name:"",
            maximum_number_of_plan_operations:data.maximum_number_of_plan_operations
        })
     }, [data])
    /*  function handleChangeInstallmentData(e: any, id: any) {
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
  
      }*/


    function handleDeleteInstallmentData(id: any) {
        const updateInstallmentData = installmentData.filter(item => item.id !== id);
        setInstallmentData(updateInstallmentData);
    }
    function handleChangePlanData(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target





        setFormData((prev) => {
            return {
                ...prev, [name]: value

            }
        })

    }
    async function handleSubmit(e: any) {
        e.preventDefault();
        const {
            flat_name,
            maximum_capital,
            refund_period,
            interest_rate,
            spread,
            commission,
            description,
            refund_duration_type, minimum_capital, statu_id, interest_on_arrears_for_each_day_of_delay, maximum_number_of_plan_operations } = formData;
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
            statu_id: statu_id,
            installment:formData.installment_quantity,
            Interest_on_arrears_for_each_day_of_delay:interest_on_arrears_for_each_day_of_delay,
            maximum_number_of_plan_operations:maximum_number_of_plan_operations
        }
        console.log(data)
        try {


            const response = await api.put(`/plan/${formData.id}`, data, headerConfig());
            console.log(response);
            setLoaderControl(false)
            showSweetAlert(
                {
                    title: "Sucesso",
                    text: "Plano actualizado com sucesso!",
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
    const handleUpdateAvalable_installment = (avalable_installment_id: any, action: any) => {
        sweetAlertConfirm({
            text: `Tens certez que Pretende ${action}`,
            title: "Actualizar Parcela"
        }).then(async (res) => {
            if (res.isConfirmed && action == "desactivar") {
                setLoaderControl(true)
                try {
                    const response = await api.put(`/plan/plot/available/innative/${avalable_installment_id}`, {}, headerConfig())
                    console.log("teste", response)
                    const newDta = installmentData.map(item =>
                        item.id === avalable_installment_id
                            ? { ...item, status: 2 }
                            : { ...item }
                    );
                    setInstallmentData(newDta)
                    setLoaderControl(false)
                } catch (error) {
                    setLoaderControl(false)
                    console.error(error)
                }
                return;
            } else if (res.isConfirmed && action == "activar") {
                setLoaderControl(true)
                try {
                    const response = await api.put(`plan/plot/available/ative/${avalable_installment_id}`, {}, headerConfig())
                    console.log(response)
                    const newDta = installmentData.map(item => {
                        return item.id === avalable_installment_id
                            ? { ...item, status: 1 }
                            : { ...item };
                    });
                    setInstallmentData(newDta)
                    setLoaderControl(false)
                } catch (error) {
                    console.error(error)
                    setLoaderControl(false)
                }
                return;
            }
        })
    }

    return {
        formData,
        setFormData,
        handleDeleteInstallmentData,
        handleChangePlanData,
        handleSubmit,
        data,
        durationInstallment,
        setDurationInstallment,
        maxCapitalInstallment,
        setMaxCapitalInstallment,
        installmentID,
        setInstallmentID,
        newNstallmentData,
        setNewInstalmentData,
        installmentData,
        loaderControl,
        handleUpdateAvalable_installment
    }
}

