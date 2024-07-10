import Image from 'next/image'
import 'swiper/css'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './imageSlideShow.module.scss'

export const ImageSlideShow = ({ images }: { images: string[] }) => {
	return (
		<>
			<Swiper
				navigation={true}
				// navigation={{
				// 	nextEl: '.swiper-button-next',
				// 	prevEl: '.swiper-button-prev',
				// }}
				modules={[Navigation]}
				spaceBetween={30}
				slidesPerView={1}
			>
				{images.map((image, i) => (
					<SwiperSlide key={i}>
						<div className={styles.imageWrapper}>
							<Image
								src={`/uploads/${image}`}
								alt={`Slide ${i}`}
								layout='fill'
								objectFit='contain'
								objectPosition='center'
							/>
						</div>
					</SwiperSlide>
				))}
				{images.map((image, i) => (
					<SwiperSlide key={i}>
						<div className={styles.imageWrapper}>
							<Image
								src={`/uploads/${image}`}
								alt={`Slide ${i}`}
								layout='fill'
								objectFit='contain'
								objectPosition='center'
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<div className='swiper-button-prev'></div>
			<div className='swiper-button-next'></div>
		</>
	)
}
