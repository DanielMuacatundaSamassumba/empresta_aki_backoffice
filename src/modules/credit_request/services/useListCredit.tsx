import { api } from '@/api/api'
import { headerConfig } from '@/shered-elements/utils/headers'
import  { useEffect, useState } from 'react'
import type { CreditRequestDataType } from '../types/CreditRequestDataType'

export default function useListCredit() {
    const [data, setData] = useState<CreditRequestDataType[]>([])
    const [loaderControl, setLoaderControl] = useState(true)
    async function listCredit() {
        try {
            const response = await api.get("/credit/request", headerConfig())
            setData(response.data.data)
            console.log(response.data.data)
            setLoaderControl(false)
        } catch (error) {
            console.error(error)
            setLoaderControl(false)
        }
    }
    useEffect(() => {
        listCredit()
    }, [])
    return {
        data,
        loaderControl
    }
}
