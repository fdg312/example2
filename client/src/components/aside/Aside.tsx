'use client'

import { asidePages } from '@/constants'
import useAuth from '@/stores/authStore'
import { usePathname } from 'next/navigation'
import { LuHeart, LuSettings, LuShoppingCart } from 'react-icons/lu'
import { RxExit } from 'react-icons/rx'
import Button from '../buttons/buttonExit/ButtonExit'
import ButtonLink from '../buttons/buttonLink/ButtonLink'
import styles from './aside.module.scss'
import ButtonExit from '../buttons/buttonExit/ButtonExit'

const Aside = () => {
	const pathname = usePathname()
	const { logout } = useAuth()
	const check = asidePages.includes(
		pathname.split('/')[pathname.split('/').length - 1]
	)

	return (
		check && (
			<aside className={styles.aside}>
				<div className={styles.upper}>
					<ButtonLink
						padding={true}
						marginY={3}
						href='/profile'
						text='Мои объявления'
						icon={<LuShoppingCart className='inline mr-[10px]' />}
					/>
					<ButtonLink
						padding={true}
						marginY={3}
						href='/favourites'
						text='Избранное'
						icon={<LuHeart className='inline mr-[10px]' />}
					/>
					<ButtonLink
						padding={true}
						marginY={3}
						href='/settings'
						text='Настройки'
						icon={<LuSettings className='inline mr-[10px]' />}
					/>
				</div>
				<div className={styles.lower}>
					<ButtonExit
						marginY={3}
						padding={true}
						onClick={logout}
						icon={<RxExit className='inline mr-[10px]' />}
					>
						Выйти
					</ButtonExit>
				</div>
			</aside>
		)
	)
}

export default Aside
