import { ICategory } from "@/types/category.interface"
import { ChangeEvent } from "react"

type selectType = {
    categories: ICategory[] 
    disabled?: boolean
    value: string
    styles: string
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
    id: string
}

export const CategorySelect = ( { id, categories, disabled, styles, value, onChange }: selectType ) => {
    return (
        <select id={id} value={value} className={styles} onChange={onChange}>
        <option disabled={!!disabled} value="">Выберите категорию</option>
            {
                categories?.map((category) => (
                    <optgroup key={category.id} label={category.name}>
                        {
                            category.subcategories.map((subcategory: any) => (
                                <option key={subcategory.id} value={subcategory.slug}>
                                    {subcategory.name}
                                </option>
                            ))
                        }
                    </optgroup>
                ))
            }
        </select>
    )
}