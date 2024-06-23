import {
	FieldErrors,
	SubmitHandler,
	UseFormRegister,
	UseFormReturn,
} from 'react-hook-form'
import InputForm from '../input/inputForm/InputForm'
import Link from 'next/link'

type LoginFormType = {
	errors: FieldErrors<any>
	register: UseFormRegister<any>
	onSubmit: SubmitHandler<any>
}

const LoginForm = ({ errors, register, onSubmit }: LoginFormType) => {
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
				minLength={8}
				maxLength={20}
				required={true}
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
