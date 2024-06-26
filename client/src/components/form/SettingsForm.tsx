import {
	Control,
	FieldErrors,
	SubmitHandler,
	UseFormRegister,
} from 'react-hook-form'
import InputForm from '../input/inputForm/InputForm'
import { FileFormInput } from '../input/fileFormInput/FileFormInput'

type UpdateAddFormType = {
	errors: FieldErrors<any>
	register: UseFormRegister<any>
	onSubmit: SubmitHandler<any>
	control: Control<any>
	images: { id: number; image: File }[]
	setImages: React.Dispatch<React.SetStateAction<{ id: number; image: File }[]>>
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
			<FileFormInput
				errors={errors}
				control={control}
				label='Фото'
				images={images}
				setImages={setImages}
				maxImages={1}
			/>
			{/* <button
				type='submit'
				className='mb-3 flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
			>
				Сохранить изменения
			</button> */}
		</form>
	)
}
