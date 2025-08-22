import  { useState } from 'react'
import type { InpuTypes } from '@/shered-elements/types/InputTypes'
import { Eye, EyeOff } from "lucide-react"
import { colors } from '../constents/Colors'

export default function Input(params:InpuTypes) {


    const { name, oninput, placeholder , desible,maxLengTh,  onchage, register, type, errors, required , value, defaulValue} = params

    const [isShow, setIshow] = useState(false)
    return (
        <div className=' w-full '>
            {
                type == "password" ?
                    (
                        <div className='w-full flex flex-col '>
                            <div className={errors?.[name] ? "w-full flex flex-row border rounded-sm p-3 border-red-600 bg-white text-red-500 dark:bg-zinc-900" : "w-full flex flex-row border rounded-sm p-3 border-zinc-400 bg-white dark:bg-zinc-900 dark:text-white"}>
                                <input
                                    {...register(name as "email" | "password" | "newPassword" | "confPassword")}
                                    type={isShow ? "text" : type}
                                    name={name}
                                    placeholder={placeholder}
                                    className="border-none w-full outline-none dark:bg-zinc-900"
                                />
                                {
                                    isShow ? (
                                        <EyeOff color={colors.blue} onClick={() => setIshow(!isShow)} className='cursor-pointer' />
                                    )
                                        : (
                                            <Eye color={colors.blue} onClick={() => setIshow(!isShow)} className='cursor-pointer' />
                                        )
                                }

                            </div>
                            <p className='text-red text-[12px] mt-2'>
                                {(errors?.[name]?.message ) || ""}
                            </p>
                        </div>

                    )
                    : (
                        <div className='w-full'>
                            <input
                                {...(register?.("email") || {})}
                                value={value}
                                onChange={onchage}
                                type={type}
                                name={name}
                                required={required}
                                placeholder={placeholder}
                                defaultValue={defaulValue}
                                onInput={oninput}
                                onKeyDown={onkeydown}
                                min={0}
                                maxLength={maxLengTh}
                                disabled={desible}
                                className={errors?.email ? "border border-red-600 w-full p-3 rounded outline-none text-red-00 bg-white" : "border border-zinc-400 w-full p-3 rounded outline-none bg-white dark:bg-zinc-900 dark:text-white "}
                            />
                            <p className='text-red text-[12px] mt-2'>   {errors?.email?.message ? errors.email.message : ""}</p>
                        </div>
                    )
            }
        </div>
    )
}
