import { api } from '@/api/api'
import useStatusTypeUser from '@/shered-elements/services/useStatusTypeUser'
import { headerConfig } from '@/shered-elements/utils/headers'
import { sweetAlertConfirm } from '@/shered-elements/utils/SweetAlertConfirm'
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom'
import { useRef, useState } from 'react'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { typeOfStatus } from '../types/typeOfStatus'
import { StatusEnum } from '../types/CreditRequestDataType'
import Swal from 'sweetalert2'

export default function useRequestValidation() {
  const [modalIsOpended, setModalIsOpended] = useState(false)
  const [message, setMessage] = useState("")
  const [loaderControl, setLoaderControl] = useState(false)
  const [idofRejectRequest, setIdofRejectRequest] = useState<string | null>(null)
  const [typeOfAction, setTypeOfAction] = useState('')
  const [oPenModalProcessing, setoPenModalProcessing] = useState(false)
  const [iDofStatusAction, setIdOfStatusAction] = useState('')
  const [idMethod, setIDmetody] = useState('')
  const [file, setFile] = useState<File | null>(null);
  const pdfFileRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const { dataOfStatusUser } = useStatusTypeUser()
  const { data: dataOfCredit } = location.state
  const editor = useRef(null);
  console.log()
  const navegate = useNavigate()
  type RequestAction = "denied" | "approved" | 'pending' | 'process';
  const config = useMemo(() => ({
    readonly: false,
    height: "450px",
  }), []);



  async function requestValidation(type: RequestAction, id: string, methodId?: any) {
    const isConfirmed = await sweetAlertConfirm({
      title: 'Solicitação de Crédito',
      text:
        type === 'denied'
          ? 'Tens certeza que pretende Invalidar esta Solicitação de Crédito?'
          : type === 'pending'
            ? 'Tens certeza que deseja deixar esta Solicitação de Crédito como Pendente?'
            : 'Tens certeza que desejas Validar esta Solicitação de Crédito?'
    });

    if (isConfirmed.dismiss) return;
    if (type === 'denied') {
      setModalIsOpended(true)
      setIdofRejectRequest(id);
      setTypeOfAction(type)
      const filteredId = dataOfStatusUser
        ?.filter(item =>
          item.name === typeOfStatus.Analyst &&
          Array.isArray(item.status_type_status) &&
          item.status_type_status.some(
            sts => sts.status.name === StatusEnum.notValidated
          )
        );
      const filteredIdAtion = filteredId?.[0].status_type_status.filter(item => item.status.name == StatusEnum.notValidated)
      setIdOfStatusAction(String(filteredIdAtion && filteredIdAtion[0].status.status_id));
      return;
    }
    if (type === 'pending') {
      setModalIsOpended(true)
      console.log('teste------------------------------------------->')
      setIdofRejectRequest(id);
      setTypeOfAction('denied')
      const filteredId = dataOfStatusUser
        ?.filter(item =>
          item.name === typeOfStatus.Global &&
          Array.isArray(item.status_type_status) &&
          item.status_type_status.some(
            sts => sts.status.name === StatusEnum.Pending
          )
        );
      const filteredIdAtion = filteredId?.[0].status_type_status.filter(item => item.status.name == StatusEnum.Pending)
      setIdOfStatusAction(String(filteredIdAtion && filteredIdAtion[0].status.status_id));
      return;

    }
    if (type === 'process') {
      setoPenModalProcessing(true)
      setIdofRejectRequest(id);
      setTypeOfAction('process')
      setIDmetody(methodId)
      const filteredId = dataOfStatusUser
        ?.filter(item => item.name == typeOfStatus.Finance)
        .filter(item =>
          item.status_type_status.some(
            sts => sts.status.name == StatusEnum.processed
          )
        );

      setIdOfStatusAction(String(filteredId?.[0]?.status_type_status[0].status_id));
      return;

    }

    try {
      const endpoint = `/credit/request/${type}/${id}`;
      const response = await api.put(endpoint, {}, headerConfig());
      console.log(response);
      setLoaderControl(false);

      await showSweetAlert({
        title: 'Solicitação de Crédito',
        text: 'Solicitação Aceite com sucesso',
        icon: 'success'
      });

      navegate('/credit-request');

    } catch (error) {
      console.error(error);
      setLoaderControl(false);
      const errorMessage = (error as any)?.response?.data?.message || "Ocorreu um erro inesperado";
      showSweetAlert({
        title: "Erro",
        text: errorMessage,
        icon: "error"
      });
    }
  }
  const requestValidationWithModal = async () => {
    setLoaderControl(true);
    setoPenModalProcessing(false)
    try {
      console.log(pdfFileRef)
      const endpoint = `/credit/request/${typeOfAction}/${idofRejectRequest || dataOfCredit.id}`;
      const endepoint2 = `/credit/request/approved/financial/department/${idofRejectRequest || dataOfCredit.id}`
      const data = {
        reason_for_rejection: message,
        statu_id: iDofStatusAction,
        payment_method_id: idMethod,
        loan_id: idofRejectRequest
      }


      if (typeOfAction === 'process') {
        const response = await api.put(endepoint2, data, headerConfig())
        console.log(response)
        Swal.fire({
          title: "Sucesso!",
          text: "Operação concluída com sucesso",
          icon: "success",
          confirmButtonText: "OK"
        }).then((result) => {
          if (result.isConfirmed) {
           navegate("/credit-request") // Recarrega a página
          }
        })
        setLoaderControl(false)
        return
      }
      const token = localStorage.getItem("token")
      const response = await api.put(
        endpoint,
        data, // corpo da requisição (data) — pode ser um objeto vazio se não enviar nada
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
          }
        }
      )
      console.log(response);
      setLoaderControl(false)
      showSweetAlert({
        title: 'Solicitação de Crédito',
        text: ` ${typeOfAction == 'denied' ? 'Solicitação Alterada com sucesso ' : 'Solicitação Colocada como pendente com sucesso com sucesso'}`,
        icon: 'success'
      }).then(() => {
        navegate("/credit-request");
      });
      setLoaderControl(false);
      navegate('/credit-request');

    } catch (error) {
      console.error(error);
      console.log(idofRejectRequest)
      setLoaderControl(false);
      console.log(file)
      const errorMessage = (error as any)?.response?.data?.message || "Ocorreu um erro inesperado";
      showSweetAlert({
        title: "Erro",
        text: errorMessage,
        icon: "error"
      });
    }
  }




  return {
    requestValidation,
    loaderControl,
    modalIsOpended,
    message, setMessage,
    setModalIsOpended,
    requestValidationWithModal,
    editor,
    config,
    setoPenModalProcessing,
    oPenModalProcessing,
    pdfFileRef,
    setFile
  }
}
