import { FieldErrors, SubmitHandler, UseFormRegister } from 'react-hook-form'
import InputForm from '../input/inputForm/InputForm'
import ButtonSubmit from '../buttons/buttonSubmit/ButtonSubmit'

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
				required={true}
			/>
			<ButtonSubmit classes='mt-2 float-end'>Сменить пароль</ButtonSubmit>
		</form>
	)
}

export default ResetPasswordForm
