import { useState } from "react"
import type { ProfissionsType } from "../types/ProfissionsType"
import { api } from "@/api/api"
import { headerConfig } from "@/shered-elements/utils/headers"
import { showSweetAlert } from "@/shered-elements/utils/SweetAlertCustom"
import { useNavigate } from "react-router-dom"


export default function useCReateProfission() {
    const [loaderControl, setLoaderControl] = useState(false)
    const navegate = useNavigate()
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
        } catch (error:any) {
            console.error(error)
            setLoaderControl(false)
            showSweetAlert({
                "title": "Erro",
                "text": error ? error.response?.data.message :"" ,
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
