'use client'

import { Mulish } from 'next/font/google'

const mulish = Mulish({ subsets: ['cyrillic'] })

export default function Default() {
	// const { adds, setAdds, city, previousPage, setPreviousPage } =
	// 	useSessionStore()
	// const [loading, setLoading] = useState(true)
	// const searchParams = useSearchParams()
	// const pathname = usePathname()

	// useEffect(() => {
	// 	const fetchData = async (city: string) => {
	// 		const adds = await AddService.getAll(
	// 			10,
	// 			searchParams.get('query') || '',
	// 			city
	// 		)

	// 		setAdds(adds)
	// 	}

	// 	useSessionStore.subscribe((state, prevState) => {
	// 		if (state.city !== prevState.city) {
	// 			fetchData(state.city)
	// 		}
	// 	})

	// 	setLoading(false)
	// }, [searchParams, city])

	return null
	// (!previousPage.length || previousPage.includes('/')) &&
	// !!pathname.split('/').includes('auth') &&
	// (
	// 	<main className='container'>
	// 		<div className='wrapper mt-6'>
	// 			{adds ? (
	// 				<h2
	// 					className={
	// 						'text-center text-[36px] text-[#555555] mb-8 font-bold mt-[20px] ' +
	// 						mulish.className
	// 					}
	// 				>
	// 					Мои объявления
	// 				</h2>
	// 			) : (
	// 				<h2
	// 					className={
	// 						'text-center text-[36px] text-[#555555] mb-8 font-bold mt-[20px] ' +
	// 						mulish.className
	// 					}
	// 				>
	// 					Нет объявлений
	// 				</h2>
	// 			)}
	// 			<AddsDiv loading={loading} setLoading={setLoading} adds={adds} />
	// 		</div>
	// 	</main>
	// )
}
