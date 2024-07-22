import { ProductCard } from '@/components/productcard/ProductCard'
import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SlideProps } from './slide/Slide'

type SlideShowProps = {
	slides: SlideProps[]
}

const SlideShow: React.FC<SlideShowProps> = ({ slides }) => {
	return (
		<Swiper spaceBetween={100} slidesPerView={5}>
			{slides.map((slide, index) => (
				<SwiperSlide key={index}>
					<Link href={`/adds/${slide.slug}`}>
						<ProductCard
							city={slide.city}
							title={slide.title}
							price={+slide.price}
						/>
					</Link>
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default SlideShow
