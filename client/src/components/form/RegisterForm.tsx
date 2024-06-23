import Link from 'next/link'
import { FieldErrors, SubmitHandler, UseFormRegister } from 'react-hook-form'
import InputForm from '../input/inputForm/InputForm'

type RegisterFormType = {
	errors: FieldErrors<any>
	register: UseFormRegister<any>
	onSubmit: SubmitHandler<any>
}

const RegisterForm = ({ errors, register, onSubmit }: RegisterFormType) => {
	return (
		<form onSubmit={onSubmit} className='p-8'>
			<h2 className='text-2xl mb-4'>Регистрация</h2>
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
				minLength={3}
				required={true}
			/>
			<InputForm
				type='phone'
				name='phone'
				label='Номер телефона'
				pattern={
					/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
				}
				register={register}
				errors={errors}
				required={true}
			/>
			<InputForm
				type='text'
				name='name'
				label='ФИО'
				register={register}
				errors={errors}
				required={true}
			/>
			<button className='bg-[#7AC751] hover:bg-[#71bb49] text-white font-bold py-2 px-4 rounded-[10px] mb-2'>
				Регистрация
			</button>
			<div>
				<span className='mr-1'>Уже есть аккаунт?</span>
				<Link className='text-[#7AC751]' href='/auth/login'>
					Войти
				</Link>
			</div>
		</form>
	)
}

export default RegisterForm
