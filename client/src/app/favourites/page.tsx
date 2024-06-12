'use client'

import { AddsDiv } from '@/components/addsDiv/addsDiv';
import { ProductCard } from '@/components/productcard/ProductCard';
import { AddService } from '@/services/add';
import { FavouriteService } from '@/services/favourite';
import useAuth from '@/stores/authStore';
import { Mulish } from 'next/font/google'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const mulish = Mulish({ subsets: ['cyrillic'] })
const FavouritePage = () => {
    const [adds, setAdds] = useState([])
    const [reload, setReload] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
          const adds = await AddService.getByFavourites()
          
          setAdds(adds)
        };
    
        fetchData()
        setLoading(false)
      }, [reload])

      console.log(adds);
      
    return (
        <main className="container">
            <div className="wrapper">
                {
                    adds 
                    ?
                    <h2 className={'text-center text-[36px] text-[#555555] mb-8 font-bold mt-[20px] ' + mulish.className}>Избранное</h2>
                    :
                    <h2 className={'text-center text-[36px] text-[#555555] mb-8 font-bold mt-[20px] ' + mulish.className}>Нет объявлений</h2>
                }
                <AddsDiv loading={loading} setLoading={setLoading} favourites={true} setReload={setReload} adds={adds} />
            </div>
        </main>
    )
}

export default FavouritePage;