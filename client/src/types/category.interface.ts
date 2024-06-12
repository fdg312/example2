export interface ICategory {
    id: number
    name: string
    slug: string
    subcategories: ISubcategory[]
}

export interface ISubcategory {
    slug: string
    name: string
}