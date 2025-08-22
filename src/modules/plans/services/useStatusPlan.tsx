import { api } from '@/api/api'
import { headerConfig } from '@/shered-elements/utils/headers'
import  { useEffect, useState } from 'react'
import type { statusTypes } from '../types/PlanDataType'

export default function useStatusPlan() {
    const [dataStatusPlan, setDataStatusPlan] = useState<statusTypes[]>()


    async function StatusListPlan() {
        try {
            const response = await api.get("plan/status", headerConfig())
            const newData = response.data.filter((item: any) => item.status.name != "pending")
            setDataStatusPlan(newData)
            console.log("teste",newData)
        } catch (error) {
  console.log(error)
        }
    }
    useEffect(() => {
        StatusListPlan()
    }, [])
    return {
        dataStatusPlan,
        setDataStatusPlan
    }
}
