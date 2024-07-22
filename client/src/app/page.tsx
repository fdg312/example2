'use client'

import { AddsDiv } from '@/components/addsDiv/addsDiv'
import { AddService } from '@/services/add'
import useSessionStore from '@/stores/sessionStore'
import { Mulish } from 'next/font/google'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import data from '../constants/russia.json'

const mulish = Mulish({ subsets: ['cyrillic'] })

export default function Default() {
	const { adds, setAdds, city } = useSessionStore()
	const [loading, setLoading] = useState(true)
	const searchParams = useSearchParams()

	const checkCityIncluding = useCallback((target: string) => {
		const filteredData = data.filter(obj =>
			obj.city.toLowerCase().includes(target.toLowerCase())
		)

		if (filteredData.length === 1) {
			return target === filteredData[0].city
		}
		return false
	}, [])

	const fetchData = useCallback(
		async (city: string = '') => {
			const addss = await AddService.getAll(
				10,
				searchParams.get('query') || '',
				city
			)
			console.log(addss)

			setAdds(addss)
			setLoading(false)
		},
		[searchParams, setAdds]
	)

	useEffect(() => {
		// if (city && checkCityIncluding(city)) {
		// 	fetchData(city)
		// }
		fetchData()
		const unsubscribe = useSessionStore.subscribe((state, prevState) => {
			if (state.city !== prevState.city) {
				if (checkCityIncluding(state.city)) {
					fetchData(state.city)
				}
			}
		})

		return () => unsubscribe()
	}, [city, checkCityIncluding, fetchData])

	return (
		<main className='container'>
			<div className='wrapper mt-6'>
				{adds ? (
					<h2
						className={
							'text-center text-[36px] text-[#555555] mb-8 font-bold mt-[20px] ' +
							mulish.className
						}
					>
						Мои объявления
					</h2>
				) : (
					<h2
						className={
							'text-center text-[36px] text-[#555555] mb-8 font-bold mt-[20px] ' +
							mulish.className
						}
					>
						Нет объявлений
					</h2>
				)}
				<AddsDiv loading={loading} setLoading={setLoading} adds={adds} />
			</div>
		</main>
	)
}
