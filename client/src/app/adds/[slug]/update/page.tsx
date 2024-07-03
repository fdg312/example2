'use client'

import UpdateAddForm from '@/components/form/UpdateAddForm'
import { AddService } from '@/services/add'
import useAuth from '@/stores/authStore'
import { IAddResponse } from '@/types/add.interface'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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

const UpdateAddPage = ({ params }: { params: { slug: string } }) => {
	const [images, setImages] = useState<{ id: number; image: File }[]>([])
	const [add, setAdd] = useState<IAddResponse>()
	const { user } = useAuth()

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
		setValue,
		watch,
	} = useForm<FormFields>()

	const onSubmit = (form: FormFields) => {
		form.price = +form.price

		add && AddService.update(form, add.id)
	}

	useEffect(() => {
		async function fetchData() {
			const add = await AddService.getBySlug(params.slug)
			if (add.user.id !== user?.id) redirect('/')

			setAdd(add)

			reset({
				phone: add.phone,
				title: add.title,
				text: add.text,
				address: add.address,
				city: add.city,
				price: add.price,
				subcategory: add.subcategory?.slug,
			})
		}

		fetchData()
	}, [])

	return (
		<div className='wrapper flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
			<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
				Изменение объявления
			</h2>
			<UpdateAddForm
				register={register}
				onSubmit={handleSubmit(onSubmit)}
				errors={errors}
				control={control}
				images={images}
				setImages={setImages}
			/>
		</div>
	)
}

export default UpdateAddPage
