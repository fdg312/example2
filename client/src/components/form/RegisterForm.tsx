import {
	FieldErrors,
	SubmitHandler,
	UseFormRegister,
	UseFormReturn,
} from 'react-hook-form'
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
				minLength={3}
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
				pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
				register={register}
				errors={errors}
				minLength={3}
				required={true}
			/>
			<InputForm
				type='text'
				name='name'
				label='ФИО'
				register={register}
				errors={errors}
				minLength={3}
				required={true}
			/>
			<button className='bg-[#7AC751] hover:bg-[#71bb49] text-white font-bold py-2 px-4 rounded-[10px] mb-2'>
				Регистрация
			</button>
			<div>
				<span className='mr-1'>Уже есть аккаунт?</span>
				<button className='text-[#7AC751]' onClick={() => setIsLogin(true)}>
					Войти
				</button>
			</div>
		</form>
	)
}

export default RegisterForm
