// components/SlideShow.tsx
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

export type SlideProps = {
	city: string
	title: string
	price: string
}

const Slide: React.FC<SlideProps> = ({ city, title, price }) => {
	const mulish = { className: 'font-mulish' }
	return (
		<div className='max-w-[270px]'>
			<div className='w-[270px] h-[290px] bg-black'></div>
			<div className='w-full flex flex-wrap flex-col'>
				<p
					className={
						'text-[14px] text-[#5555555] mt-[10px]' + ' ' + mulish.className
					}
				>
					{city}
				</p>
				<p className='text-black text-[20px]'>
					{title.length > 40 ? title.slice(0, 40) + '...' : title}
				</p>
				<p className='text-[18px] font-bold text-[#7AC751]'>{price} ₽</p>
			</div>
		</div>
	)
}

type SlideShowProps = {
	slides: SlideProps[]
}

const SlideShow: React.FC<SlideShowProps> = ({ slides }) => {
	return (
		<Swiper spaceBetween={50} slidesPerView={1}>
			{slides.map((slide, index) => (
				<SwiperSlide key={index}>
					<Slide city={slide.city} title={slide.title} price={slide.price} />
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default SlideShow
