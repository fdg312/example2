'use client'

import Button from '@/components/buttons/button/Button'
import ButtonStatus from '@/components/buttons/buttonStatus/ButtonStatus'
import { ProfileDiv } from '@/components/profilediv/ProfileDiv'
import SlideShow from '@/components/slideShow/addSlidShow/AddSlideShow'
import { SlideProps } from '@/components/slideShow/addSlidShow/slide/Slide'
import { ImageSlideShow } from '@/components/slideShow/imageSlideShow/ImageSlideShow'
import { AddService } from '@/services/add'
import { FavouriteService } from '@/services/favourite'
import useAuth from '@/stores/authStore'
import { IAddResponse } from '@/types/add.interface'
import { IFavourite } from '@/types/favourite,interface'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaRegMessage } from 'react-icons/fa6'
import { LuHeart } from 'react-icons/lu'
import './index.scss'

const PageAdd = ({ params }: { params: { slug: string } }) => {
	const { isAuth } = useAuth()
	const [add, setAdd] = useState<IAddResponse>()
	const [relatedAdds, setRelatedAdds] = useState<IAddResponse[]>()
	const [slides, setSlides] = useState<SlideProps[]>([])
	const [visiblePhone, setVisiblePhone] = useState(false)
	const [isFavourite, setIsFavourite] = useState(false)
	const [isCopy, setIsCopy] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		async function fetchData() {
			const data = await AddService.getBySlug(params.slug)
			setAdd(data)

			const related = await AddService.getRelated(data.id)
			setRelatedAdds(related)

			related &&
				setSlides(
					Array(4).fill(
						related.map(a => ({
							city: a.city,
							title: a.title,
							price: a.price.toString(),
							slug: a.slug,
						}))[0]
					)
				)

			const favAdd = add?.favourites?.find(
				(fav: IFavourite) => fav.addId == add.id
			)
			setIsFavourite(!!favAdd)
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

	const clickShowPhone = () => {
		if (visiblePhone) {
			add?.phone && navigator.clipboard.writeText(add?.phone)
			setIsCopy(true)
			const titleCopyTimeout = setTimeout(() => {
				setIsCopy(false)
			}, 1000)
			return () => clearTimeout(titleCopyTimeout)
		}
		setVisiblePhone(true)
	}

	return (
		<main className='container'>
			<div className='wrapper'>
				<div className='flex'>
					<div className='relative'>
						<div className='w-[550px] h-[450px] border-[1px] bg-neutral-400'>
							<ImageSlideShow images={add?.images ?? []} />
						</div>
					</div>
					<div className='ml-[30px]'>
						<div>
							<Link
								className='category-link'
								href={
									'/categories/' +
									add?.category?.slug +
									'/' +
									add?.subcategory?.slug
								}
							>
								{add?.subcategory?.name}
							</Link>
							<h2>{add?.title}</h2>
							<Button onClick={clickShowPhone} classes='w-full min-w-[250px]'>
								Показать телефон<div className='m-[-5px] mb-2'></div>
								<span className='text-[16px]'>
									{isCopy
										? 'Телефон скопирован'
										: visiblePhone
										? add?.phone
										: '8 (XXX) XXX-XX-XX'}
								</span>
							</Button>
							<p className='price'>{add?.price} ₽</p>
							<p className='address'>
								<span>Адрес:</span> {add?.address}
							</p>
							<Button
								classes='mr-2'
								icon={<FaRegMessage className='inline mr-2' />}
							>
								Написать
							</Button>
							<ButtonStatus
								status={isFavourite}
								onClick={() => changeFavourite()}
								icon={<LuHeart className='inline mr-[10px]' />}
							>
								Избранное
							</ButtonStatus>
							{add && (
								<ProfileDiv
									id={add.user.id}
									name={add.user.name}
									createdAt={new Date(add.user.createdAt)}
								/>
							)}
						</div>
					</div>
				</div>
				<div className='desc'>
					<h3 className='desc_title'>Описание</h3>
					<p className='desc_text'>{add?.text}</p>
				</div>
				<div className='related-adds'>
					<h2>Похожие объявления</h2>
					<hr />
					<SlideShow slides={slides} />
				</div>
			</div>
		</main>
	)
}

export default PageAdd
