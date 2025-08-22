import { api } from '@/api/api'
import { headerConfig } from '@/shered-elements/utils/headers'
import { sweetAlertConfirm } from '@/shered-elements/utils/SweetAlertConfirm'
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom'


export default function useDeleteProfission() {
    async function deleteProfission(id: string) {
        const deleteStatus = await sweetAlertConfirm({
            "title": "Atenção",
            "text": "Tens Certeza que Pretende Eliminar Esta Profissão? Esta Acção Não Poderá Ser Desfeita!",
        })
        if (deleteStatus.isConfirmed) {
            try {
                const response = await api.delete(`/professions/${id}/force`, headerConfig())
                console.log(response)

                showSweetAlert({
                    title: "Sucesso",
                    text: "Profissão Eliminada com sucesso!",
                    icon: "success"
                }).then(() => {
                    window.location.reload()
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
    return {
        deleteProfission
    }
}
