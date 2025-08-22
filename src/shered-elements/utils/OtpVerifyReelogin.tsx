import { api } from "@/api/api"
import UseLogin from "@/hooks/UseLogin"
import { showSweetAlert } from "./SweetAlertCustom"
import useSessionTimeout from "@/hooks/useSessionTimeout"
import { useLocation } from "react-router-dom"

export default function OtpVerifyReelogin() {
    const { setLoaderControl } = UseLogin()
    const { resetSession, setTimeSession } = useSessionTimeout()
    const location = useLocation()
    console.log(location)
  async function handleVerifyOtpCode(code: string, email: string) {
        setLoaderControl(true)
        if (code.length !== 6) {
            setLoaderControl(false)
            alert("Por favor, insira um código OTP válido de 6 dígitos.")
            return;
        }
        try {
            console.log("Passou")
       const response = await api.post("/auth/verify/code/backoffice", {
                code: code,
                email: email
            })
            if (response) {
                setLoaderControl(false)
                resetSession()
                setTimeSession(false)
                localStorage.setItem("token", response.data.token)  
                window.location.reload()
                showSweetAlert({
                    title: "Código Verificado",
                    text: "Código OTP verificado com sucesso!",
                    icon: "success"
                })
            }
        }
        catch (e) {
            console.error(e)
        }
      

    }
     return {
         handleVerifyOtpCode
     }
}