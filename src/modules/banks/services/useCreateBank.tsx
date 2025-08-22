import React, { useState } from 'react'
import type { dataBanksTypes } from '../types/dataBanksTypes'
import { api } from '@/api/api'
import { headerConfig } from '@/shered-elements/utils/headers'
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom'
import {  useNavigate } from 'react-router-dom'

export default function useCreateBank() {
    const [loaderControl, setLoaderControl]= useState(false)
    const navegate = useNavigate()


    const [formData, setFormData] = useState<dataBanksTypes>({
        bank_name: "",
        short_name: "",
        bank_prefix: "",
        statu_id: ""
    })
    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData(() => ({
            ...formData, [name]: value
        }))
    }
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setLoaderControl(true)
        console.log(formData)
        try {
            const data = {
                bank_name: formData.bank_name,
                bank_prefix: formData.bank_prefix,
                short_name: formData.short_name,
                country_prefix: "A006",
                statu_id: formData.statu_id
            }
            const response = await api.post("/bank", data, headerConfig())
            console.log(response)
            setLoaderControl(false)
            showSweetAlert({
                title: "Sucesso",
                text: "Banco Cadastrado com sucesso!",
                icon: "success",
              });
              navegate("/banks")
        } catch (error:any) {
            console.error("Submission error:", error);
            showSweetAlert({
                title: "Erro",
                text: error?.response?.data?.message ?? "Erro inesperado",
                icon: "error",
              });
            console.log(formData)
            setLoaderControl(false)
            
        }

    }
    return {
        handleChangeValue,
        formData,
        handleSubmit,
        loaderControl
    }
}
