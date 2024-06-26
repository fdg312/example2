import Link from 'next/link'
import styles from './buttonLink.module.scss'

const ButtonLink = ({
	text,
	href,
	icon,
	marginY = 6,
	padding = false,
}: {
	text: string
	href: string
	icon?: JSX.Element
	marginY?: number
	padding?: boolean
}) => {
	return (
		<Link
			href={href}
			className={styles.btn_link + (padding ? ' p-[5px]' : '')}
			style={{ margin: `${marginY}px 0` }}
		>
			{icon && icon}
			{text}
		</Link>
	)
}

export default ButtonLink
