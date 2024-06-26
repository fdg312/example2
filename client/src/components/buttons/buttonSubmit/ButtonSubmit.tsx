import styles from './buttonSubmit.module.scss'

const ButtonSubmit = ({ children }) => {
	return <button type='submit' className={styles.btn_submit}>{children}</button>
}
