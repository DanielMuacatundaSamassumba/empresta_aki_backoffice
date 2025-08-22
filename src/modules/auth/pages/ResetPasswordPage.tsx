import Button from '@/shered-elements/components/Button'
import Input from '@/shered-elements/components/Input'
import TopElementForAllForm from '@/shered-elements/components/TopElementForAllForm'
import { Link } from 'react-router-dom'
import UseResetPassword from '@/hooks/UseResetPassword'
import { UseDarkMode } from '@/context/ThemeProvider'

import ButtonReturn from '@/shered-elements/components/ButtonReturn'
import { Alert } from '@mui/material'
import LoaderComponent from '@/shered-elements/utils/LoaderComponent'
export default function ResetPasswordPage() {
    const { handleSubmit,
        Onsubmit,
        register,
        errors,
        isError,
        message, 
        isLoading
    } = UseResetPassword()
    const themeContext = UseDarkMode()
    const { darkMode } = themeContext || { darkMode: false, setDarkMode: () => { } }
    return (
        <div className={'h-screen bg-background w-full flex flex-col overflow-y-hidden dark:bg-zinc-900 '} >
            <div className='w-full  p-5'>
                <ButtonReturn />
            </div>
            <div className=' w-full flex flex-col justify-center items-center  h-screen overflow-y-hidden'>
                <div className="w-11/12 rounded-sm  flex flex-col  items-center p- md:w-8/12  lg:w-1/2 xl:w-4/12">
                    {
                        isError && (
                            <Alert severity="error"  sx={{ width:"100%"}}>
                                {message}
                            </Alert>
                        )
                    }
                </div>
                <form className={darkMode ? 'w-11/12 bg-zinc-800 mt-4   rounded-sm  flex flex-col  items-center p-5 md:w-8/12  lg:w-1/2 xl:w-4/12' : 'w-11/12 bg-white border-1 border-green rounded-sm mt-4  flex flex-col  items-center p-5 md:w-8/12  lg:w-1/2 xl:w-4/12'}
                    onSubmit={handleSubmit(Onsubmit)}
                >
                    <TopElementForAllForm
                        title='Esqueceu a sua Senha?'
                        paragraph='Não te preocupes ,Vamos te enviar instruções de como recuperar'
                    />
                    <div className='mt-3 w-full'>
                        <Input
                            name='email'
                            placeholder='exemplo@gmail.com'
                            type='email'
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className='mt-3 w-full'>
                        <Button
                            name='Recuperar'
                            type='submit'
                            typeOfButtonCustom='fullBg'
                        />
                    </div>
                    <div>
                        <div className={darkMode ? "text-white font-semibold text-end mt-2  cursor-pointer" : "text-blue font-semibold text-end mt-2  cursor-pointer"}>
                            Relembrou a sua senha?
                            <Link to={"/"} className='ml-2 font-semibold'>Login</Link>
                        </div>
                    </div>
                </form>
            </div>
   {
              isLoading && (
                <LoaderComponent/>
              )
            }
        </div>
    )
}
