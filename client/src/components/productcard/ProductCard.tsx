import { Mulish } from 'next/font/google'
import { ImageSlideShow } from '../slideShow/imageSlideShow/ImageSlideShow'
import './productcard.scss'

type ProductCardType = {
	title: string
	price: number
	city: string
}

const mulish = Mulish({ subsets: ['cyrillic'], weight: ['300', '500'] })

export const ProductCard = ({ ...props }: ProductCardType) => {
	return (
		<div className='card'>
			<div className='card__image'>
				<ImageSlideShow images={[]} />
			</div>
			<div className='card__textbox'>
				<span className={'card__city ' + mulish.className}>{props.city}</span>
				<h4 className='card__title'>
					{props.title.length > 40
						? props.title.slice(0, 40) + '...'
						: props.title}
				</h4>
				<p className='card__price'>{props.price} ₽</p>
			</div>
		</div>
	)
}
