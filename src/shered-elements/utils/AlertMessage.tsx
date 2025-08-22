import { Alert } from '@mui/material'
import type { AlertMessage } from '../types/AlertMessage'

export default function AlertMessage(params:AlertMessage) {
    const { message, statusOfMessege } = params
    return (
        <div className='flex justify-center'>
            <Alert variant="filled" severity={statusOfMessege}  sx={{width:"100%"}}>
              {message}
            </Alert>
        </div>
    )
}
