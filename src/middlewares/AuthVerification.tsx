import { useEffect } from "react"
import { useNavigate } from "react-router"

const AuthMiddlewareComponet = (Component:any) => {
    return (props:any) => {
        const navegate = useNavigate()
        const token = localStorage.getItem("token")
        useEffect(() => {
            if (!token) {
                navegate("/")
            }
        }, [token, navegate])
       return token ? <Component  {...props} /> : <p>Allgo de errado aconteceu!</p>
    }

}
export  {AuthMiddlewareComponet}