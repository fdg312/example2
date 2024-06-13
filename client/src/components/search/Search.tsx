import { CategoryService } from '@/services/category'
import { ICategory } from '@/types/category.interface'
import { useEffect, useState } from 'react'
import { SearchInput } from '../input/searchInput/SearchInput'
import styles from './search.module.scss'
import Link from 'next/link'
import { AddService } from '@/services/add'
import { IAdd } from '@/types/add.interface'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CategorySelect } from '../select/categoryselect/CategorySelect'

export const Search = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()

	const [categories, setCategories] = useState<ICategory[]>([])
	const [selectValue, setSelectValue] = useState('')
	const [searchValue, setSearchValue] = useState('')
	const [disabled, setDisabled] = useState(false)
	const [searchRes, setSearchRes] = useState([])

	useEffect(() => {
		console.log('fetchData', 'search', 'categories')

		async function fetchData() {
			const data = await CategoryService.getAll()
			data && setCategories(data)
		}

		fetchData()
	}, [])

	useEffect(() => {
		console.log('fetchData', 'search', 'searchValue')

		if (!searchValue) {
			setSearchRes([])
			return
		}
		async function fetchData() {
			const data = await AddService.getAll(10, searchValue)
			setSearchRes(data)
		}

		fetchData()
	}, [searchValue])

	useEffect(() => {
		setDisabled(true)
		console.log('selectValue')

		if (selectValue) {
			router.push(
				'/categories/' + getCategory(selectValue)?.slug + '/' + selectValue
			)
		}
	}, [selectValue])

	useEffect(() => {
		console.log('searchParams, pathname')

		if (pathname.split('/')[1] == 'categories') {
			setSelectValue(pathname.split('/')[pathname.split('/').length - 1])
			return
		}

		setSearchRes([])
		setSearchValue('')
		setSelectValue('')
	}, [searchParams, pathname])

	const getCategory = (subcategory: string) => {
		return categories?.find(category =>
			category.subcategories.find(c => c.slug === subcategory)
		)
	}

	return (
		<div>
			<CategorySelect
				categories={categories}
				disabled={disabled}
				styles={styles.select}
				value={selectValue}
				onChange={e => setSelectValue(e.target.value)}
			/>
			<div className='relative inline'>
				<SearchInput
					setValue={setSearchValue}
					value={searchValue}
					type='text'
					text='Поиск...'
				/>
				<div className='absolute top-[38px] w-full left-0 ps-3 bg-white'>
					{typeof searchRes === 'object' &&
						searchRes.map((add: IAdd) => (
							<Link
								href={'/?query=' + add.title}
								key={add.title}
								className=' border-[#555555] border-b-2 block'
							>
								{add.title}
							</Link>
						))}
				</div>
			</div>
		</div>
	)
}
