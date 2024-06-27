import {
	Control,
	FieldErrors,
	SubmitHandler,
	UseFormRegister,
} from 'react-hook-form'
import ButtonSubmit from '../buttons/buttonSubmit/ButtonSubmit'
import InputForm from '../input/inputForm/InputForm'
import ButtonReset from '../buttons/buttonReset/ButtonReset'

type UpdateAddFormType = {
	errors: FieldErrors<any>
	register: UseFormRegister<any>
	onSubmit: SubmitHandler<any>
	control: Control<any>
	images?: { id: number; image: File }[]
	setImages?: React.Dispatch<
		React.SetStateAction<{ id: number; image: File }[]>
	>
}

const SettingsForm = ({
	errors,
	register,
	onSubmit,
	control,
	images,
	setImages,
}: UpdateAddFormType) => {
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
		<form
			onSubmit={onSubmit}
			className='space-y-6 sm:mx-auto sm:w-full sm:max-w-lg'
		>
			<div className='flex'>
				<div className='w-1/2 mr-2'>
					<InputForm
						type='email'
						name='email'
						label='Почта'
						pattern={/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/}
						register={register}
						errors={errors}
						required={false}
					/>
				</div>
				<div className='w-1/2 mr-2'>
					<InputForm
						type='phone'
						name='phone'
						label='Телефон'
						register={register}
						errors={errors}
						required={false}
					/>
				</div>
			</div>
			<div>
				<div>
					<InputForm
						type='text'
						name='name'
						label='ФИО'
						register={register}
						errors={errors}
						required={false}
						registerFileds={inputRegisterProps}
					/>
				</div>
			</div>
			<div className='float-end'>
				<ButtonReset classes='mr-6'>Сбросить</ButtonReset>
				<ButtonSubmit>Сохранить изменения</ButtonSubmit>
			</div>
			{/* <FileFormInput
				errors={errors}
				control={control}
				label='Фото'
				images={images}
				setImages={setImages}
				maxImages={1}
			/> */}
		</form>
	)
}

export default SettingsForm
