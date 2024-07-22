import { AddService } from '@/services/add'
import useSessionStore from '@/stores/sessionStore'
import { IAdd } from '@/types/add.interface'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MyInput } from '../input/myinput/MyInput'
import { CategorySelect } from '../select/categoryselect/CategorySelect'
import styles from './search.module.scss'

export const Search = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()

	const { categories } = useSessionStore()
	// const [categories, setCategories] = useState<ICategory[]>([])
	const [selectValue, setSelectValue] = useState('')
	const [searchValue, setSearchValue] = useState('')
	const [disabled, setDisabled] = useState(false)
	const [searchRes, setSearchRes] = useState([])

	// useEffect(() => {
	// 	console.log('fetchData', 'search', 'categories')

	// 	async function fetchData() {
	// 		const data = await CategoryService.getAll()
	// 		data && setCategories(data)
	// 	}

	// 	fetchData()
	// }, [])

	useEffect(() => {
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

		const category = getCategory(selectValue)?.slug
		if (selectValue) {
			router.push('/categories/' + category + '/' + selectValue)
		}
	}, [selectValue])

	useEffect(() => {
		if (pathname.split('/')[1] == 'categories') {
			setSelectValue(pathname.split('/')[pathname.split('/').length - 1])
			return
		}

		setSearchRes([])
		setSearchValue('')
		setSelectValue('')
	}, [searchParams, pathname])

	const getCategory = (subcategory: string) => {
		console.log(subcategory)
		console.log(categories)

		return categories?.find(category =>
			category.subcategories.find(c => c.slug === subcategory)
		)
	}

	return (
		<div>
			<div className={styles.search}>
				<CategorySelect
					id='categorySelect'
					categories={categories}
					disabled={false}
					styles={styles.select}
					value={selectValue}
					onChange={e => setSelectValue(e.target.value)}
				/>
				<MyInput
					width='350px'
					onKeyEnter={() => router.push('/?query=' + searchValue)}
					setValue={setSearchValue}
					value={searchValue}
					text='Поиск'
				/>
				<div
					onClick={() => router.push('/?query=' + searchValue)}
					className={styles.icon}
				>
					<FaSearch />
				</div>
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
