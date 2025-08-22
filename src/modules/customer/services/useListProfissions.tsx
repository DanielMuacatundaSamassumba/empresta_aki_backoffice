import { api } from '@/api/api'
import { headerConfig } from '@/shered-elements/utils/headers'
import { useEffect, useState } from 'react'

export default function useListProfissions() {
    const [dataProfissions, setDataProfissions] = useState([])
    async function getProfissions() {
        try {
            const response = await api.get("professions", headerConfig())
            setDataProfissions(response.data.data)
  
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getProfissions()
    }, [])
    const AllProfissionData = dataProfissions.map((item: { id: string, name: string }) => {
        return {
            value: item.id,
            label: item.name
        }
    })
    const dataOfProfissions = dataProfissions.map(item=>item)  || []
    return {
        AllProfissionData,
        dataProfissions,
        getProfissions,
        dataOfProfissions
    }
}
