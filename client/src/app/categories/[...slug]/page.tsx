'use client'

import { CategoryService } from '@/services/category'
import { IAddResponse } from '@/types/add.interface'
import { useEffect, useState } from 'react'

import { AddsDiv } from '@/components/addsDiv/addsDiv'
import { Mulish } from 'next/font/google'

const mulish = Mulish({ subsets: ['cyrillic'] })

const CategoryPage = ({ params }) => {
	const [adds, setAdds] = useState<IAddResponse[]>([])
	const [loading, setLoading] = useState(true)
	console.log(params, 'params')

	// useEffect(() => {
	// 	async function fetchData() {
	// 		const data = await CategoryService.getBySlug(params.slug[1])

	// 		setAdds(data)
	// 	}

	// 	fetchData()
	// 	setLoading(false)
	// }, [])

	return (
		<main className='container'>
			<div className='wrapper mt-6'>
				<h2
					className={
						'text-center text-[36px] text-[#555555] mb-8 font-bold' +
						' ' +
						mulish.className
					}
				>
					Объявления в категории {adds[0]?.subcategory?.name?.toLowerCase()}
				</h2>
				<AddsDiv loading={loading} setLoading={setLoading} adds={adds} />
			</div>
		</main>
	)
}

export default CategoryPage
