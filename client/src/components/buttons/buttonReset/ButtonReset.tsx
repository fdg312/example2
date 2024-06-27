import styles from './buttonReset.module.scss'

const ButtonReset = ({
	children,
	classes,
}: {
	children: React.ReactNode
	classes?: string
}) => {
	return (
		<button
			type='reset'
			className={styles.btn_reset + (classes ? ' ' + classes : '')}
		>
			{children}
		</button>
	)
}

export default ButtonReset
