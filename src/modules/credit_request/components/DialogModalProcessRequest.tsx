import Button from '@/shered-elements/components/Button'
import Input from '@/shered-elements/components/Input'
import { images } from '@/shered-elements/constents/Images'
import { Modal } from '@mui/material'
import { X } from 'lucide-react'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type DialogModalProps = {
    isPonded: boolean
    pdfFileRef: any
    setIsPonded: (value: boolean) => void
    ButtonSubmit: () => void,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
}

export default function DialogModalProcessRequest({
    isPonded,
    pdfFileRef,
    setIsPonded,
    ButtonSubmit,
    setFile
}: DialogModalProps) {
    const [imageOFPost, setImageOFPost] = useState<boolean>(false)
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file) {
            const preview = URL.createObjectURL(file)
            console.log(preview)
        }
    }, [])




    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div>
            <Modal open={isPonded} className="flex items-center justify-center">
                <div className="p-5 bg-white rounded w-11/12 md:w-1/2">
                    <div>
                        <div className="flex justify-between">
                            <label className="flex">
                                <p className="text-red">*</p>Anexar Comprovativo
                            </label>
                            <X size={30} className="cursor-pointer" onClick={() => setIsPonded(false)} />
                        </div>

                        <div style={{ width: '100%', height: 350 }}>
                            <div {...getRootProps()} className="border flex justify-center items-center border-dashed border-zinc-400 p-10 mt-10 h-[350px]">
                                <input
                                    {...getInputProps()}
                                    className="hidden"
                                    accept="application/pdf"
                                    ref={pdfFileRef}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setFile(e.target.files[0]);
                                            setImageOFPost(true)
                                        }
                                    }}
                                    id="pdfUpload"
                                />
                                <div className="flex flex-col justify-center items-center">
                                    {isDragActive ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8 text-gray-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 10v6m3-3H9m6.75-11.25H6.75A2.25 2.25 0 004.5 4.5v15A2.25 2.25 0 006.75 21h10.5a2.25 2.25 0 002.25-2.25V9L15.75 2.25z"
                                            />
                                        </svg>
                                    ) : (
                                        <>

                                            <img src={images.UploudIcon} alt="upload" />
                                            <label htmlFor='pdfUpload'>
                                                Arraste o  pdf aqui ou{' '}
                                                <span className="font-bold">escolha nos seus ficheiros</span>
                                            </label>
                                        </>
                                    )}
                                    {imageOFPost && <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png' alt="preview" className="w-20 mt-4" />}
                                </div>
                            </div>
                        </div>
                        <div className=" mt-2">
                            <label className='text-gray-500'>Número de Transação   </label>
                            <div className='mt-2'>
                                <Input
                                    name='maximum_number_of_plan_operations'
                                    type='number'
                                    placeholder='Número de Transação '
                                    required={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <Button
                            name="Confirmar"
                            type="button"
                            typeOfButtonCustom="fullBg"
                            onclick={ButtonSubmit}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
