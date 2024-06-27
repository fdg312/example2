import { FieldErrors, SubmitHandler, UseFormRegister } from 'react-hook-form'
import ButtonSubmit from '../buttons/buttonSubmit/ButtonSubmit'
import InputForm from '../input/inputForm/InputForm'

type SendCodeFormType = {
	errors: FieldErrors<any>
	register: UseFormRegister<any>
	onSubmit: SubmitHandler<any>
}

const SendCodeForm = ({ errors, register, onSubmit }: SendCodeFormType) => {
	return (
		<form onSubmit={onSubmit} className='p-8'>
			<h2 className='text-2xl mb-4'>Отправка кода</h2>
			<InputForm
				type='text'
				name='email'
				label='Почта'
				register={register}
				errors={errors}
				required={true}
				pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
			/>
			<ButtonSubmit classes='mt-2 float-end'>Отправить</ButtonSubmit>
		</form>
	)
}

export default SendCodeForm
