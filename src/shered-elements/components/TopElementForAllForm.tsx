
import { images } from '@/shered-elements/constents/Images'
import type { TopElementForAllFormTypes } from '@/shered-elements/types/TopElementForAllFormTypes'
import { UseDarkMode } from '@/context/ThemeProvider'
export default function TopElementForAllForm(params: TopElementForAllFormTypes) {
    const { title, paragraph, IsBlue } = params
    const themeContext = UseDarkMode()
    const { darkMode,} = themeContext || { darkMode: false }
    return (
        <div className={darkMode ? 'flex flex-col items-center text-white' : 'flex flex-col items-center'}>
            <img
                src={images.logo}
                alt="logo-image"
                className='w-28'
            />
         {
            IsBlue ?
                <h1 className='text-blue text-2xl font-semibold mt-4'>{title}</h1>
                :
                <h1 className='text-font-color text-2xl font-semibold mt-4'>{title}</h1>
         }
            <p className={ darkMode ? 'text-font-color text-center mt-2' : 'text-font-color text-center mt-2'}>
                {paragraph}
            </p>
        </div>
    )
}
