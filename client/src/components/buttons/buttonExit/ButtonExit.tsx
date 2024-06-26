import { MouseEventHandler } from 'react'
import styles from './buttonExit.module.scss'

const ButtonExit = ({
	text,
	onClick,
	icon,
	marginY = 6,
	padding = false,
}: {
	text: string
	onClick: MouseEventHandler<HTMLButtonElement>
	icon?: JSX.Element
	marginY?: number
	padding?: boolean
}) => {
	return (
		<button
			onClick={onClick}
			className={styles.btn_exit + (padding ? ' p-[5px]' : '')}
			style={{ margin: `${marginY}px 0` }}
		>
			{icon && icon}
			{text}
		</button>
	)
}

export default ButtonExit
