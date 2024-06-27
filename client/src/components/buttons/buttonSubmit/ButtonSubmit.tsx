import styles from './buttonSubmit.module.scss'

const ButtonSubmit = ({
	children,
	classes,
}: {
	children: React.ReactNode
	classes?: string
}) => {
	return (
		<button
			type='submit'
			className={styles.btn_submit + (classes ? ' ' + classes : '')}
		>
			{children}
		</button>
	)
}

export default ButtonSubmit
