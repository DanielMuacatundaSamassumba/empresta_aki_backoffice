import { api } from '@/api/api'
import { headerConfig } from '@/shered-elements/utils/headers'
import  { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { CreditRequestDataType } from '../types/CreditRequestDataType'

export default function usePersonalCredit() {
    const [personalDataCredit, setPersonalDataCredit] = useState<CreditRequestDataType[]>()
    const location = useLocation()
       const data = location?.state?.data;

   

    async function showPersonalCredit() {
        try {
            const response = await api.get(`/credit/request?customer_idFilter=${data.id}`, headerConfig())
            const filteredData = response.data.data.filter((item: any) => item.statu.name != "pending")
            setPersonalDataCredit(response.data.data)
            console.log(filteredData)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        showPersonalCredit()
    }, [])
    useEffect(() => {
      
        
    }, [])

    return {
        personalDataCredit
    }
}
