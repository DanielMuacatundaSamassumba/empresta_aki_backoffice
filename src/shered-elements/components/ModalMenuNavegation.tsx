import { Modal } from '@mui/material'
import MenuNavegationForMobile from './MenuNavegationForMobile'
import type { ModalElementsType } from '@/modules/dashboard/types/ModalElemetsType'
import { images } from '@/shered-elements/constents/Images'
export default function ModalMenuNavegation(params:ModalElementsType) {
    const { menuIsOpened, setMenuIsOpened } = params
  return (
    <div>
         <Modal
                open={menuIsOpened}
                onClose={() => menuIsOpened}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className=" h-full">
                    <div className=" h-3/3 bg-white w-1/2 transition-all dark:bg-zinc-900">
                        <div className='flex flex-row-reverse justify-between p-2  border-zinc-400 border-b-1'>

                            <div className='flex flex-row justify-between w-full items-center'>

                                <div className='flex flex-row items-center'>
                                    <img
                                        src={images.logo}
                                        alt="menu-icon"
                                        className='w-12'
                                        onClick={() => setMenuIsOpened(!menuIsOpened)}
                                    />
                                    <h1 className='font-bold  text-blue'>EmprestaAki</h1>
                                </div>
                                <div>
                                    <img
                                        src={images.arrowMenuIcon}
                                        alt="menu-icon"
                                        className='w-5 ml-4'
                                        onClick={() => setMenuIsOpened(!menuIsOpened)}
                                    />
                                </div>
                            </div>

                        </div>
                        <MenuNavegationForMobile/>
                    </div>
                </div>
            </Modal>
    </div>
  )
}
