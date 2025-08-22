
import { UseDarkMode } from '@/context/ThemeProvider'
import TopElementForAllForm from '@/shered-elements/components/TopElementForAllForm'
import Input from '@/shered-elements/components/Input'
import Button from '@/shered-elements/components/Button'
import UseNewPassword from '@/hooks/UseNewPassword'
import AlertMessage from '@/shered-elements/utils/AlertMessage'
import LoaderComponent from '@/shered-elements/utils/LoaderComponent'
export default function NewPasswordPage() {
    const themeContext = UseDarkMode()
    const { handleSubmit,
        register,
        OnSumbit,
        message,
        isLoading,
        isError,
        errors } = UseNewPassword()
    const { darkMode } = themeContext || { darkMode: false, setDarkMode: () => { } }
    return (
        <div className={darkMode ? 'min-h-svh bg-zinc-900 w-full flex flex-col justify-center items-center' : 'min-h-svh bg-background w-full flex flex-col justify-center items-center'}>
            {
                isError == true && (
                    <div className='w-11/12 md:w-1/3'>
                        <AlertMessage
                            message={message}
                            statusOfMessege='error'
                        />
                    </div>
                )
            }
            {
                isError == false && (
                    <div className='w-11/12 md:w-1/3'>
                        <AlertMessage
                            message={"Senha Alterada com sucesso!"}
                            statusOfMessege='success'
                        />
                    </div>
                )
            }
            <form className={darkMode ? 'w-11/12 bg-zinc-800 mt-5  rounded-sm  flex flex-col  items-center p-5 md:w-8/12  lg:w-1/2 xl:w-4/12' : 'w-11/12 bg-white border-1 border-green rounded-sm  flex flex-col  items-center p-5 md:w-8/12  lg:w-1/2 xl:w-4/12'}
                onSubmit={handleSubmit(OnSumbit)}
            >
                <TopElementForAllForm
                    title='Crie uma palavra-passe Nova'
                    paragraph=' Enviamos um codigo de confirmação ao seu endereço de email'
                />
                <div className='w-full mt-2'>
                    <div className='mb-3'>
                        <label className={darkMode ? "text-white" : " text-font-color"}>Nova palavra-passe</label>
                    </div>
                    <Input
                        name='newPassword'
                        type='password'
                        placeholder='*******************'
                        register={register}
                        errors={errors}
                    />
                </div>

                <div className='w-full mt-2'>
                    <div className='mb-3'>
                        <label className={darkMode ? "text-white" : " text-font-color"}>Confirme a nova palavra-passe</label>
                    </div>
                    <Input
                        name='confNewPassword'
                        type='password'
                        placeholder='*******************'
                        register={register}
                        errors={errors}
                    />
                </div>
                <div className='w-full mt-5'>
                    <Button
                        name='Verificar'
                        type="submit"
                        typeOfButtonCustom='fullBg'
                        style='border-none p-4 bg-green w-full text-white rounded cursor-pointer'

                    />
                </div>
            </form>
            {
                isLoading && (
                    <LoaderComponent />
                )
            }
        </div>
    )
}
