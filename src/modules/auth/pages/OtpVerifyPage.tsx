import Button from '@/shered-elements/components/Button'
import TopElementForAllForm from '@/shered-elements/components/TopElementForAllForm'
import UseOtpVerify from '@/hooks/UseOtpVerify'
import { Link } from 'react-router-dom'
import { UseDarkMode } from '@/context/ThemeProvider'
import ButtonReturn from '@/shered-elements/components/ButtonReturn'
import LoaderComponent from '@/shered-elements/utils/LoaderComponent'
import AlertMessage from '@/shered-elements/utils/AlertMessage'
export default function OtpVerifyPage() {
    const {
        otpData,
        handleChangeValue,
        isError,
        reFerences,
        handleBacksPacePressKey,
        handleSubmit,
        loaderControl,
        IsErrorMessage,
        message

    } = UseOtpVerify()
    const themeContext = UseDarkMode()
    const { darkMode,} = themeContext || { darkMode: false, setDarkMode: () => { } }
    return (
        <div className={'h-screen bg-background w-full flex flex-col overflow-y-hidden dark:bg-zinc-900 '} >
          
            <div className='w-full  p-5'>
                <ButtonReturn />
            </div>
            <div className=' w-full flex flex-col justify-center items-center  h-screen overflow-y-hidden'>
            {
                   IsErrorMessage == false ? (
                     <div className='w-11/12 md:w-1/3'>
                       <AlertMessage 
                       message='Codigo OPT Verficado com sucesso!'
                        statusOfMessege='success'
                       />
                     </div>  
                   ) :   IsErrorMessage == true ?(
                     <div className='w-11/12 md:w-1/3'>
                       <AlertMessage
                        message={ message}
                        statusOfMessege='error'
                       />
                     </div>
                   ):""
                 }
                <div className={'w-11/12 b bg-white dark:bg-zinc-800   rounded-sm  flex flex-col mt-4  items-center p-5 md:w-8/12  lg:w-1/2 xl:w-4/12'} >
                    <TopElementForAllForm
                        title='Codigo OTP'
                        paragraph='Enviamos um codigo de confirmação
                 ao seu endereço de email'
                    />
                    <div className='flex flex-row justify-between w-full mt-6 md:w-11/12'>
                        {
                            otpData?.map((item, i) => (
                                <div className='w-12 dark:text-white ml-2 md:w-20' key={i}  onClick={()=>item}>
                                    <input
                                        ref={(input) => { reFerences.current[i] = input; }}
                                        maxLength={1}
                                        onChange={(event) => handleChangeValue(event, i)}
                                        placeholder='0'
                                        name='0'
                                        value={otpData[i]}
                                        type='text'
                                        required
                                        className={isError ?
                                            "border border-red-600 text-center w-full p-3 rounded outline-none text-red-600"
                                            : otpData[i] != "" ?
                                                "border-2 border-green-600 text-center w-full p-3 rounded outline-none" :
                                                `${darkMode ? "border border-white w-full p-3 text-center text-white rounded outline-none" : "border border-zinc-400 w-full p-3 text-center rounded outline-none"}`
                                        }
                                        onKeyDown={(e) => handleBacksPacePressKey(e, i)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <div className='w-full  mt-4'>
                        <Button
                            name='Verificar'
                            type='button'
                            typeOfButtonCustom='fullBg'
                            onclick={() => handleSubmit(otpData)}
                        />
                    </div>
                    <div>
                        <div className='text-blue mt-4 dark:text-white'>
                            Relembrou a sua senha?
                            <Link to={"/"} className='ml-2 font-semibold'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
            {
              loaderControl && (
                <LoaderComponent/>
              )
            }
        </div>
    )
}
