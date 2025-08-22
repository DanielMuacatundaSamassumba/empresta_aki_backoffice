import  { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { schema } from '@/modules/auth/types/ResetPasswordType'
import { useNavigate } from 'react-router-dom'
import { api } from '@/api/api'

export default function UseResetPassword() {
    const { handleSubmit, register, formState: { errors } } = useForm<{ email: string }>({
        resolver: yupResolver(schema)
    })
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navegate = useNavigate()
    const Onsubmit = async (data: any) => {
        setIsLoading(true)
        try {

            const response = await api.post("auth/reset/password/backoffice", data)
            console.log(response)
            setIsLoading(false)
            navegate("/otp-verify-code", { state: { data: response.data.data, type: "otp" } })
        } catch (error:any) {
            console.error(error?.response?.data?.errors?.email[0])
            setMessage(error?.response?.data?.errors?.email[0])
            setIsError(true)
            setIsLoading(false)
        }
    }
    return {
        handleSubmit,
        register,
        errors,
        Onsubmit,
        isError,
        message,
        isLoading
    }
}
