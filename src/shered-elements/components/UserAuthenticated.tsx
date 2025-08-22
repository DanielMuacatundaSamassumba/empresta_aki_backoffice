import { useState } from 'react';
import { Avatar, Menu, MenuItem, Modal } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Moon, Sun, User } from 'lucide-react';
import { images } from '../constents/Images';
import { UseDarkMode } from '@/context/ThemeProvider';
import { colors } from "@/shered-elements/constents/Colors"
import { useNavigate } from 'react-router-dom';
export default function UserAuthenticated() {
  const themeContext = UseDarkMode()
  const { darkMode, setDarkMode } = themeContext || { darkMode: false, setDarkMode: () => { } }
  const [darkControlButton, setDarkModeControlButton] = useState(false)
  const [logoutButtonControl, setLogoutButtonControl] = useState(false)
  const navegate = useNavigate()
  return (
    <div>
      <PopupState variant="popover" popupId="demo-popup-menu" >
        {(popupState) => (
          <>
            <Avatar
              {...bindTrigger(popupState)}
              className="cursor-pointer"
            >
              H
            </Avatar>
            <Menu {...bindMenu(popupState)} className='mt-6'>
              <MenuItem onClick={popupState.close} onClickCapture={() => setLogoutButtonControl(true)}>
                <div className="flex cursor-pointer w-full">
                  <img
                    src={images.logoutIcon}
                    alt="logout-icon"
                    className={"w-7"}
                  />
                  <h1 className="text-font-color text-xl ml-1">Sair</h1>
                </div>
              </MenuItem>
              <MenuItem onClick={popupState.close}>
                <div className={"flex flex-row items-between w-full"}>
                  {darkControlButton ?
                    <Moon className='text-blue ml-2' size={30} />
                    :
                    <Sun className='text-blue' size={30} />

                  }

                  <div className={darkControlButton ? 'ml-2 h-6 w-12 rounded-full flex items-center justify-end border border-green' : "ml-2 h-6 w-12 rounded-full flex items-center justify-start border border-green"}>
                    <div className='bg-blue h-4 w-4 ml-1 rounded-full' onClick={() => {
                      setDarkModeControlButton(!darkControlButton)
                      setDarkMode(!darkMode)
                    }}>

                    </div>

                  </div>

                </div>
              </MenuItem>

              <MenuItem onClick={popupState.close} className='text-font-color text-2xl ml-1'>
                <div className='flex items-center' onClick={()=>navegate("/profile")}>
                  <User color={colors.blue} size={30} />
                  <h1 className="text-font-color text-xl ml-1">Perfil</h1>
                </div>
              </MenuItem>

            </Menu>
          </>
        )}
      </PopupState>

      {

        <Modal
          open={logoutButtonControl}
          onClose={() => { }}

        >
          <div className=' flex justify-center h-full  items-center'>
            <div className='bg-white rounded w-11/12 flex flex-col justify-center items-center p-4 md:w-1/3'>
              <img src={images.logo} className='w-40' />
              <h1 className='text-2xl font-semibold text-zinc-500'>Deseja Sair da sua conta?</h1>
              <div className='bg-white rounded w-11/12 flex flex-row justify-center items-center mt-10'>
                <button className='p-3 text-white bg-green rounded w-1/3 text-xl cursor-pointer' onClick={() => setLogoutButtonControl(false)}>Cancelar</button>
                <button className='p-3 text-green border border-green rounded w-1/3 text-xl ml-5  cursor-pointer'
                  onClick={() => {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    localStorage.removeItem("session_expiry")
                    window.location.reload()

                  }}
                >Sair</button>

              </div>
            </div>
          </div>
        </Modal>

      }
    </div>
  );
}


<div className={'flex flex-col items-center justify-center mt-5 p-2 border-t-1 border-t-zinc-400'}>



</div>