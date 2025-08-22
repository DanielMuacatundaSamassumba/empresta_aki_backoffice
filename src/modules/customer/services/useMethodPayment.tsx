import { api } from '@/api/api'
import { headerConfig } from '@/shered-elements/utils/headers'
import  { useEffect, useState } from 'react'

export default function useMethodPayment() {
    const [methodData, setMethodData] = useState([])

    async function ListMethodData() {
       try{
         const response = await api.get("payment-methods", headerConfig())
         setMethodData(response.data.data)
          console.log(response.data.data)
       }catch(error){
     
       }
    }
    useEffect(() => {
        ListMethodData()
    }, [])
    return {
        methodData
    }
}
