'use client'

import { AddsDiv } from '@/components/addsDiv/addsDiv'
import Chat from '@/components/chat/Chat'
import { AddService } from '@/services/add'
import useSessionStore from '@/stores/sessionStore'
import { Mulish } from 'next/font/google'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import data from '../constants/russia.json'

const mulish = Mulish({ subsets: ['cyrillic'] })

export default function Default() {
	const { adds, setAdds, city } = useSessionStore()
	const [loading, setLoading] = useState(true)
	const searchParams = useSearchParams()

	useEffect(() => {
		const fetchData = async (city: string) => {
			const adds = await AddService.getAll(
				10,
				searchParams.get('query') || '',
				city
			)

			setAdds(adds)
		}

		useSessionStore.subscribe((state, prevState) => {
			if (state.city !== prevState.city) {
				if (checkCityIncluding(state.city)) {
					fetchData(state.city)
				}
			}
		})

		setLoading(false)
	}, [searchParams, city])

	const checkCityIncluding = (target: string) => {
		const filteredData = data.filter(obj =>
			obj.city.toLowerCase().includes(target.toLowerCase())
		)

		if (filteredData.length === 1) {
			return target === filteredData[0].city
		}
	}

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
				<Chat
					chatId={'clycrhbvf000061xdigpgejmp'}
					userId={'cly43j0kn0000zumfzfxexvmt'}
				/>
			</div>
		</main>
	)
}
