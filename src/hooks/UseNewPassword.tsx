import  { useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '@/modules/auth/types/NewPasswordType'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '@/api/api'
import { sweetAlertCustum } from '@/shered-elements/utils/SweetAlerCustom'
export default function UseNewPassword() {
    const location = useLocation()
    const [ isError, setIsError] = useState<boolean>()
    const [ message, setMessage] = useState("")
    const [ isLoading, setIsLoading] = useState<boolean>()
    const navegate = useNavigate()
    const user_data = location?.state.data
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const OnSumbit = async (data: any) => {
        setIsLoading(true)
        const { email } = user_data
        try {
            const response = await api.put("/auth/reset/password/backoffice", {
                email: email,
                password: data.newPassword,
                confirm_password: data.confNewPassword
            })
            console.log(response)
            setIsLoading(false)
            setIsError(false)
            navegate("/")
            sweetAlertCustum("Recuperação de Senha", "Senha Alterada com sucesso!", "success")
        } catch (error:any) {
            console.error(error)
            console.log(data)
            setMessage(error?.response?.data?.errors?.email[0])
        }
    }
    return {
        OnSumbit,
        handleSubmit,
        register,
        errors,
        message,
        isLoading,
        isError
        
    }
}
