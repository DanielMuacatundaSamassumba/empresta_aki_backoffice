
import { sweetAlertConfirm } from '@/shered-elements/utils/SweetAlertConfirm'
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { ListUserType } from '@/modules/customer/types/ListUserType'
import type { CreateClientType } from '@/modules/customer/types/CreateClientType'


export default function UseListClient() {
    const [, setDataClient] = useState<ListUserType>()
    const location = useLocation()
    const navegate = useNavigate()
    const data:CreateClientType = location?.state?.data;

    const deleteClient = async () => {
        try {
          const isConfirmed =  await sweetAlertConfirm({
                title: "Confirmação",
                text: "Tem certeza de que deseja eliminar este cliente?"
            })
         
            if( isConfirmed){

                showSweetAlert({
                    title: "Sucesso",
                    text: "Cliente eliminado com sucesso!",
                    icon: "success"
                })
                navegate("/customer")
            }
            
        } catch (error) {
            console.error(error)
        }

    }
    useEffect(()=>{
  console.log(data)
    }, [])
    return {
        setDataClient,
        data,
        deleteClient
    }
}
