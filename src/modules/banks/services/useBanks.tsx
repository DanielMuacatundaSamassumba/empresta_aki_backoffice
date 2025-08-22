import { api } from '@/api/api'
import { headerConfig } from '@/shered-elements/utils/headers'
import  { useEffect, useState } from 'react'
import type { dataBanksTypes } from '../types/dataBanksTypes'

export default function useBanks() {
    const [dataOfBanks, setDataOfBanks] = useState<dataBanksTypes[] | undefined >()
    const [ loaderControl, setLoaderControl] = useState(false)
    async function listOfBanks() {
        setLoaderControl(true)
        try {
            const response = await api.get("/banks", headerConfig())
            console.log(response)
            setDataOfBanks(response.data.data)
            setLoaderControl(false)
        } catch (error) {
            console.error(error)
            setLoaderControl(false)
        }
    }
     useEffect(()=>{
        listOfBanks()
     }, [])
    return {
        dataOfBanks,
        loaderControl,
        setLoaderControl
    }
}
