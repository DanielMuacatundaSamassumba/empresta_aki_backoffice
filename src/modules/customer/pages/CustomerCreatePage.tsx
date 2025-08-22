import BackButtton from '@/shered-elements/components/BackButtton';
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop'
import { images } from '@/shered-elements/constents/Images';
import Input from '@/shered-elements/components/Input';
import { ChevronLeft, CloudUpload } from 'lucide-react';
import FormUtils from '../utils/FormCreateUtils';
import LoaderComponent from '@/shered-elements/utils/LoaderComponent';
import useListProfissions from '../services/useListProfissions';
import Select from 'react-select';
import useListBanks from '../services/useListBanks';
import { useState } from 'react';
import Header from '@/shered-elements/components/Header';
import useSessionTimeout from '@/hooks/useSessionTimeout';
import AuthModal from '@/shered-elements/components/AuthModal';
export default function CustomerCreatePage() {
    const [menuIsOpened, setMenuIsOpened] = useState(false)

    const {
        nextStep,
        formRef,
        frontalBiImageRef,
        backBiImageRef,
        backBiImage,
        frontalImage,
        frontalImageRef,
        handleChangeFrontalImage,
        handleChangeBackImageBi,
        handleChangeFrontalImageBi,
        formControl,
        setFormControl,
        handleChange,
        formData,
        handleSubmit,
        frontalBiImage,
        isLoding,
        bank_code,
        country_prefix,


    } = FormUtils()

    const { AllProfissionData }: { AllProfissionData: { value: string; label: string }[] } = useListProfissions()
    const { AllBanksData }: {
        AllBanksData: {
            value: {
                id: string;
                bank_name: string;
                short_name: string;
                country_prefix: string;
                bank_prefix: string;
            };
            label: string;
        }[]
    } = useListBanks()
    const { timeSession } = useSessionTimeout()

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

                <div className='flex flex-row w-full'>
                    <div className='flex flex-col w-full h-full'>
                        <Header />

                        <div className="h-full  flex flex-col ">
                            <div className='p-8 w-full'>
                                <BackButtton />
                            </div>
                            <form className='w-full flex flex-col justify-center items-center' ref={formRef} onSubmit={handleSubmit}>
                                <div className='flex  justify-between w-full md:w-1/2'>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div className={formControl == 0 ? "bg-blue w-25 h-25  flex justify-center items-center rounded-full" : " w-25 h-25  flex justify-center items-center rounded-full border border-zinc-500 p-4"}>
                                            <img
                                                src={formControl == 0 ? images.TaskIconWhite : images.TaskIconBlue}
                                                alt="profile-icon"
                                                className='w-20'
                                            />
                                        </div>
                                        <p className='text-blue font-semibold mt-2 text-center'>Dados Pessoas</p>

                                    </div>

                                    <div className='flex flex-col justify-center items-center'>
                                        <div className={formControl == 1 ? "bg-blue w-25 h-25  flex justify-center items-center rounded-full" : " w-25 h-25  flex justify-center items-center rounded-full border border-zinc-500 p-4"}>
                                            <img
                                                src={formControl == 1 ? images.ProfileIconWhite : images.ProfileIconBlue}
                                                alt="profile-icon"
                                                className='w-20'
                                            />
                                        </div>
                                        <p className='text-blue text-center font-semibold mt-2'>Carregar Documentos</p>
                                    </div>

                                    <div className='flex flex-col justify-center items-center'>
                                        <div className={formControl == 2 ? "bg-blue w-25 h-25  flex justify-center items-center rounded-full" : " w-25 h-25  flex justify-center items-center rounded-full border border-zinc-500 p-4"}>
                                            <img
                                                src={formControl == 2 ? images.bankIconWhite : images.bankIconBlue}
                                                alt="profile-icon"
                                                className='w-20'
                                            />
                                        </div>
                                        <p className='text-blue font-semibold mt-2 text-center'>Metodos de Pagamento</p>
                                    </div>


                                </div>
                                {
                                    formControl == 0 && (
                                        <div className='bg-white w-11/12 p-6  rounded mt-5 md:w-1/2'>
                                            <div className='w-full'>
                                                <h1 className='text-2xl font-bold text-center text-font-color'>Dados Pessoas</h1>
                                                <span className='border-t-2 border-dashed border-zinc-400 block mt-5'></span>
                                            </div>
                                            <div className='mt-4'>
                                                <div>
                                                    <label htmlFor="">Número do Bilhete de Identidade
                                                        <span className='text-red'>*</span>
                                                    </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="bi_number"
                                                            value={formData.bi_number}
                                                            onchage={handleChange}
                                                            required={true}
                                                            placeholder="Número do Bilhete de Identidade"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="">Nome Completo
                                                        <span className='text-red'>*</span>
                                                    </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onchage={handleChange}
                                                            required={true}
                                                            placeholder="Nome Completo"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="">Número de Telefone
                                                        <span className='text-red'>*</span>
                                                    </label>
                                                    <div className='mt-2'>
                                                        <input
                                                            type="number"
                                                            name="phone_number"
                                                            value={formData.phone_number}
                                                            onChange={(e) => {
                                                                if (e.target.value.length < 10) {
                                                                    handleChange(e)
                                                                    return;
                                                                }
                                                                return;
                                                            }}
                                                            required={true}

                                                            placeholder="Número de Telefone"
                                                            className={"border border-zinc-300 w-full p-3 rounded outline-none text-red-00 bg-white"}

                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="">Ocupação
                                                        <span className='text-red'>*</span>
                                                    </label>
                                                    <div className='mt-2' >
                                                        <Select
                                                            placeholder="Selecione uma Profissão"
                                                            className="w-full p-1 border border-zinc-400 rounded outline-none"
                                                            required
                                                            name="profission_id"
                                                            onChange={(newValue) =>
                                                                handleChange({
                                                                    target: {
                                                                        name: "profission_id",
                                                                        value: newValue?.value || "",
                                                                    },
                                                                } as any)
                                                            }
                                                            value={AllProfissionData.find(
                                                                (option) => option.value === formData.profission_id
                                                            )}
                                                            options={AllProfissionData}
                                                            noOptionsMessage={() => "Profissão não disponível"}
                                                            styles={{
                                                                control: (base) => ({
                                                                    ...base,
                                                                    border: "none",
                                                                    padding: "0px",
                                                                    borderRadius: "8px",
                                                                    boxShadow: "none",
                                                                }),
                                                            }}
                                                        />

                                                    </div>
                                                </div>
                                                <div className='mt-2'>
                                                    <label htmlFor="">Rendimento Mensal
                                                        <span className='text-red'>*</span>
                                                    </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="monthlyIincome"
                                                            value={formData.monthlyIincome}
                                                            onchage={handleChange}
                                                            required={true}
                                                            placeholder="Rendimento Mensal"
                                                        />
                                                    </div>
                                                </div>

                                                <div className='mt-2'>
                                                    <label htmlFor="">Estado Civil
                                                        <span className='text-red'>*</span>
                                                    </label>
                                                    <div className='mt-2'>
                                                        <select 
                                                        name="marital_status"
                                                            value={formData.marital_status}
                                                            onChange={handleChange}
                                                            required
                                                            className={"border border-zinc-300 w-full p-3 rounded outline-none text-red-00 bg-white"}
                                                        >
                                                            <option value="">Selecione</option>
                                                            <option value="solteiro(a)">Solteiro(a)</option>
                                                            <option value="divorciado(a)">Divorciado(a)</option>
                                                            <option value="viúvo(a)">Viúvo(a)</option>
                                                            <option value="casado(a)">Casado(a)</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="">Email

                                                    </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onchage={handleChange}
                                                            required
                                                            placeholder="exemplo@gmail.com(optional)"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="">Data de Nascimento

                                                    </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="date"
                                                            name="birtday_date"
                                                            value={formData.birtday_date}
                                                            onchage={handleChange}
                                                            required
                                                            placeholder="exemplo@gmail.com(optional)"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor=""> Casa Nº </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="house_number"
                                                            value={formData.house_number}
                                                            onchage={handleChange}
                                                            required
                                                            placeholder="Casa Nº"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor=""> Bairro  </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="neighbourhood"
                                                            value={formData.neighbourhood}
                                                            onchage={handleChange}
                                                            required
                                                            placeholder="Bairro"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor=""> Rua </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="street"
                                                            value={formData.street}
                                                            onchage={handleChange}
                                                            required
                                                            placeholder="Rua"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor=""> Província </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="province"
                                                            value={formData.province}
                                                            onchage={handleChange}
                                                            required
                                                            placeholder="Província"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor=""> Munícipio </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="municipality"
                                                            value={formData.municipality}
                                                            onchage={handleChange}
                                                            required
                                                            placeholder="Munícipio"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='text-zinc-600'>Enviar as Credencias  de acesso para o aplicativo ? </p>
                                                    <div className='mt-2'>
                                                        <input
                                                            onChange={handleChange}
                                                            type="radio"
                                                            name='recive_message'
                                                            id='radio'
                                                            value={"sendToPhone"}
                                                            required
                                                        />
                                                        <label className='ml-2 cursor-pointer' htmlFor='radio'>Para  o Número de Telefone</label>
                                                    </div>
                                                    <div className='mt-2'>
                                                        <input
                                                            type="radio"
                                                            name='recive_message'
                                                            id='radio_1'
                                                            value={"sendToEmail"}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label className='ml-2 cursor-pointer' htmlFor='radio_1'>Por Email</label>
                                                    </div>

                                                    <div className='mt-2'>
                                                        <input
                                                            type="radio"
                                                            name='recive_message'
                                                            id='radio_2'
                                                            required
                                                            value={"NotSend"}
                                                            onChange={handleChange}
                                                        />
                                                        <label className='ml-2 cursor-pointer' htmlFor='radio_2'>Não Enviar</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    formControl == 1 && (
                                        <div className='bg-white w-11/12  p-6  rounded mt-5 md:w-1/2'>
                                            <div>
                                                <label className=''>Carregue  o seu B.I
                                                    <span className='text-red'>*</span>
                                                </label>
                                                <div className=' bg-zinc-500 h-50 rounded mt-4 flex  flex-col justify-center items-center relative'>
                                                    <label htmlFor="fileInput" className='flex flex-col cursor-pointer justify-center items-center'>
                                                        <CloudUpload color='#fff' size={50} />
                                                        <span className='text-white text-center'>Selecione a Parte Frontal do Bilhete de Identidade</span>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id='fileInput'
                                                        className='hidden'
                                                        accept="image/*"
                                                        ref={frontalBiImageRef}
                                                        onChange={(e: any) => handleChangeFrontalImageBi(e)}
                                                        required
                                                    />
                                                    <div >
                                                        <img src={frontalBiImage}
                                                            className='w-15  '
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>

                                                <div className=' bg-zinc-500 h-50 rounded mt-4 flex  flex-col justify-center items-center relative'>
                                                    <label htmlFor="imageBack" className='flex flex-col justify-center items-center cursor-pointer'>
                                                        <CloudUpload color='#fff' size={50} />
                                                        <span className='text-white text-center'>Selecione a Parte Traseira do Bilhete de Identidade</span>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id='imageBack'
                                                        className='hidden'
                                                        accept="image/*"
                                                        ref={backBiImageRef}
                                                        onChange={(e: any) => handleChangeBackImageBi(e)}
                                                        required

                                                    />
                                                    <div >
                                                        <img src={backBiImage}
                                                            className='w-15  '
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mt-4'>
                                                <label className=''>Foto do Rosto
                                                    <span className='text-red'>*</span>
                                                </label>
                                                <div className=' bg-zinc-500 h-50 rounded mt-4 flex  flex-col justify-center items-center relative'>
                                                    <label htmlFor="imageFrontal" className='flex flex-col justify-center items-center cursor-pointer'>
                                                        <CloudUpload color='#fff' size={50} />
                                                        <span className='text-white'>
                                                            Foto do Rosto do Cliente
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id='imageFrontal'
                                                        className='hidden'
                                                        accept="image/*"
                                                        ref={frontalImageRef}
                                                        onChange={(e: any) => handleChangeFrontalImage(e)}

                                                        required
                                                    />
                                                    <div >
                                                        <img src={frontalImage}
                                                            className='w-15  '
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    formControl == 2 && (
                                        <div className='bg-white w-11/12  p-6  rounded mt-5 md:w-1/2'>
                                            <div>
                                                <label htmlFor=""> Nome do Banco

                                                </label>
                                                <div className='mt-2'>
                                                    <Select
                                                        placeholder={"Selecione uma Profissão"}
                                                        className="w-full p-1 border border-zinc-400 rounded outline-none"
                                                        required
                                                        name="bank_id"
                                                        options={AllBanksData}
                                                        value={AllBanksData.find(option => option.value.id === formData.bank_id)}
                                                        onChange={(newValue) => {
                                                            handleChange({
                                                                target: {
                                                                    name: "bank_id",
                                                                    value: newValue?.value || ""
                                                                }
                                                            } as any);

                                                        }}
                                                        noOptionsMessage={() => "Profissão não disponível"}
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                border: "none",
                                                                padding: "0px",
                                                                borderRadius: "8px",
                                                                boxShadow: "none"
                                                            })
                                                        }}
                                                    />

                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor=""> IBAN

                                                </label>
                                                <div className={"border border-zinc-400 w-full p-3 rounded outline-none text-red-00 bg-white flex"}>
                                                    <input type="text"
                                                        disabled
                                                        className='outline-none w-20 text-font-color'
                                                        value={country_prefix + "" + bank_code}
                                                    />
                                                    <input
                                                        className='w-full outline-none ml-2'
                                                        type="text"
                                                        name="iban"
                                                        value={formData.iban}
                                                        onChange={handleChange}
                                                        required
                                                        minLength={21}
                                                        maxLength={21}

                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor=""> Número de Conta
                                                </label>
                                                <div className='mt-2'>
                                                    <Input
                                                        type="text"
                                                        name="accountNumber"
                                                        value={formData.accountNumber}
                                                        onchage={(e) => {
                                                            if (e.target.value.length != 12) {
                                                                handleChange(e)
                                                            }
                                                        }}
                                                        required
                                                        placeholder="Número da Conta"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor=""> Número do Multicaixa Express (Opcional)
                                                </label>
                                                <div className='mt-2'>
                                                    <input
                                                        type="number"
                                                        name="multicaixaExpress"
                                                        value={formData.multicaixaExpress}
                                                        onChange={(e) => {
                                                            if (e.target.value.length < 10) {
                                                                handleChange(e)
                                                                return;
                                                            }

                                                            return;
                                                        }}
                                                        minLength={9}
                                                        maxLength={9}
                                                        className={"border border-zinc-300 w-full p-3 rounded outline-none text-red-00 bg-white"}
                                                        required
                                                        placeholder="Número do Multicaixa Express (Opcional)"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }
                                <div className='flex justify-end w-11/12 md:w-1/2'>
                                    {
                                        formControl > 0 && (
                                            <div className='bg-blue ml-2 text-white cursor-pointer  mt-2 p-3 rounded flex' onClick={() => setFormControl((prev: any) => prev < 0 ? 0 : prev - 1)}>

                                                <ChevronLeft className='rotate' />
                                                <span>Voltar</span>
                                            </div>
                                        )
                                    }
                                    {
                                        formControl != 2 && (
                                            <div className='bg-blue ml-2 text-white cursor-pointer  mt-2 p-3 rounded flex' onClick={nextStep}>
                                                <span>Proximo</span>
                                                <ChevronLeft className='rotate-180' />
                                            </div>
                                        )
                                    }
                                    {
                                        formControl == 2 && (
                                            <button className='bg-blue ml-2 text-white cursor-pointer  mt-2 p-3 rounded flex' type='submit'>
                                                <span>Criar Conta</span>

                                            </button>
                                        )
                                    }

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {
                    isLoding && (
                        <LoaderComponent />
                    )
                }

            </div>
            {
                timeSession && (
                    <div className=' flex justify-center w-full'>
                        <AuthModal />
                    </div>
                )
            }
        </div>

    )
}
