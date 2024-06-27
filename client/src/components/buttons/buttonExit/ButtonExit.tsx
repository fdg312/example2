import { MouseEventHandler } from 'react'
import styles from './buttonExit.module.scss'

const ButtonExit = ({
	children,
	onClick,
	icon,
	marginY = 6,
	padding = false,
}: {
	children: React.ReactNode
	onClick: MouseEventHandler<HTMLButtonElement>
	icon?: JSX.Element
	marginY?: number
	padding?: boolean
}) => {
	return (
		<button
			onClick={onClick}
			className={styles.btn_exit + (padding ? ' p-[5px]' : '')}
			// {marginY && style={{ margin: `${marginY}px 0` }}}
		>
			{icon && icon}
			{children}
		</button>
	)
}

export default ButtonExit
