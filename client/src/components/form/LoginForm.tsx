import Link from 'next/link'
import { FieldErrors, SubmitHandler, UseFormRegister } from 'react-hook-form'
import InputForm from '../input/inputForm/InputForm'

type LoginFormType = {
	errors: FieldErrors<any>
	register: UseFormRegister<any>
	onSubmit: SubmitHandler<any>
}

const LoginForm = ({ errors, register, onSubmit }: LoginFormType) => {
	const inputRegisterProps = {
		minLength: {
			value: 3,
			message: 'Минимальная длина 3 символа',
		},
		maxLength: {
			value: 20,
			message: 'Максимальная длина 20 символов',
		},
	}
	return (
		<form onSubmit={onSubmit} className='p-8'>
			<h2 className='text-2xl mb-4'>Вход</h2>
			<InputForm
				type='email'
				name='email'
				label='Почта'
				pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
				register={register}
				errors={errors}
				required={true}
			/>
			<InputForm
				type='password'
				name='password'
				label='Пароль'
				register={register}
				errors={errors}
				required={true}
				registerFileds={{
					minLength: {
						value: 8,
						message: 'Минимальная длина 8 символов',
					},
					maxLength: {
						value: 20,
						message: 'Максимальная длина 20 символов',
					},
				}}
			/>
			<button className='bg-[#7AC751] hover:bg-[#71bb49] text-white font-bold py-2 px-4 rounded-[10px] mb-2'>
				Войти
			</button>
			<div>
				<span className='mr-1'>Ещё нет аккаунта?</span>
				<Link className='text-[#7AC751]' href='/auth/signup'>
					Зарегистрироваться
				</Link>
			</div>
			<div>
				<Link className='text-[#7AC751]' href='/auth/forgot-password'>
					Забыл пароль?
				</Link>
			</div>
		</form>
	)
}

export default LoginForm
