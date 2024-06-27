import Link from 'next/link'
import { FieldErrors, SubmitHandler, UseFormRegister } from 'react-hook-form'
import ButtonSubmit from '../buttons/buttonSubmit/ButtonSubmit'
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
				registerFileds={{
					minLength: {
						value: 3,
						message: 'Минимальная длина 3 символа',
					},
					maxLength: {
						value: 20,
						message: 'Максимальная длина 20 символов',
					},
				}}
				register={register}
				errors={errors}
				required={true}
			/>
			<ButtonSubmit classes='mt-2 float-end'>Регистрация</ButtonSubmit>
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
