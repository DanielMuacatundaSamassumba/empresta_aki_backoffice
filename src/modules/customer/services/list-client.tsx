import { useEffect, useState } from 'react'
import { api } from '@/api/api'
import type { ListUserType } from '../types/ListUserType'
import { typeOfUser } from '@/shered-elements/types/TypesOfUser'
export default function useListClient() {
    const [data, setData] = useState<ListUserType[]>([])
    const [dataOmanegers, setDataOfManegers] = useState<ListUserType[]>([])
    const [loaderControl, setLoaderControl] = useState(false)
    async function getClients() {
        setLoaderControl(true)
        try {
            const response = await api.get("/user/backoffice")
            const filteredDataCustomer = response.data.data.filter((item: any) => item.roles[0] == "customer")
            const filteredDataManeger = response.data.data.filter((item: any) => item.roles[0] == typeOfUser.ADMIN || item.roles[0] == typeOfUser.TALLER || item.roles[0] == typeOfUser.CREDIT_ANALIST ||  item.roles[0] == typeOfUser.FINANCIAL_MANEGER)
            setData(filteredDataCustomer)
            setDataOfManegers(filteredDataManeger)
            console.log(filteredDataManeger)
            setLoaderControl(false)
        } catch (error) {
            console.log(error)
            setLoaderControl(false)
        }
    }

    useEffect(() => {
        getClients()
    }, [])

    return {
        data,
        setData,
        loaderControl,
        dataOmanegers
    }
}
