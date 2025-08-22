import Modal from '@mui/material/Modal'
import { images } from '../constents/Images'

export default function LoaderComponent() {
    return (
        <div>
            <Modal  open={true}>
                 <div className='flex justify-center items-center h-full'>
                     <img src={ images.logo} alt="image-logo-emprestaaki"  className='w-40 animate-bounce'/>
                 </div>
            </Modal>
        </div>
    )
}
