import { useState } from 'react'
import {  useForm } from "react-hook-form"
import { scheme } from "@/modules/auth/types/LoginAuthType"
import { yupResolver } from "@hookform/resolvers/yup"
import { api } from '@/api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import useSessionTimeout from './useSessionTimeout'
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom'
export default function UseLogin() {
  const [loaderControl, setLoaderControl] = useState(false)
  const [IsErrorMessage, setIsErrorMessage] = useState<boolean>()
  const [message, setMessage] = useState("")
  const [modalAuthControl, setModalAuthControl] = useState(false)
  const { resetSession } = useSessionTimeout()
  const location = useLocation()
  const { register,
    handleSubmit,
    formState: { errors },
  } =
    useForm({
      resolver: yupResolver(scheme)
    })
  const navegate = useNavigate()
  const Onsubmit = async (data: any) => {
    setLoaderControl(true)
    try {
      const response = await api.post("/auth/backoffice/login",
        {
          email: data.email,
          password: data.password
        }
      )
       console.log(response)
      if ( location.pathname != "/"){
        setModalAuthControl(true)
        setLoaderControl(false)
        console.log(response)
        if(!response){
          showSweetAlert({
            title:"Erro",
            text:"Senha Incorreta",
            icon:"error"
          })
        }
        return;
      }
        setLoaderControl(false)
    
      console.log(response)
      setMessage("Login  Efectuado com sucesso! Redirecionando....")
      setIsErrorMessage(false)
      resetSession()
      navegate("/otp-verify-code", { state: { email: data.email, type: "login" } })
    } catch (error) {
      setIsErrorMessage(true)
      showSweetAlert({
        title:"Erro",
        text: "An unexpected error occurred",
        icon:"error"
      })
     alert((error as any)?.response?.data?.message || "An unexpected error occurred")
     console.log(error)
      setLoaderControl(false)
      setMessage((error as any)?.response?.data?.message || "An unexpected error occurred")
       
    }
  }
  return {
    handleSubmit,
    Onsubmit,
    errors,
    register,
    loaderControl,
    IsErrorMessage,
    message,
    modalAuthControl,
    setLoaderControl
  }
}
