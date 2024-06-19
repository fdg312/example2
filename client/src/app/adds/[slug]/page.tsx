'use client'

import { ProfileDiv } from '@/components/profilediv/ProfileDiv'
import { AddService } from '@/services/add'
import { FavouriteService } from '@/services/favourite'
import useAuth from '@/stores/authStore'
import { IAddResponse } from '@/types/add.interface'
import { IFavourite } from '@/types/favourite,interface'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const PageAdd = ({ params }: { params: { slug: string } }) => {
	const { isAuth } = useAuth()
	const [add, setAdd] = useState<IAddResponse>()
	const [visiblePhone, setVisiblePhone] = useState(false)
	const [isFavourite, setIsFavourite] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		async function fetchData() {
			const data = await AddService.getBySlug(params.slug)
			setAdd(data)
			console.log(data)

			const favAdd = add?.favourites?.find(
				(fav: IFavourite) => fav.addId == add.id
			)
			setIsFavourite(Boolean(favAdd))
		}

		fetchData()
	}, [])

	async function changeFavourite() {
		if (!isFavourite && add) {
			await FavouriteService.create(add.id)
			setIsFavourite(true)
		} else if (add) {
			await FavouriteService.delete(add.id)
			setIsFavourite(false)
		}
	}

	return (
		<main className='container'>
			<div className='wrapper mt-12'>
				<div className='float-right'>
					<div className='flex'>
						<div className='relative'>
							<div className='w-[550px] h-[450px] bg-black'></div>
							<div
								onClick={() => changeFavourite()}
								className='absolute top-2 right-2 text-red-400 text-[30px]'
							>
								{isAuth && (isFavourite ? <FaHeart /> : <FaRegHeart />)}
							</div>
						</div>
						<div className='ml-[30px]'>
							<div>
								<Link
									className='text-[#7AC751] underline underline-offset-2 hover:no-underline'
									href={
										'/categories/' +
										add?.category?.slug +
										'/' +
										add?.subcategory?.slug
									}
								>
									{add?.subcategory?.name}
								</Link>

								<h2 className='text-[36px] my-0'>{add?.title}</h2>
								<p className='text-[24px] text-[#7AC751] mb-[5px]'>
									{add?.price} ₽
								</p>
								<p className='text-[16px] mb-[10px]'>Адрес: {add?.address}</p>
								<button
									onClick={() => setVisiblePhone(!visiblePhone)}
									className='text-center block w-full mb-[20px] text-[20px] bg-[#7AC751] p-3 text-white rounded-[10px] hover:bg-[#71bb49]'
								>
									Показать телефон<div className='m-[-5px]'></div>
									<span className='text-[14px]'>
										{visiblePhone ? add?.phone : '8 (XXX) XXX-XX-XX'}
									</span>
								</button>
								<Link
									className='block text-center mb-[30px] text-[20px] border-2 border-[#7AC751] bg-white p-4 py-3 hover:text-white rounded-[10px] hover:bg-[#7AC751] text-[#7AC751]'
									href='#'
								>
									Написать сообщение
								</Link>
								<ProfileDiv name={add?.user?.name} createdAt={new Date()} />
							</div>
						</div>
					</div>
					<p className='mt-[30px] text-[20px]'>{add?.text}</p>
				</div>
			</div>
		</main>
	)
}

export default PageAdd
