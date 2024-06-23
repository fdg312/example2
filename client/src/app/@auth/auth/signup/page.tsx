'use client'

import RegisterForm from '@/components/form/RegisterForm'
import Modal from '@/components/modal/Modal'
import useAuth from '@/stores/authStore'
import { IAuthRegister } from '@/types/auth.interface'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const Page = () => {
	const { signup } = useAuth()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IAuthRegister>()
	const onSubmit = (form: IAuthRegister) => {
		signup(form)
		router.push('/')
		reset()
	}

	return (
		<Modal>
			<RegisterForm
				errors={errors}
				register={register}
				onSubmit={handleSubmit(onSubmit)}
			/>
		</Modal>
	)
}

export default Page
