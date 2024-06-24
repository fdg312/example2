'use client'

import LoginForm from '@/components/form/LoginForm'
import ResetPasswordForm from '@/components/form/ResetPasswordForm'
import Modal from '@/components/modal/Modal'
import useAuth from '@/stores/authStore'
import { IAuthLogin, IResetPassword } from '@/types/auth.interface'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const Page = () => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IResetPassword>()
	const onSubmit = () => {
		router.push('/auth/login')
		reset()
	}

	return (
		<Modal>
			<ResetPasswordForm
				errors={errors}
				register={register}
				onSubmit={handleSubmit(onSubmit)}
			/>
		</Modal>
	)
}

export default Page
