import { Modal } from '@mui/material'
import { useState } from 'react'
import TopElementForAllForm from './TopElementForAllForm'
import Button from './Button'
import UseLogin from '@/hooks/UseLogin'
import Input from './Input'
import LoaderComponent from '../utils/LoaderComponent'
import OtpVerifyReelogin from '../utils/OtpVerifyReelogin'

export default function AuthModal() {
    const [code, setCode] = useState("")
    const dataUser = localStorage.getItem("dataUser")
    const { handleVerifyOtpCode } = OtpVerifyReelogin()
    const { Onsubmit, handleSubmit, register, modalAuthControl, loaderControl, } = UseLogin()
    const email = dataUser ? JSON.parse(dataUser).email : ""
    return (
        <div className='bg-white'>
            <Modal open={true} className='flex justify-center items-center  w-full'>
                <div className='bg-white  w-11/12 p-3 rounded md:w-1/2 xl:w-1/3'>
                    {
                        modalAuthControl == false && (
                            <div>
                                <TopElementForAllForm title={'Login'} paragraph={"O Tempo da sua Sessão Terminou ! Por favor Coloque a sua Palavra-pase "} />
                                <form onSubmit={handleSubmit(Onsubmit)}>
                                    <div className=' flex justify-center items-center mt-4'>
                                        <div className=' w-11/12 '>
                                            <label htmlFor="">Palavra-pase</label>
                                            <div className=' flex  items-center  justify-center  mt-2 border-zinc-400  rounded '>

                                                <Input
                                                    type='password'
                                                    placeholder='Palavra-pase'
                                                    name='password'
                                                    register={register}
                                                    required
                                                />

                                                <div className='hidden'>
                                                    <Input
                                                        type='email'
                                                        placeholder='Palavra-pase'
                                                        name='email'
                                                        register={register}
                                                        value={email}
                                                        required
                                                    />
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-center mt-4' >
                                        <div className='w-11/12'>
                                            <Button
                                                name='Entrar'
                                                type='submit'
                                                typeOfButtonCustom='fullBg'
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )
                    }
                    {
                        modalAuthControl == true && (
                            <div>
                                <TopElementForAllForm title={'OTP'} paragraph={" Adicione o Codigo otp enviado para o seu email !"} />
                                <div className='flex justify-center items-center mt-4'>
                                    <div className='w-11/12'>
                                        <div>
                                            <label className='text-zinc-500'>Codigo OTP</label>
                                            <div className='w-full mt-4'>
                                                <input
                                                  min={6}
                                                  maxLength={6}
                                                    className='p-3  border border-zinc-300 outline-none rounded w-full'
                                                    onChange={(e) => setCode(e.target.value)}
                                                />
                                            </div>

                                            <div className='flex justify-center mt-4' >
                                                <div className='w-full'>
                                                    <Button
                                                        name='Confirmar'
                                                        type='button'
                                                        typeOfButtonCustom='fullBg'
                                                        onclick={() => handleVerifyOtpCode(code, email)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Modal>
            {
                loaderControl && (
                    <div>
                        <LoaderComponent />
                    </div>
                )
            }
        </div>
    )
}
