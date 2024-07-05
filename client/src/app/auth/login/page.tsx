'use client'

import LoginForm from '@/components/form/LoginForm'
import Modal from '@/components/modal/Modal'
import useAuth from '@/stores/authStore'
import { IAuthLogin } from '@/types/auth.interface'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const Page = () => {
	const { login } = useAuth()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IAuthLogin>()
	const onSubmit = (form: IAuthLogin) => {
		login(form)
		reset()
		window.location.href = '/'
	}

	return (
		<Modal>
			<LoginForm
				errors={errors}
				register={register}
				onSubmit={handleSubmit(onSubmit)}
			/>
		</Modal>
	)
}

export default Page
