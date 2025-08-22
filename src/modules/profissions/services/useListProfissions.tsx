import { useEffect, useState } from 'react'
import { type ProfissionsType } from '../types/ProfissionsType'
import { api } from '@/api/api'
import { headerConfig } from '@/shered-elements/utils/headers'
export default function useListProfissions() {
    const [dataListProfissions, setDataListProfissions] = useState<ProfissionsType[] | undefined>()
    const [loaderControl, setLoaderControl] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    async function showProfissions() {
        setLoaderControl(true)
        try {
            const response = await api.get(`/professions?page=${pageNumber}&totalPerPage=5`, headerConfig())
            setDataListProfissions(response.data.data)
            console.log(response.data.data)
            setLoaderControl(false)
        } catch (error) {
            console.error(error)
            setLoaderControl(false)
        }
    }
    useEffect(() => {
        showProfissions()
    }, [pageNumber])
    return {
        dataListProfissions,
        loaderControl,
        pageNumber,
        setPageNumber
    }
}
