import { Modal } from '@mui/material'
import type { DialogModalProps } from '../types/CreditRequestDataType'
import Button from '@/shered-elements/components/Button'
import { X } from 'lucide-react'
import JoditEditor from 'jodit-react';
import { useLocation } from 'react-router-dom'
export default function DialogModalForNotAcceptCredit(params: DialogModalProps) {
    const { isPonded, setMessage, message, setIsPonded, ButtonSubmit, editor, config } = params
    const location = useLocation()
    const { data:dataOfCredit } = location.state
    return (
        <div className="">
            <Modal open={isPonded} className='flex items-center justify-center' >
                <div className="p-5 bg-white rounded w-11/12  md:w-1/2">
                    <div>
                        <div className='flex justify-between'>
                            <label className='flex'><p className='text-red'>*</p>A Razão</label>
                            <X size={30} className='cursor-pointer' onClick={() => setIsPonded(false)} />
                        </div>
                        <div style={{ width: " 100%", height: 450 }}>
                            <JoditEditor
                                ref={editor}
                                value={dataOfCredit.reason_for_rejection ? dataOfCredit.reason_for_rejection: message }
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setMessage(newContent)}
                                onChange={newContent => { console.log(newContent) }}
                                
                            />
                            
                        </div>
                       
                    </div>
                    <div className='mt-4'>
                        <Button
                            name='Confirmar'
                            type='button'
                            typeOfButtonCustom='fullBg'
                            onclick={ButtonSubmit}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
