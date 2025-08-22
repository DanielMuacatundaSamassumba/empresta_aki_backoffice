import { api } from '@/api/api'
import { headerConfig } from '@/shered-elements/utils/headers'
import  { useEffect, useState } from 'react'

export default function useListBanks() {
    const [dataBanks, setDataBanks] = useState([])
    async function getProfissions() {
        try {
            const response = await api.get("banks", headerConfig())
            setDataBanks(response.data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getProfissions()
    }, [])
    const AllBanksData = dataBanks.map((item: { id: string, bank_name: string, short_name: string, country_prefix: string, bank_prefix: string },) => {
        return {
            value:item,
            label: item.bank_name + " - " + item.short_name,

        }
    })
    return {
        AllBanksData,
        dataBanks
    }
}
