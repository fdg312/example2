import { IAddResponse } from '@/types/add.interface'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { FaPenSquare } from 'react-icons/fa'
import Loader from '../../../public/loader2.gif'
import { HeartIcon } from '../heartIcon/heartIcon'
import { ProductCard } from '../productcard/ProductCard'

export const AddsDiv = ({
	adds,
	setLoading,
	loading,
	favourites,
	setReload,
	redaction = false,
}: {
	adds: Array<IAddResponse>
	setLoading: Dispatch<SetStateAction<boolean>>
	loading: boolean
	favourites?: boolean
	setReload?: any
	redaction?: boolean
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
					unoptimized
				/>
			) : (
				adds?.map(add => (
					<Link
						key={add.id}
						className='mb-3 mr-5 inline-flex relative'
						href={'/adds/' + add.slug}
					>
						<ProductCard title={add.title} price={add.price} city={add.city} />
						{favourites && (
							<HeartIcon setIsChanged={setReload} addId={String(add.id)} />
						)}
						{redaction && (
							<Link href={'/adds/' + add.slug + '/update'}>
								<FaPenSquare className='absolute top-2 right-2 text-blue-400 text-[30px] hover:text-blue-500' />
							</Link>
						)}
					</Link>
				))
			)}
		</div>
	)
}
