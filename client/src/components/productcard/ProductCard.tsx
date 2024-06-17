import { Mulish } from 'next/font/google'

type ProductCardType = {
	title: string
	text: string
	price: number
	city: string
}

const mulish = Mulish({ subsets: ['cyrillic'], weight: ['300', '500'] })

export const ProductCard = ({ ...props }: ProductCardType) => {
	return (
		<div className='max-w-[270px]'>
			<div className='w-[270px] h-[290px] bg-black'></div>
			<div className='w-full flex flex-wrap flex-col'>
				<p
					className={
						'text-[14px] text-[#5555555] mt-[10px]' + ' ' + mulish.className
					}
				>
					{props.city}
				</p>
				<p className='text-black text-[20px]'>
					{props.title.length > 40
						? props.title.slice(0, 40) + '...'
						: props.title}
				</p>
				<p className='text-[18px] font-bold text-[#7AC751]'>{props.price} ₽</p>
			</div>
		</div>
	)
}
