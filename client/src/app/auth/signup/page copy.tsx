'use client'

import InputForm from '@/components/input/inputForm/InputForm'
import { AuthService } from '@/services/auth'
import useAuth from '@/stores/authStore'
import { IAuthRegister } from '@/types/auth.interface'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type SendCodeType = {
	email: string
}

type ResetPasswordType = {
	code: string
	password: string
}

const Page = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [isForgotPassword, setIsForgotPassword] = useState(false)
	const [isResetPassword, setIsResetPassword] = useState(false)
	const [email, setEmail] = useState('')
	const { login, signup } = useAuth()
	const modalRef = useRef<HTMLDivElement>(null)
	const router = useRouter()

	const RegisterForm = useForm<IAuthRegister>()
	const onSubmit = (form: IAuthRegister) => {
		isLogin ? login(form) : signup(form)
		router.back()
		RegisterForm.reset()
	}

	const SendCodeForm = useForm<SendCodeType>()
	const onSubmitSC = (form: SendCodeType) => {
		console.log(form.email, 'form.email')

		isForgotPassword && AuthService.forgotPassword(form.email)
		setEmail(form.email)
		SendCodeForm.reset()
		setIsResetPassword(true)
		setIsForgotPassword(false)
	}

	const ResetPasswordForm = useForm<ResetPasswordType>()
	const onSubmitRP = (form: ResetPasswordType) => {
		isResetPassword && AuthService.verifyCode(email, form.password, form.code)
		setIsResetPassword(false)
		setIsForgotPassword(false)
		setEmail('')
		ResetPasswordForm.reset()
	}

	const handleClose = () => {
		router.back()
	}

	useEffect(() => {
		setEmail('')
		setIsResetPassword(false)
		setIsForgotPassword(false)
		RegisterForm.reset()
	}, [isLogin])

	return (
		<div className={`fixed z-10 inset-0 overflow-y-auto ${'block'}`}>
			<div
				className='flex items-center justify-center min-h-screen'
				onClick={handleClose}
			>
				<div className='fixed inset-0 transition-opacity' aria-hidden='true'>
					<div className='absolute inset-0 bg-gray-500 opacity-75'></div>
				</div>
				<div
					ref={modalRef}
					className='relative bg-white rounded-lg overflow-hidden max-w-md min-w-[380px]'
				>
					{isResetPassword ? (
						<form
							onSubmit={ResetPasswordForm.handleSubmit(onSubmitRP)}
							className='p-8'
						>
							<h2 className='text-2xl mb-4'>Отправка кода</h2>
							<InputForm
								type='text'
								name='code'
								label='Код'
								register={ResetPasswordForm.register}
								errors={ResetPasswordForm.formState.errors}
								minLength={3}
								required={true}
							/>
							<InputForm
								type='text'
								name='password'
								label='Новый пароль'
								register={ResetPasswordForm.register}
								errors={ResetPasswordForm.formState.errors}
								minLength={3}
								required={true}
							/>
							<button className='bg-[#7AC751] hover:bg-[#71bb49] text-white font-bold py-2 px-4 rounded-[10px] mb-2'>
								Поменять пароль
							</button>
						</form>
					) : isForgotPassword ? (
						<form
							onSubmit={SendCodeForm.handleSubmit(onSubmitSC)}
							className='p-8'
						>
							<h2 className='text-2xl mb-4'>Отправка кода</h2>
							<InputForm
								type='text'
								name='email'
								label='Почта'
								register={SendCodeForm.register}
								errors={SendCodeForm.formState.errors}
								minLength={3}
								required={true}
							/>
							<button className='bg-[#7AC751] hover:bg-[#71bb49] text-white font-bold py-2 px-4 rounded-[10px] mb-2'>
								Отправить код
							</button>
						</form>
					) : isLogin ? (
						<form
							onSubmit={RegisterForm.handleSubmit(onSubmit)}
							className='p-8'
						>
							<h2 className='text-2xl mb-4'>Вход</h2>
							<InputForm
								type='email'
								name='email'
								label='Почта'
								pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
								register={RegisterForm.register}
								errors={RegisterForm.formState.errors}
								minLength={3}
								required={true}
							/>
							<InputForm
								type='password'
								name='password'
								label='Пароль'
								register={RegisterForm.register}
								errors={RegisterForm.formState.errors}
								minLength={3}
								required={true}
							/>
							<button className='bg-[#7AC751] hover:bg-[#71bb49] text-white font-bold py-2 px-4 rounded-[10px] mb-2'>
								Войти
							</button>
							<div>
								<span className='mr-1'>Ещё нет аккаунта?</span>
								<button
									className='text-[#7AC751]'
									onClick={() => setIsLogin(false)}
								>
									Зарегистрироваться
								</button>
							</div>
							<div>
								<button
									className='text-[#7AC751]'
									onClick={() => setIsForgotPassword(true)}
								>
									Забыл пароль?
								</button>
							</div>
						</form>
					) : (
						<form
							onSubmit={RegisterForm.handleSubmit(onSubmit)}
							className='p-8'
						>
							<h2 className='text-2xl mb-4'>Регистрация</h2>
							<InputForm
								type='email'
								name='email'
								label='Почта'
								pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
								register={RegisterForm.register}
								errors={RegisterForm.formState.errors}
								minLength={3}
								required={true}
							/>
							<InputForm
								type='password'
								name='password'
								label='Пароль'
								register={RegisterForm.register}
								errors={RegisterForm.formState.errors}
								minLength={3}
								required={true}
							/>
							<InputForm
								type='phone'
								name='phone'
								label='Номер телефона'
								pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
								register={RegisterForm.register}
								errors={RegisterForm.formState.errors}
								minLength={3}
								required={true}
							/>
							<InputForm
								type='text'
								name='name'
								label='ФИО'
								register={RegisterForm.register}
								errors={RegisterForm.formState.errors}
								minLength={3}
								required={true}
							/>
							<button className='bg-[#7AC751] hover:bg-[#71bb49] text-white font-bold py-2 px-4 rounded-[10px] mb-2'>
								Регистрация
							</button>
							<div>
								<span className='mr-1'>Уже есть аккаунт?</span>
								<button
									className='text-[#7AC751]'
									onClick={() => setIsLogin(true)}
								>
									Войти
								</button>
							</div>
						</form>
					)}
					<button className='absolute top-0 right-0 m-4' onClick={handleClose}>
						<svg
							className='h-6 w-6 text-gray-600'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Page
