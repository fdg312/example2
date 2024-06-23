'use client'

import useAuth from '@/stores/authStore'
import useSessionStore from '@/stores/sessionStore'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import avatar from '../../../public/ava.webp'
import data from '../../constants/russia.json'
import { Search } from '../search/Search'
import styles from './navbar.module.scss'

const Navbar = () => {
	const { isAuth, logout } = useAuth()
	const { city, setCity } = useSessionStore()
	const [isEditCity, setIsEditCity] = useState(false)
	const [cities, setCities] = useState<{ region: string; city: string }[]>([])
	const [inputCity, setInputCity] = useState('')
	// const [targetCity, setTargetCity] = useState('')
	const inputCityRef = React.useRef<HTMLInputElement>(null)
	const divCitiesRef = React.useRef<HTMLDivElement>(null)

	const getInputCity = useCallback(() => {
		if (!inputCity) return
		setCities(
			data
				.filter(obj => obj.city.toLowerCase().includes(inputCity.toLowerCase()))
				.slice(0, 3)
		)
	}, [inputCity])

	useEffect(() => {
		if (localStorage.getItem('city')) {
			setCity(localStorage.getItem('city') ?? '')
			setInputCity(
				localStorage.getItem('city') === 'Россия'
					? ''
					: localStorage.getItem('city') ?? ''
			)
		}

		getInputCity()
	}, [])

	// useEffect(() => {
	// 	if (isEditCity) {
	// 		inputCityRef.current?.focus()
	// 	} else {
	// 		setInputCity('')
	// 		setCities([])
	// 		setCity(localStorage.getItem('city') ?? 'Россия')
	// 	}
	// }, [isEditCity])

	const handleChangeCity = (target: string) => {
		setCity(target)
		setIsEditCity(false)
	}

	return (
		<>
			<nav>
				<div className='wrapper-upnav bg-[#555555] p-2 mb-[20px]'>
					<div className='container flex justify-between'>
						<div className='flex justify-center items-center py-2'>
							{isEditCity ? (
								<div className='relative'>
									<input
										ref={inputCityRef}
										className='block h-[30px]'
										placeholder='Поиск города'
										type='text'
										onChange={e => setInputCity(e.target.value)}
										value={inputCity}
									/>
									{cities && (
										<div
											ref={divCitiesRef}
											className='absolute top-[28px] w-full left-0 ps-3 bg-white'
										>
											<p
												onClick={() => {
													handleChangeCity('Россия')
													setInputCity('')
												}}
												className=' border-[#555555] border-b-2 block cursor-pointer'
											>
												Вся Россия
											</p>
											{cities?.map(obj => (
												<p
													onClick={() => {
														setInputCity(obj.city)
														handleChangeCity(obj.city)
													}}
													key={obj.city}
													className='cursor-pointer border-[#555555] border-b-2 block'
												>
													{obj.city}
												</p>
											))}
										</div>
									)}
								</div>
							) : (
								<h2
									className='text-white underline decoration-dashed underline-offset-4 cursor-pointer'
									onClick={() => setIsEditCity(true)}
								>
									{city != '' ? city : 'Выберите город'}
								</h2>
							)}
						</div>
						{isAuth && (
							<Link
								href='/adds'
								className='font-bold flex items-center text-[14px] ml-2 bg-white p-2 text-[#7AC751] rounded-[10px] hover:text-[#71bb49]'
							>
								Подать объявление
							</Link>
						)}
					</div>
				</div>
				<div className='container flex justify-between'>
					<Link href='/' className='flex items-center'>
						{/* <Image
							priority
							src={Icon}
							alt="Logo"
							width={32}
							height={39}
						/> */}
						<h1 className='text-[24px] text-[#555555] ml-2 font-bold'>
							Furniking
						</h1>
					</Link>
					<Search />
					{isAuth ? (
						<div
							className={
								'flex items-center justify-center relative ' +
								styles.btn_dropdown
							}
						>
							<button>
								<Image
									priority
									src={avatar}
									alt='Avatar'
									width={50}
									height={50}
									className='rounded-full'
								/>
							</button>
							<div className={styles.dropdown}>
								<Link className='block' href='/favourites'>
									Избранное
								</Link>
								<Link className='block' href='/profile'>
									Мои товары
								</Link>
								<Link className='block' href='/settings'>
									Настройки
								</Link>
								<button className='block' onClick={logout}>
									Выход
								</button>
							</div>
						</div>
					) : (
						<div className='flex items-center'>
							<Link
								href='/auth/login'
								className='flex items-center text-[14px] ml-2 bg-[#7AC751] h-full px-4 text-white rounded-[10px] hover:bg-[#71bb49]'
							>
								Войти
							</Link>
						</div>
					)}
				</div>
			</nav>
		</>
	)
}

export default Navbar
