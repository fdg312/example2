import { MouseEventHandler } from 'react'
import styles from './buttonStatus.module.scss'

const ButtonStatus = ({
	children,
	icon,
	classes,
	status,
	onClick,
}: {
	children: React.ReactNode
	status: boolean
	onClick?: MouseEventHandler<HTMLButtonElement>
	classes?: string
	icon?: JSX.Element
}) => {
	console.log(status, 'status')

	return (
		<button
			onClick={onClick}
			className={
				styles.btn_status +
				(status ? ` ${styles.active}` : '') +
				(classes ? ' ' + classes : '')
			}
		>
			{icon && icon}
			{children}
		</button>
	)
}

export default ButtonStatus
