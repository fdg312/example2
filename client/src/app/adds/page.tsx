'use client'

import CreateAddForm from '@/components/form/CreateAddForm'
import useSessionStore from '@/stores/sessionStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import data from '../../constants/russia.json'

type FormFields = {
	images: { id: number; image: File }[]
	phone: string
	title: string
	text: string
	address: string
	city: string
	price: number
	subcategory: string
}

const CreateAdd = () => {
	const { categories } = useSessionStore()
	const [images, setImages] = useState<{ id: number; image: File }[]>([])
	const router = useRouter()

	const {
		register,
		handleSubmit,
		control,
		reset,
		setValue,
		setError,
		formState: { errors },
	} = useForm<FormFields>()
	const onSubmit = (form: FormFields) => {
		console.log(form)

		// const category = getCategory(form.subcategory)
		// UploadService.upload(getArrayFiles(form.images))
		// const stringImages = getArrayStringImages(form.images)

		// if (!category && checkCityIncluding(form.city)) return

		// const data = {
		// 	...form,
		// 	images: stringImages,
		// 	category: category?.slug,
		// 	price: +form.price,
		// }

		// AddService.create(data)
		// reset()
		// router.push('/profile')
	}

	const getCategory = (subcategory: string) => {
		return categories.find(category =>
			category.subcategories.find(c => c.slug === subcategory)
		)
	}

	const checkCityIncluding = (target: string) => {
		const filteredData = data.filter(obj =>
			obj.city.toLowerCase().includes(target.toLowerCase())
		)

		if (filteredData.length === 1) {
			return target === filteredData[0].city
		}
	}

	const getArrayStringImages = (images: { id: number; image: File }[]) => {
		return images.map(image => image.image.name)
	}

	const getArrayFiles = (images: { id: number; image: File }[]) => {
		return images.map(image => image.image)
	}

	console.log('/adds rerender')

	return (
		<div className='wrapper flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
			<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
				Создание объявления
			</h2>
			<CreateAddForm
				register={register}
				onSubmit={handleSubmit(onSubmit)}
				errors={errors}
				control={control}
				images={images}
				setImages={setImages}
				setValue={setValue}
				setError={setError}
			/>
		</div>
	)
}

export default CreateAdd
