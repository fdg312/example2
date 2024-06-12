'use client'

import Link from "next/link";
import { ProfileDiv } from "../profilediv/ProfileDiv";
import { asidePages } from "@/constants";
import { usePathname } from "next/navigation";

const Aside = () => {
    const pathname = usePathname()
    const check = asidePages.includes(pathname.split('/')[pathname.split('/').length - 1])
    
    return check && (
        <aside className="container">
            <div className="wrapper text-[20px] m-auto mt-[30px] p-4 bg-[#e7e7e7] me-[40px] flex flex-col float-start">
                <Link className="p-2 rounded-[10px] hover:text-[#7AC751] block text-nowrap" href="/profile">Мои объявления</Link>
                <Link className="p-2 rounded-[10px] hover:text-[#7AC751] block" href="/favourites">Избранное</Link>
                <Link className="p-2 rounded-[10px] hover:text-[#7AC751] block" href="/settings">Настройки</Link>
            </div>
        </aside>
    )
}

export default Aside;