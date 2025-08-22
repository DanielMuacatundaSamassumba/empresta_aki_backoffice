import Button from '@/shered-elements/components/Button'
import Input from '@/shered-elements/components/Input'
import UseLogin from '@/hooks/UseLogin'
import { Link } from 'react-router-dom'
import TopElementForAllForm from '@/shered-elements/components/TopElementForAllForm'
import { UseDarkMode } from '@/context/ThemeProvider'
import LoaderComponent from '@/shered-elements/utils/LoaderComponent'
import AlertMessage from '@/shered-elements/utils/AlertMessage'
export default function LoginPage() {
  const { handleSubmit, Onsubmit, errors, register, loaderControl, IsErrorMessage, message  } = UseLogin()
  const themeContext = UseDarkMode()

  const { darkMode } = themeContext || { darkMode: false, setDarkMode: () => { } }
  return (
    <div className={darkMode ? 'min-h-svh bg-zinc-900 w-full flex flex-col justify-center items-center' : 'min-h-svh bg-background w-full flex flex-col justify-center items-center'}>
      {
        IsErrorMessage == false ? (
          <div className='w-11/12 md:w-1/3'>
            <AlertMessage 
            message='Login Efetuado com sucesso!'
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
      <form className={darkMode ? 'w-11/12 bg-zinc-800   rounded-sm  flex flex-col mt-4 items-center p-5 md:w-8/12  lg:w-1/2 xl:w-4/12' : 'w-11/12 bg-white border-1 mt-4 border-green rounded-sm  flex flex-col  items-center p-5 md:w-8/12  lg:w-1/2 xl:w-4/12'}
        onSubmit={handleSubmit(Onsubmit)}
      >
        <TopElementForAllForm
          title='Seja Bem-vindo'
          paragraph=' Ao backoffice do aplicativo EmprestAki !
                Faça a gestão do aplicativo de maneira
                facíl e eficiente sem complicações'

        />

        <div className='w-full mt-2'>
          <div className='mb-3'>
            <label className={darkMode ? "text-white" : " text-font-color"}>Email</label>
          </div>
          <Input
            name='email'
            type='email'
            errors={errors}
            register={register}
            placeholder='exemplo@gmail.com'
          />
        </div>

        <div className='w-full '>
          <div className='mb-3'>
            <label className={darkMode ? "text-white" : " text-font-color"}>Palavra-passe</label>
          </div>

          <Input
            name='password'
            type='password'
            register={register}
            errors={errors}
            placeholder='**************'
          />
        </div>

        <div className='w-full flex  justify-end'>
          <Link to={"reset-password"} className={darkMode ? "text-white font-semibold text-end mt-2  cursor-pointer" : "text-blue font-semibold text-end mt-2  cursor-pointer"}>Esqueceu a sua Senha ?</Link>
        </div>

        <div className='w-full mt-5'>
          <Button
            name='Entrar'
            type="submit"
            typeOfButtonCustom='fullBg'
            style='border-none p-4 bg-green w-full text-white rounded cursor-pointer'
          />
        </div>
      </form>

      <div>

      </div>
      {
        loaderControl && (
          <LoaderComponent />
        )

      }
    </div>
  )
}
