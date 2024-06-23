'use client'

import { AddService } from "@/services/add"
import { FavouriteService } from "@/services/favourite"
import useAuth from "@/stores/authStore"
import { IFavourite } from "@/types/favourite,interface"
import { useEffect, useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"

type HeartIconType = {
    addId: string
    setIsChanged: any
}

export const HeartIcon = ({ addId, setIsChanged }: HeartIconType) => {
    const { isAuth } = useAuth()

    const [isFavourite, setIsFavourite] = useState(false)

    useEffect(() => {
        async function fetchData () {
            const add = await AddService.getById(addId)
            const favAdd = add?.favourites?.find((fav: IFavourite) => fav.addId == addId)
            
            setIsFavourite(Boolean(favAdd))
        }
        
        fetchData()
    }, [])

    async function changeFavourite (id: string, event: any) {
        event.preventDefault()
        if (!isFavourite) {
            await FavouriteService.create(id)
            setIsFavourite(true)
        } else {
            await FavouriteService.delete(id)
            setIsFavourite(false)
            !!setIsChanged && setIsChanged(true)
        }
    }

    return (
        <div onClick={e => changeFavourite(addId, e)} className="absolute top-2 right-2 text-red-400 text-[30px]">
            {isAuth && (
                isFavourite 
                ?
                <FaHeart />
                :
                <FaRegHeart />
            )}
        </div>
    )
}