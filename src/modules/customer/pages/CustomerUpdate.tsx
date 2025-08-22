import Select from "react-select"
import Header from '@/shered-elements/components/Header'
import MenuNavegationForDesktop from '@/shered-elements/components/MenuNavegationForDesktop';
import Input from '@/shered-elements/components/Input';
import Button from '@/shered-elements/components/Button';
import { CloudUpload } from 'lucide-react';
import FormuUpdateUtils from '../utils/FormUpdateUtils';
import LoaderComponent from '@/shered-elements/utils/LoaderComponent';
import useListBanks from '../services/useListBanks';
import useListProfissions from '../services/useListProfissions';
import { useState } from "react";
import AuthModal from "@/shered-elements/components/AuthModal";
import useSessionTimeout from "@/hooks/useSessionTimeout";
import useStatusPlan from "@/modules/plans/services/useStatusPlan";
import { handleStatusPlan } from "@/modules/plans/types/PlanDataType";
export default function CustomerUpdate() {
    const [menuIsOpened, setMenuIsOpened] = useState(false);
    const [buttonControl, setButtonControl] = useState(0)
    const { time, timeSession } = useSessionTimeout()
    console.log(time, timeSession)
    const { AllProfissionData }: { AllProfissionData: { value: string; label: string }[] } = useListProfissions()
    const { AllBanksData }: any = useListBanks()
    const { dataStatusPlan } = useStatusPlan()
    const {
        frontalBiImageRef,
        backBiImageRef,
        frontalBiImage,
        backBiImage,
        frontalImage,
        frontalImageRef,
        handleChangeFrontalImage,
        handleChangeBackImageBi,
        handleChangeFrontalImageBi,
        formRef,
        formData,
        handleChange,
        handleSubmit,
        bank_code,
        country_prefix,
        isLoding,
    } = FormuUpdateUtils()



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
                        <div className="h-full  flex flex-row  justify-center">
                            <div className='w-11/12 b flex flex-col  mt-10 items-center   lg:w-10/12'>
                                <div className='w-full flex justify-between '>
                                    <div className=' flex flex-col justify-center items-center w-full md:w-10/12 md:flex md:flex-row md:justify-between md:items-center '>
                                        <button className={buttonControl == 0 ?
                                            "p-3 text-white bg-green rounded cursor-pointer w-11/12 md:w-full" :
                                            " p-3 text-green border border-green  rounded cursor-pointer w-11/12 md:w-full"} onClick={() => setButtonControl(0)}>Dados Pessoas</button>
                                        <button className={buttonControl == 5 ?
                                            "p-3 text-white bg-green rounded cursor-pointer w-11/12 ml-2 md:w-full" :
                                            " p-3 text-green border border-green  rounded cursor-pointer mt-2  md:mt-0  md:ml-2 w-11/12 md:w-full"} onClick={() => setButtonControl(5)}>Contactos</button>
                                        <button className={buttonControl == 4 ?
                                            "p-3 text-white bg-green rounded cursor-pointer w-11/12 ml-2 md:w-full" :
                                            " p-3 text-green border border-green  rounded cursor-pointer mt-2 md:ml-2 w-11/12  md:mt-0  md:w-full"} onClick={() => setButtonControl(4)}>Endereço</button>
                                        <button className={buttonControl == 3 ?
                                            "p-3 text-white bg-green rounded cursor-pointer w-11/12 ml-2 md:w-full" :
                                            " p-3 text-green border border-green  rounded cursor-pointer  mt-2 md:ml-2 w-11/12  md:mt-0  md:w-full"} onClick={() => setButtonControl(3)}>Dados Profissional</button>
                                        <button
                                            className={buttonControl == 1 ?
                                                "p-3 text-white bg-green rounded cursor-pointer w-11/12 mt-2  md:w-full md:mt-0 md:ml-2" :
                                                " p-3 text-green border border-green  rounded cursor-pointer  w-11/12 mt-2 md:w-full md:mt-0 md:ml-2"}
                                            onClick={() => setButtonControl(1)} >Documentos</button>
                                        <button
                                            className={buttonControl == 2 ?
                                                "p-3 text-white bg-green rounded cursor-pointer  w-11/12 mt-2 md:w-full md:mt-0 md:ml-2" :
                                                " p-3 text-green border border-green  rounded cursor-pointer  w-11/12 mt-2 md:w-full md:mt-0 md:ml-2"}
                                            onClick={() => setButtonControl(2)} >Dados Bancarios</button>
                                    </div>
                                </div>
                                <form className="bg-white  p-6 w-full rounded mt-5" ref={formRef} onSubmit={handleSubmit}>
                                    {
                                        buttonControl == 0 && (
                                            <div className='bg-white w-11/12 p-6  rounded mt-5 md:w-full'>
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
                                                                placeholder="Nome Completo"
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className='mt-2'>
                                                        <label htmlFor="">Estado Civil
                                                            <span className='text-red'>*</span>
                                                        </label>
                                                        <div className='mt-2'>
                                                            <select name="marital_status" id=""
                                                                value={formData.marital_status}
                                                                onChange={handleChange}
                                                                required={true}
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
                                                    <div className="mt-3">
                                                        <label htmlFor="">Email
                                                            <span className='text-red'>*</span>
                                                        </label>
                                                        <div className='mt-2'>
                                                            <Input
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onchage={handleChange}

                                                                placeholder="exemplo@gmail.com"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Data de Nascimento
                                                            <span className='text-red'>*</span>
                                                        </label>
                                                        <div className='mt-2'>
                                                            <Input
                                                                type="date"
                                                                name="birtday_date"
                                                                value={formData.birtday_date}
                                                                onchage={handleChange}

                                                                placeholder="exemplo@gmail.com(optional)"
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

                                                            />
                                                            <label className='ml-2 cursor-pointer' htmlFor='radio_1'>Por Email</label>
                                                        </div>

                                                        <div className='mt-2'>
                                                            <input
                                                                type="radio"
                                                                name='recive_message'
                                                                id='radio_2'

                                                                value={"NotSend"}
                                                                onChange={handleChange}
                                                            />
                                                            <label className='ml-2 cursor-pointer' htmlFor='radio_2'>Não Enviar</label>
                                                        </div>
                                                    </div>
                                                    <div className='mt-4'>
                                                        <label htmlFor="">Status
                                                            <span className='text-red'>*</span>
                                                        </label>
                                                        <select
                                                            className="border border-zinc-400 w-full p-3 rounded outline-none bg-white dark:bg-zinc-900 dark:text-white"
                                                            value={formData.statu_id}
                                                            name="statu_id"
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Selecione o Status</option>
                                                            {dataStatusPlan?.map((item: any) => (
                                                                <option value={item.status_id} key={item.status_id}>
                                                                    {handleStatusPlan(item.status.name).status_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    }



                                    {
                                        buttonControl == 1 && (
                                            <div className='bg-white w-11/12  p-6  rounded mt-5 md:w-full'>
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
                                        buttonControl == 2 && (
                                            <div className='bg-white w-11/12  p-6  rounded mt-5 md:w-full'>
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
                                                            defaultValue={formData.bank_id}
                                                            value={AllBanksData.find((option: any) => option.value.id == formData.bank_id)}
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
                                                            minLength={21}
                                                            maxLength={26}

                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor=""> Número de Conta
                                                        <span className='text-red'>*</span>
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
                                                            required={true}
                                                            placeholder="Número da Conta"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor=""> Multicaixa Express
                                                        <span className='text-red'>*</span>
                                                    </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="multicaixaExpress"
                                                            value={formData.multicaixaExpress}
                                                            onchage={(e) => {
                                                                if (e.target.value.length != 12) {
                                                                    handleChange(e)
                                                                }
                                                            }}
                                                            required={true}
                                                            placeholder="Número da Conta"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    }
                                    {
                                        buttonControl == 3 && (
                                            <div className='bg-white w-11/12  p-6  rounded mt-5 md:w-full'>
                                                <div>
                                                    <label htmlFor="">Ocupação
                                                        <span className='text-red'>*</span>
                                                    </label>
                                                    <div className='mt-2' >
                                                        <Select
                                                            placeholder="Selecione uma Profissão"
                                                            className="w-full p-1 border border-zinc-400 rounded outline-none"
                                                            name="profission_id"
                                                            onChange={(newValue) =>
                                                                handleChange({
                                                                    target: {
                                                                        name: "profission_id",
                                                                        value: newValue?.value || null,
                                                                    },
                                                                })
                                                            }
                                                            value={
                                                                AllProfissionData.find(
                                                                    (option) => option.value == formData.profission_id
                                                                ) || null
                                                            }
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
                                                <div>
                                                    <label htmlFor="">Rendimento Mensal
                                                        <span className='text-red'>*</span>
                                                    </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="monthlyIincome"
                                                            value={formData.monthlyIincome}
                                                            onchage={handleChange}

                                                            placeholder="Rendimento Mensal"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    }
                                    {
                                        buttonControl == 4 && (
                                            <div className='bg-white w-11/12  p-6  rounded mt-5 md:w-full'>

                                                <div>
                                                    <label htmlFor=""> Casa Nº     </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="house_number"
                                                            value={formData.house_number}
                                                            onchage={handleChange}
                                                        
                                                            placeholder="Casa Nº"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor=""> Rua  </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="street"
                                                            value={formData.street}
                                                            onchage={handleChange}
                                                          
                                                            placeholder="Rua"
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
                                                    <label htmlFor=""> Província     </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="province"
                                                            value={formData.province}
                                                            onchage={handleChange}

                                                            placeholder="Província"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor=""> Munícipio   </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="text"
                                                            name="municipality"
                                                            value={formData.municipality}
                                                            onchage={handleChange}
                                                            placeholder="Munícipio"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    }
                                    {
                                        buttonControl == 5 && (
                                            <div className='bg-white w-11/12  p-6  rounded mt-5 md:w-full'>
                                                <div>
                                                    <label htmlFor="">Número de Telefone
                                                        <span className='text-red'>*</span>
                                                    </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="number"
                                                            name="phone_number"
                                                            value={formData.phone_number}
                                                            onchage={handleChange}
                                                            defaulValue={"55555"}
                                                            placeholder="Número de Telefone"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <label htmlFor="">Número de Telefone de alguém proxímo
                                                        <span className='text-red'>*</span>
                                                    </label>
                                                    <div className='mt-2'>
                                                        <Input
                                                            type="number"
                                                            name="phone_number"
                                                            value={formData.phone_number}
                                                            onchage={handleChange}
                                                            defaulValue={"55555"}
                                                            placeholder="Número de Telefone"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    }
                                    <div className="flex justify-center">
                                        <div className='w-11/12'>
                                            <Button
                                                name='Actualizar'
                                                type='submit'
                                                onclick={() => console.log()}
                                                typeOfButtonCustom='fullBg'
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
                {
                    isLoding && (<LoaderComponent />)
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
