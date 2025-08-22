import {   useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
export default function usePayInstallment() {
    const [imageOfPdf, setImageOfPdf] = useState("")
    const [formData, setFormData] = useState({
        payment_method_id:"",
        cover_image: ""
    })

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        const imgFile = URL.createObjectURL(acceptedFiles[0]);
        setImageOfPdf(imgFile);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        multiple: false
    });
    return {
        formData,
      getRootProps, getInputProps, isDragActive,
        imageOFPost: imageOfPdf,
        setFormData
    }
}
