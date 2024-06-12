import {
	FieldErrors,
	SubmitHandler,
	UseFormRegister,
	UseFormReturn,
} from 'react-hook-form'
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
				minLength={3}
				required={true}
			/>
			<button className='bg-[#7AC751] hover:bg-[#71bb49] text-white font-bold py-2 px-4 rounded-[10px] mb-2'>
				Отправить код
			</button>
		</form>
	)
}

export default SendCodeForm
