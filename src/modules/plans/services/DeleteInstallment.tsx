import { useState } from 'react'
import { sweetAlertConfirm } from '@/shered-elements/utils/SweetAlertConfirm'
import { headerConfig } from '@/shered-elements/utils/headers'
import { api } from '@/api/api'

export default function DeleteInstallment() {
    const [loaderControlDelete, setLoaderControlDelete] = useState<boolean>(false)
    async function deleteInstallment(id: string) {
        const deleteStatus = await sweetAlertConfirm({
            "title": "Atenção",
            "text": "Tens Certeza que Pretende Eliminar Este Plano? Esta Acção Não Poderá Ser Desfeita!",
        })
        if (deleteStatus) {
            setLoaderControlDelete(true)
            try {
                //const newData = dataPlans.filter(plan => plan.id !== id)
                const response = await api.delete(`/plan/delete/installment/${id}`, headerConfig())
                console.log(response)
                window.location.reload()
            } catch (error) {
                console.error(error)
            } finally {
                setLoaderControlDelete(false)
            }
        }
    }
    return {
        deleteInstallment,
        loaderControlDelete
    }
}
