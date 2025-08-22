import { api } from '@/api/api'
import { headerConfig } from '@/shered-elements/utils/headers'
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom'
import  { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { ProfissionsType } from '../types/ProfissionsType'

export default function useUpdateProfission() {
    const [loaderControl, setLoaderControl] = useState(false)
    const navegate = useNavigate()
    const location = useLocation()
    const { data } = location.state

    const [formData, setFormData] = useState<ProfissionsType>({
        name: "",
        statu_id: ""
    })
    const handleChangeValue = (e: any) => {
        const { name, value } = e.target
        setFormData((prev: any) => {
            return { ...prev, [name]: value }
        })
    }
    useEffect(() => {
        setFormData({
            name: data.name,
            id: data.id,
            statu_id: data.statu.status_id
        })
    }, [data])
    async function handleSubmit(e: any) {

        e.preventDefault();
        setLoaderControl(true)
        try {
            const response = await api.post("/professions", formData, headerConfig())
            console.log(response)
            setLoaderControl(false)
            showSweetAlert(
                {
                    title: "Sucesso",
                    text: "Profissão Cadastrado com sucesso!",
                    icon: "success"
                }
            ).then((result) => {
                if (result.isConfirmed) {
                    navegate("/profissions")
                }
            })
        } catch (error: any) {
            console.error(error)
            setLoaderControl(false)
            showSweetAlert({
                "title": "Erro",
                "text": error ? error.response?.data.message : "",
                "icon": "error",
            })
        }
    }
    return {
        handleSubmit,
        formData,
        handleChangeValue,
        loaderControl
    }
}
