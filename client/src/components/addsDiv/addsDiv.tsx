import { IAddResponse } from "@/types/add.interface"
import Link from "next/link"
import { ProductCard } from "../productcard/ProductCard"
import Loader from "../../../public/loader2.gif"
import Image from "next/image"
import useAuth from "@/stores/authStore"
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react"
import { FavouriteService } from "@/services/favourite"
import { IFavourite } from "@/types/favourite,interface"
import { HeartIcon } from "../heartIcon/heartIcon"

export const AddsDiv = ({ adds, setLoading, loading, favourites,  setReload }: { adds: Array<IAddResponse>, setLoading: Dispatch<SetStateAction<boolean>>, loading: boolean, favourites?: boolean, setReload?: any }) => {
    
    return (
            <div className="adds">
                    {
                        loading
                        ?
                        <Image className="mx-auto" width={100} height={100} src={Loader.src} alt="loader" />
                        :
                        adds?.map((add) => (
                            <Link key={add.id} className='mb-3 mr-5 inline-flex relative' href={'/adds/' + add.id}>
                                <ProductCard title={add.title} text={add.text} price={add.price} city={add.city} />
                                {
                                    favourites 
                                    &&
                                    <HeartIcon setIsChanged={setReload} addId={String(add.id)} />
                                }
                            </Link>                  
                        ))
                    }
            </div>
    )
}