import { api } from '@/api/api'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
export default function UseOtpVerify() {
    const Location = useLocation()
    const emailOfLoggedUser = Location?.state.email
    const { type } = Location?.state
    const navegate = useNavigate()
    const [otpData, setOtpData] = useState(Array(6).fill(""))
    const [isError, setIsError] = useState(false)
    const reFerences = useRef<(HTMLInputElement | null)[]>([])
    const [loaderControl, setLoaderControl] = useState(false)
    const [IsErrorMessage, setIsErrorMessage] = useState<boolean>()
    const [message, setMessage] = useState("")

    useEffect(() => {
        console.log(emailOfLoggedUser)
    }, [])
    const handleChangeValue = (event: any, index: any) => {
        const { value } = event.target
        const newData = [...otpData]
        newData[index] = value
        setOtpData(newData)
        if (value.length != 0 && index < 7) {
            reFerences.current[index + 1]?.focus()
        }
    }
    const handleBacksPacePressKey = (event: any, index: any) => {
        if (event.key == "Backspace" && index >= 0) {
            reFerences.current[index - 1]?.focus()
            const newData = [...otpData]
            newData[index] = ""
            console.log(index)
            setOtpData(newData)
        }
    }
    const handleSubmit = async (data: any) => {
        setLoaderControl(true)
        const filter = data.filter((item: any) => item != "")
        if (filter.length != 6) {
            setLoaderControl(false)
            setIsError(true)
            return;
        }
        setIsError(false)
        const [first, second, thert, fourth, fiveth, sixth] = data
        try {

            const codeOtp = first + "" + second + "" + thert + "" + fourth + "" + fiveth + "" + sixth
            const response = await api.post("/auth/verify/code/backoffice", {
                code: codeOtp,
                email: emailOfLoggedUser
            })
            localStorage.setItem("dataUser", JSON.stringify(response.data.data))
            setLoaderControl(false)
            setMessage("Codigo OPT Verficado com sucesso!")
            setIsErrorMessage(false)
            if (type == "login") {
                localStorage.setItem("token", response.data.token)
                console.log(response.data)
                localStorage.setItem("role", response.data.roles)
            } else {
                navegate("/new-password", { state: { data: emailOfLoggedUser } })
            }


            setLoaderControl(false)
            setMessage("Codigo OPT Verficado com sucesso!")
            setIsErrorMessage(false)
            if (type == "login") {
                localStorage.setItem("token", response.data.token)
                navegate("/dashboard")
            } else {
                navegate("/new-password")
            }

        } catch (error) {
            console.error(error)
            setLoaderControl(false)
            setIsErrorMessage(true)
            setMessage((error as any)?.response?.data?.message || "An unexpected error occurred")
        }
    }
    return {
        otpData,
        handleChangeValue,
        reFerences,
        handleBacksPacePressKey,
        isError,
        handleSubmit,
        loaderControl,
        IsErrorMessage,
        message
    }
}
