import { api } from "@/api/api";
import { headerConfig } from "@/shered-elements/utils/headers";
import { showSweetAlert } from "@/shered-elements/utils/SweetAlertCustom";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ManegerTypesData } from "../types/ManegerTypesData";


export default function useUpdateManeger() {
    const [formData, setFormData] = useState<ManegerTypesData>({
        name: "",
        email: "",
        password: "",
        phone_number: "",
        type_of_user: "",
        bi_number: "",
        statu_id:""
    })
    const location = useLocation()

    const { data } = location.state
    console.log(data)
    useEffect(() => {
        setFormData({
            id:data.id,
            name: data.name,
            email: data.email,
            password: "",
            phone_number: data.phone_number,
            type_of_user: data.roles[0],
            bi_number: data.bi_number
        })
    }, [data])

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
            user_type: formData.type_of_user,
            statu_id:formData.statu_id
        }
        try {
            const response = await api.post(`/user/backoffice/update/${formData.id}`, data, headerConfig())
            console.log(response)
            setLoaderControl(false)

            showSweetAlert({
                title: "Sucesso",
                text: "Gestor Actualizado com sucesso!",
                icon: "success"
            })
            navegate("/maneger")
        } catch (error: any) {
            console.error(error)
            setLoaderControl(false)
            showSweetAlert({
                "title": "Erro",
                "text": error ? error.response?.data.message : "",
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
