import useSessionTimeout from '@/hooks/useSessionTimeout';
import AuthModal from '@/shered-elements/components/AuthModal';
import Header from '@/shered-elements/components/Header';
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop';
import { useState } from 'react'
import TopElementForAllForm from '@/shered-elements/components/TopElementForAllForm';
import Input from '@/shered-elements/components/Input';
import JoditEditor from 'jodit-react';
import useCreatePost from '../services/useCreatePost';
import { images } from '@/shered-elements/constents/Images';
import Button from '@/shered-elements/components/Button';
export default function BlogCreatePage() {
    const [menuIsOpened, setMenuIsOpened] = useState(false);
    const { time, timeSession } = useSessionTimeout()
    console.log(time, timeSession)
    const { 
        content,
        setContent,
        config,
        editor, getRootProps, getInputProps, isDragActive, imageOFPost } = useCreatePost()
    return (
        <div>
            <div className='bg-background min-h-svh w-full flex flex-row dark:bg-zinc-800'>
                <div className={`
            transition-all duration-500 ease-in-out
            ${menuIsOpened
                        ? 'h-screen w-28 bg-white dark:bg-zinc-900'
                       : 'h-screen w-1/4 bg-white dark:bg-zinc-900 hidden lg:block'
                    }
          `}>
                    <MenuNavegationForDesktop
                        menuIsOpened={menuIsOpened}
                        setMenuIsOpened={setMenuIsOpened}
                    />
                </div>

                {/* Main Content Area */}
                <div className='flex flex-row w-full'>
                    <div className='flex flex-col w-full h-full'>
                        <Header />

                        <div className="h-full  flex flex-row items-center justify-center">
                            <div className='flex justify-center w-full'>

                                <form className='bg-white border border-green rounded p-4 mt-30 w-11/12 lg:w-6/12'>
                                    <div>
                                        <TopElementForAllForm
                                            title='Criar Artigo'
                                        />
                                    </div>
                                    <div>
                                        <label className='flex'>
                                            <p className='text-red'>*</p>
                                            Titulo
                                        </label>
                                        <div className='mt-2'>
                                            <Input name={'title'} type={'text'} placeholder={'Titulo  do Artigo'} />
                                        </div>
                                    </div>
                                    <div style={{ width: " 100%", height: 350 }} className='mt-5'>
                                        <label className='flex'>
                                            <p className='text-red'>*</p>
                                            Conteúdo da Publicação
                                        </label>
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => setContent(newContent)}
                                            onChange={newContent => {console.log(newContent) }}
                                        />
                                    </div>
                                    <div {...getRootProps()} className="border border-dashed border-zinc-400 p-10 mt-10">
                                        <input {...getInputProps()} className="hidden" />
                                        <div className="flex flex-col justify-center items-center">
                                            {isDragActive ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-8 h-8 text-gray-600"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 10v6m3-3H9m6.75-11.25H6.75A2.25 2.25 0 004.5 4.5v15A2.25 2.25 0 006.75 21h10.5a2.25 2.25 0 002.25-2.25V9L15.75 2.25z"
                                                    />
                                                </svg>
                                            ) : (
                                                <>
                                                    <img src={images.UploudIcon} alt="upload" />
                                                    <p>
                                                        Arraste a imagem aqui ou <span className="font-bold">escolha nos seus ficheiros</span>
                                                    </p>
                                                </>
                                            )}
                                            {
                                                imageOFPost != "" && (
                                                    <img src={imageOFPost} alt="image-of-post" className='w-20' />
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className='mt-4'>
                                        <Button name={'Publicar'} typeOfButtonCustom={'fullBg'} type={'button'} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {
                timeSession && (
                    <div className=' flex justify-center w-full'>
                        <AuthModal />
                    </div>
                )
            }
        </div>
    );


}
