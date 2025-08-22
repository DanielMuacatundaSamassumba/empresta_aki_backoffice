
import type { ButtonTypes } from '@/shered-elements/types/ButtonTypes'

export default function Button(params: ButtonTypes) {
    const { name, onclick, type, typeOfButtonCustom } = params
    return (
        <div className='w-full'
        >
            {
                typeOfButtonCustom == "fullBg" ? (
                    <button
                        className={"border-none p-4 bg-green w-full text-white rounded cursor-pointer"}
                        type={type}
                        onClick={onclick}
                    >
                        {name}
                    </button>
                ) : (
                    <div className='w-full'>
                        <button
                            className={" p-4 border-green border-1  w-full text-green rounded cursor-pointer"}
                            type={type}
                        >
                            {name}
                        </button>
                    </div>
                )
            }
        </div>
    )
}
