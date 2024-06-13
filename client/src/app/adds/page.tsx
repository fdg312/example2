'use client'

import CreateAddForm from '@/components/form/CreateAddForm'
import { AddService } from '@/services/add'
import { CategoryService } from '@/services/category'
import { UploadService } from '@/services/upload'
import { ICategory } from '@/types/category.interface'
import { useEffect, useState } from 'react'
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
	const [categories, setCategories] = useState<ICategory[]>([])

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormFields>()
	const onSubmit = (form: FormFields) => {
		const category = getCategory(form.subcategory)
		UploadService.upload(getArrayFiles(form.images))
		const images = getArrayStringImages(form.images)

		if (!category && checkCityIncluding(form.city)) return 0

		const data = {
			...form,
			images,
			category: category?.name,
			price: +form.price,
		}
		console.log(data)

		// AddService.create(data)
		// reset()
	}

	const getCategory = (subcategory: string) => {
		return categories.find(category =>
			category.subcategories.find(c => c.slug === subcategory)
		)
	}

	const checkCityIncluding = (target: string) => {
		return (
			data.filter(obj => obj.city.toLowerCase().includes(target.toLowerCase()))
				.length == 1
		)
	}

	const getArrayStringImages = (images: { id: number; image: File }[]) => {
		return images.map(image => image.image.name)
	}

	const getArrayFiles = (images: { id: number; image: File }[]) => {
		return images.map(image => image.image)
	}

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
			/>
		</div>
	)
}

export default CreateAdd
