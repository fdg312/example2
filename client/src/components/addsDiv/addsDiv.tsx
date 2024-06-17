import { IAddResponse } from '@/types/add.interface'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import Loader from '../../../public/loader2.gif'
import { HeartIcon } from '../heartIcon/heartIcon'
import { ProductCard } from '../productcard/ProductCard'

export const AddsDiv = ({
	adds,
	setLoading,
	loading,
	favourites,
	setReload,
}: {
	adds: Array<IAddResponse>
	setLoading: Dispatch<SetStateAction<boolean>>
	loading: boolean
	favourites?: boolean
	setReload?: any
}) => {
	return (
		<div className='adds'>
			{loading ? (
				<Image
					className='mx-auto'
					width={100}
					height={100}
					src={Loader.src}
					alt='loader'
				/>
			) : (
				adds?.map(add => (
					<Link
						key={add.id}
						className='mb-3 mr-5 inline-flex relative'
						href={'/adds/' + add.id}
					>
						<ProductCard
							title={add.title}
							text={add.text}
							price={add.price}
							city={add.city}
						/>
						{favourites && (
							<HeartIcon setIsChanged={setReload} addId={String(add.id)} />
						)}
					</Link>
				))
			)}
		</div>
	)
}
