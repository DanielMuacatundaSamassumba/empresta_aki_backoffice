import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
export default function useReimbursementPay() {
    const location = useLocation()
    const { data } = location.state
    const [checkAllControl, setCheckAllControl] = useState(false)
    const [imageOfPdf, setImageOfPdf] = useState(false)
    const uploudReasonFileRef = useRef(null)
    const [formData, setFormData] = useState<{
        payment_method_id?: string;
        proofPayemnt: File[];
    }>({
        payment_method_id: "",
        proofPayemnt: []
    })
    const [ammountOfReimbursement, setAmmountOfReimbursement] = useState<{ value: number, number: number }>({ value: 0, number: 0 });
    const [selectedInstallments, setSelectedInstallments] = useState<string[]>([]);

    const handleChangeValue = (id: string, value: number, checked: boolean, instalmenetNumber: number) => {
        if (checked) {
            setSelectedInstallments(prev => [...prev, id]);
            setAmmountOfReimbursement((prev) => ({ value: prev.value + Number(value), number: instalmenetNumber, id: id }));
        } else {
            setSelectedInstallments(prev => prev.filter(itemId => itemId !== id));
            setAmmountOfReimbursement((prev) => ({ value: prev.value - Number(value), number: instalmenetNumber - 1 }));
        }
    };

    const handleSelectAllInstament = (checked: boolean) => {
        if (checked) {
            setSelectedInstallments(data.creditRequestProcessed.installments.map((item: any) => item.id));
            const total = data.creditRequestProcessed.installments.reduce((acc: number, curr: any) => acc + Number(curr.installment_value), 0);
            setAmmountOfReimbursement({
                value: total,
                number: data.creditRequestProcessed.installments.length
            });
        } else {
            setSelectedInstallments([]);
            setAmmountOfReimbursement({ value: 0, number: 0 });
        }
    };



    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
       setFormData({
          proofPayemnt: acceptedFiles
       });
        setImageOfPdf(true);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': []
        },
        multiple: false
    });


    function  handleSubmit(){

    }
    return {
        handleChangeValue,
        handleSelectAllInstament,
        ammountOfReimbursement,
        setCheckAllControl,
        checkAllControl,
        selectedInstallments,
        getRootProps, getInputProps, isDragActive,
        imageOfPdf,
        handleSubmit,
        formData,
        uploudReasonFileRef
    }
}