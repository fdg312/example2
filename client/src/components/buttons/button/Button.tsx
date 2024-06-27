import { MouseEventHandler } from 'react'
import styles from './button.module.scss'

const Button = ({
	children,
	icon,
	classes,
	onClick,
}: {
	children: React.ReactNode
	onClick?: MouseEventHandler<HTMLButtonElement>
	classes?: string
	icon?: JSX.Element
}) => {
	return (
		<button
			className={styles.btn + (classes ? ' ' + classes : '')}
			onClick={onClick}
		>
			{icon && icon}
			{children}
		</button>
	)
}

export default Button
