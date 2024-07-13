import { Dispatch, SetStateAction } from 'react'
import styles from './myinput.module.scss'

type InputType = {
	text: string
	setValue: Dispatch<SetStateAction<string>>
	value: string
	width: string
	type?: string
	onKeyEnter?: () => void
}

export const MyInput = ({
	text,
	setValue,
	value,
	onKeyEnter,
	type = 'text',
	width,
}: InputType) => {
	return (
		<input
			className={styles.input}
			style={{ width }}
			type={type}
			placeholder={text}
			onChange={e => setValue(e.target.value)}
			value={value}
			onKeyDown={e => e.key === 'Enter' && onKeyEnter && onKeyEnter()}
		/>
	)
}
