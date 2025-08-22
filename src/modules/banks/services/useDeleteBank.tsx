import { api } from '@/api/api'
import { headerConfig } from '@/shered-elements/utils/headers'
import { sweetAlertConfirm } from '@/shered-elements/utils/SweetAlertConfirm'
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom'
import useBanks from './useBanks'

export default function useDeleteBank() {
    const { setLoaderControl } = useBanks()
    async function handleDeleteBank(id: string) {
        const deleteStatus = await sweetAlertConfirm({
            "title": "Atenção",
            "text": "Tens Certeza que Pretende Eliminar Este Banco? Esta Acção Não Poderá Ser Desfeita!",
        })
        if (deleteStatus.isConfirmed) {
            setLoaderControl(true)
            try {
                const response = await api.delete(`/bank/move/trash/${id}`, headerConfig())
                console.log(response)
                showSweetAlert({
                    title: "Sucesso",
                    text: "Banco Apagado com sucesso!",
                    icon: "success"
                }).then(() => {
                    window.location.reload()
                })
                setLoaderControl(false)
            } catch (error) {
                console.error(error)
                setLoaderControl(false)
            }
        }

    }
    return {
        handleDeleteBank,

    }
}
