import React, { useState } from 'react'
import type { ManegerTypesData } from '../types/ManegerTypesData'
import { api } from '@/api/api';
import { headerConfig } from '@/shered-elements/utils/headers';
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom';
import { useNavigate } from 'react-router-dom';

export default function useCReateManeger() {
    const [formData, setFormData] = useState<ManegerTypesData>({
        name: "",
        email: "",
        password: "",
        phone_number: "",
        type_of_user: "",
        bi_number: ""
    })
    const navegate = useNavigate()
    const [loaderControl, setLoaderControl] = useState(false)
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    async function handleSubmit(e: any) {
        setLoaderControl(true)
        e.preventDefault()
        const data = {
            email: formData.email,
            bi_number: formData.bi_number,
            phone_number: formData.phone_number,
            password: "minhaSenhaSegura123",
            confirm_password: "minhaSenhaSegura123",
            user_type: formData.type_of_user

        }
        try {
            const response = await api.post("/user/backoffice", data, headerConfig())
            console.log(response)
            setLoaderControl(false)

            showSweetAlert({
                title: "Sucesso",
                text: "Gestor criado com sucesso!",
                icon: "success"
            })
            navegate("/maneger")
        } catch (error:any) {
            console.error(error)
            setLoaderControl(false)
            showSweetAlert({
                "title": "Erro",
                "text": error ? error.response?.data.message :"" ,
                "icon": "error",
              })
        }
        console.log(formData)

    }
    return {
        formData,
        handleChangeValue,
        handleSubmit,
        loaderControl
    }
}
