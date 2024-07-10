import Link from 'next/link'
import './profilediv.scss'

type ProfileType = {
	createdAt: Date
	name: string
	id: string
}

export const ProfileDiv = ({ ...props }: ProfileType) => {
	return (
		<div className='profile'>
			<div
				className={`w-[48px] h-[48px] bg-black rounded-full mr-[10px] flex`}
			></div>
			<div>
				<Link href={'/profile/' + props.id} className='profile__name'>
					{props.name}
				</Link>
				<p className='profile__date'>
					Зарегистрирован:{' '}
					{props.createdAt
						.toISOString()
						.split('T')[0]
						.split('-')
						.reverse()
						.join('.')}
				</p>
			</div>
		</div>
	)
}
