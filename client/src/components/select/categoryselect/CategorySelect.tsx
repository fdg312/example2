import { ICategory } from '@/types/category.interface'
import { ChangeEvent, useState } from 'react'

type selectType = {
	categories: ICategory[]
	disabled?: boolean
	value: string
	styles: string
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void
	id: string
}

export const CategorySelect = ({
	id,
	categories,
	disabled,
	styles,
	value,
	onChange,
}: selectType) => {
	const [isClicked, setIsClicked] = useState(false)

	return (
		<select
			disabled={disabled}
			id={id}
			value={value}
			className={styles}
			onChange={onChange}
		>
			{!disabled ? (
				<option disabled={!!disabled} value=''>
					Выберите категорию
				</option>
			) : null}
			{!disabled ? (
				categories?.map(category => (
					<optgroup key={category.id} label={category.name}>
						{category.subcategories.map((subcategory: any) => (
							<option
								onClick={() => setIsClicked(true)}
								key={subcategory.id}
								value={subcategory.slug}
							>
								{subcategory.name}
							</option>
						))}
					</optgroup>
				))
			) : (
				<option value={value}>{value}</option>
			)}
		</select>
	)
}
