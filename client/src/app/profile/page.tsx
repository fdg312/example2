'use client'

import { ProductCard } from '@/components/productcard/ProductCard'
import { AddService } from '@/services/add'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Mulish } from 'next/font/google'
import { AddsDiv } from '@/components/addsDiv/addsDiv'

const mulish = Mulish({ subsets: ['cyrillic'] })

export default function Home() {
	const [adds, setAdds] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const adds = await AddService.getByUser()

			setAdds(adds)
		}

		fetchData()
		setLoading(false)
	}, [])

	return (
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
			<div className='flex flex-wrap justify-center'>
				<AddsDiv
					redaction={true}
					loading={loading}
					setLoading={setLoading}
					adds={adds}
				/>
			</div>
		</div>
	)
}
