import { api } from "@/api/api";
import { headerConfig } from "@/shered-elements/utils/headers";
import { sweetAlertConfirm } from "@/shered-elements/utils/SweetAlertConfirm";
import { useState } from "react";
import { showSweetAlert } from "@/shered-elements/utils/SweetAlertCustom";

export function deletePlan() {

  const [loaderControlDelete, setLoaderControlDelete] = useState<boolean>(false)
  async function DeletePlan(id: string) {
    const deleteStatus = await sweetAlertConfirm({
      "title": "Atenção",
      "text": "Tens Certeza que Pretende Eliminar Este Plano? Esta Acção Não Poderá Ser Desfeita!",
    })
    if (deleteStatus) {
      setLoaderControlDelete(true)
      try {

        //const newData = dataPlans.filter(plan => plan.id !== id)
        await api.delete(`/plan/move/trash/${id}`, headerConfig())
        showSweetAlert({
          title: "Sucesso",
          text: "Plano activado com sucesso!",
          icon:"success"
        }).then((result)=>{
           if(result.isConfirmed){
             window.location.reload()
           }
        })


      } catch (error) {
        console.error(error)
      } finally {
        setLoaderControlDelete(false)
      }
    }
  }
  return {
    DeletePlan,
    loaderControlDelete
  }
}