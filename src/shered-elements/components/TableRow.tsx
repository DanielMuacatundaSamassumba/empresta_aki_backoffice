
import type { TableRowType } from '@/shered-elements/types/TableRowType'

export default function TableRow(params:TableRowType) {
    const {  plan, status_credit, status_refund, refund,pieces, id, credit} = params
  return (
    <div className='bg-white flex justify-between items-center p-4 rounded mt-2 text-font-color'>
        <p className='text-sm text-center'>{id}</p>
        <p className='text-sm'>{plan}</p>
        <p className='text-sm'>{pieces}</p>
        <p className='text-sm'>{credit}</p>
        <p className='text-sm'>{refund}</p>
        <p className='text-sm'>{status_credit}</p>
        <p className='text-sm'>{status_refund}</p>
        <button className='bg-green text-white p-2 rounded'>Saber Mais</button>
    </div>
  )
}
