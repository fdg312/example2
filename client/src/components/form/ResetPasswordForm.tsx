import { FieldErrors, SubmitHandler, UseFormRegister } from 'react-hook-form'
import InputForm from '../input/inputForm/InputForm'

type ResetPasswordFormType = {
	errors: FieldErrors<any>
	register: UseFormRegister<any>
	onSubmit: SubmitHandler<any>
}

const ResetPasswordForm = ({
	errors,
	register,
	onSubmit,
}: ResetPasswordFormType) => {
	return (
		<form onSubmit={onSubmit} className='p-8'>
			<h2 className='text-2xl mb-4'>Отправка кода</h2>
			<InputForm
				type='text'
				name='code'
				label='Код'
				register={register}
				errors={errors}
				required={true}
				pattern={/^[0-9]{6}$/}
			/>
			<InputForm
				type='text'
				name='password'
				label='Новый пароль'
				register={register}
				errors={errors}
				minLength={8}
				maxLength={20}
				required={true}
			/>
			<button className='bg-[#7AC751] hover:bg-[#71bb49] text-white font-bold py-2 px-4 rounded-[10px] mb-2'>
				Поменять пароль
			</button>
		</form>
	)
}

export default ResetPasswordForm
