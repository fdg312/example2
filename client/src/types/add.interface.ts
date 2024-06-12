import { ICategory, ISubcategory } from "./category.interface"
import { IFavourite } from "./favourite,interface"
import { IUser } from "./user.interface"

export interface IAdd {
    phone: string
    city: string
    address: string
    title: string
    text: string
    price: number
    images: string[]
    category: ICategory
}

export interface IAddResponse extends IAdd {
    id: number
    subcategory?: ISubcategory
    favourites?: IFavourite[]
    user: IUser
}