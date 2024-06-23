'use client'

import LoginForm from '@/components/form/LoginForm'
import SendCodeForm from '@/components/form/SendCodeForm'
import Modal from '@/components/modal/Modal'
import useAuth from '@/stores/authStore'
import { IAuthLogin, ISendCode } from '@/types/auth.interface'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const Page = () => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ISendCode>()
	const onSubmit = () => {
		router.push('/auth/reset-password')
		reset()
	}

	return (
		<Modal>
			<SendCodeForm
				errors={errors}
				register={register}
				onSubmit={handleSubmit(onSubmit)}
			/>
		</Modal>
	)
}

export default Page
