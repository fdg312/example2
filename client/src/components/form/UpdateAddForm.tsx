import useSessionStore from '@/stores/sessionStore'
import { useEffect, useState } from 'react'
import {
	Control,
	Controller,
	FieldErrors,
	SubmitHandler,
	UseFormRegister,
} from 'react-hook-form'
import data from '../../constants/russia.json'
import InputForm from '../input/inputForm/InputForm'
import { CategorySelect } from '../select/categoryselect/CategorySelect'

type UpdateAddFormType = {
	errors: FieldErrors<any>
	register: UseFormRegister<any>
	onSubmit: SubmitHandler<any>
	control: Control<any>
	images: { id: number; image: File }[]
	setImages: React.Dispatch<React.SetStateAction<{ id: number; image: File }[]>>
}

const UpdateAddForm = ({
	errors,
	register,
	onSubmit,
	control,
	images,
	setImages,
}: UpdateAddFormType) => {
	const [isEditCity, setIsEditCity] = useState(false)
	const [city, setCity] = useState('')
	const [cities, setCities] = useState<{ region: string; city: string }[]>([])
	const { categories } = useSessionStore()

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

	useEffect(() => {
		if (!city && isEditCity) return
		setCities(
			data
				.filter(obj => obj.city.toLowerCase().includes(city.toLowerCase()))
				.slice(0, 3)
		)
	}, [city])

	const handleClickChangeCity = (target: string) => {
		console.log(333)

		setIsEditCity(false)
		setCity(target)
		setCities([])
	}

	const checkCityIncluding = (target: string) => {
		const filteredData = data.filter(obj =>
			obj.city.toLowerCase().includes(target.toLowerCase())
		)

		if (filteredData.length === 1) {
			return target === filteredData[0].city
		}
	}

	const handleChangeCity = (target: string) => {
		console.log(123)

		if (checkCityIncluding(target)) {
			setIsEditCity(false)
			setCity(target)
			return
		}
		setIsEditCity(true)
		setCity(target)
	}

	const handleBlurCity = (e: React.FocusEvent) => {
		console.log(321)

		setTimeout(() => {
			setIsEditCity(false)
		}, 100)
	}

	return (
		<form
			onSubmit={onSubmit}
			className='space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-lg'
		>
			<div className='flex'>
				<div className='w-1/2 mr-2'>
					<InputForm
						type='text'
						name='title'
						label='Заголовок'
						register={register}
						errors={errors}
						required={true}
						registerFileds={inputRegisterProps}
					/>
				</div>
				<div className='w-1/2'>
					<InputForm
						type='phone'
						name='phone'
						label='Телефон'
						register={register}
						errors={errors}
						pattern={
							/^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
						}
						required={true}
					/>
				</div>
			</div>
			<div className='flex'>
				<div className='w-1/2 mr-2'>
					<label
						htmlFor='city'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Город
					</label>
					<div className='mt-2 relative'>
						<input
							id='city'
							type='text'
							{...register('city', {
								required: {
									value: true,
									message: 'Поле обязательно для заполнения',
								},
								...inputRegisterProps,
							})}
							onChange={e => handleChangeCity(e.target.value)}
							onBlur={e => handleBlurCity(e)}
							value={city}
							className={
								'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6 ' +
								(errors.city?.type === 'pattern' ||
									(errors.city?.type === 'required' && 'ring-red-500'))
							}
						/>
						{errors.city && (
							<p className='text-red-500 text-sm'>
								{errors.city.message as string}
							</p>
						)}
						{isEditCity && (
							<div className='absolute top-[28px] w-full left-0 ps-3 bg-white'>
								{cities?.map(obj => (
									<p
										onClick={() => handleClickChangeCity(obj.city)}
										key={obj.city}
										className='cursor-pointer border-[#555555] border-b-2 block'
									>
										{obj.city}
									</p>
								))}
							</div>
						)}
					</div>
				</div>
				<div className='w-1/2'>
					<InputForm
						type='text'
						name='address'
						label='Адрес'
						register={register}
						errors={errors}
						required={true}
						registerFileds={inputRegisterProps}
					/>
				</div>
			</div>
			<div className='flex'>
				<div className='w-1/2 mr-2'>
					<InputForm
						type='text'
						name='price'
						label='Цена'
						register={register}
						errors={errors}
						required={true}
					/>
				</div>
			</div>
			<div>
				<label
					htmlFor='subcategory'
					className='block text-sm font-medium leading-6 text-gray-900'
				>
					Категория
				</label>
				<div className='mt-2'>
					<Controller
						control={control}
						name='subcategory'
						rules={{
							required: { value: true, message: 'Это поле обязательно' },
						}}
						render={({ field: { onChange, value } }) => (
							<CategorySelect
								id='subcategory'
								categories={categories}
								value={value}
								styles='w-full'
								onChange={onChange}
							/>
						)}
					/>
					{errors.subcategory && (
						<p className='text-red-500 text-sm'>
							{errors.subcategory.message as string}
						</p>
					)}
				</div>
			</div>
			{/* <FileFormInput
				errors={errors}
				control={control}
				label='Фото'
				images={images}
				setImages={setImages}
				maxImages={8}
			/> */}
			<div>
				<label
					htmlFor='text'
					className='block text-sm font-medium leading-6 text-gray-900'
				>
					Описание
				</label>
				<div className='mt-2'>
					<textarea
						id='text'
						{...register('text', {
							required: {
								value: true,
								message: 'Поле обязательно для заполнения',
							},
							minLength: {
								value: 10,
								message: 'Минимальная длина 10 символов',
							},
							maxLength: {
								value: 1000,
								message: 'Максимальная длина 1000 символов',
							},
						})}
						className={
							'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6 ' +
							(errors.text?.type === 'pattern' ||
								(errors.text?.type === 'required' && 'ring-red-500'))
						}
					/>
					{errors.text && (
						<p className='text-red-500 text-sm'>
							{errors.text.message as string}
						</p>
					)}
				</div>
			</div>
			<button
				type='submit'
				className='mb-3 flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
			>
				Сохранить изменения
			</button>
		</form>
	)
}

export default UpdateAddForm
