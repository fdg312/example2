import { ICategory } from "@/types/category.interface"
import styles from './searchinput.module.scss'
import { FaSearch } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";



type InputType = {
    type: string
    text: string
    setValue: Dispatch<SetStateAction<string>>
    value: string
}

export const SearchInput = ({ type, text, setValue, value }: InputType) => {
    const router = useRouter()
    
    
    return (
        (
            <div className="inline-flex items-center h-full w-[500px]">
                <input className={styles.search} type={type} placeholder={text} onChange={e => setValue(e.target.value)} value={value}  />
                <div onClick={() => router.push('?query=' + value)} className="flex justify-center items-center h-full bg-[#7AC751] px-4 rounded-e-[10px] cursor-pointer hover:bg-[#71bb49]">
                    <FaSearch className="text-white text-xl" />
                </div>
            </div>
        )
    )
}