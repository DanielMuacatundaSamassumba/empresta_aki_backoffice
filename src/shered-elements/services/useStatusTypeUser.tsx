import { useEffect, useState } from 'react'
import type { StatusTypeOfUser } from '../types/statusTypeOfUser'
import { api } from '@/api/api'
import { headerConfig } from '../utils/headers'

export default function useStatusTypeUser() {
    const [dataOfStatusUser, setDataOfStatusUser] = useState<StatusTypeOfUser[]>()
    async function show() {
        try {
            const response = await api.get("status/list", headerConfig())
            setDataOfStatusUser(response.data.data)
            console.log('teste',response.data.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        show()
    }, [])
    return {
        dataOfStatusUser
    }
}
