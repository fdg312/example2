'use client'

import SettingsForm from '@/components/form/SettingsForm'
import { UploadService } from '@/services/upload'
import { UserService } from '@/services/user'
import useAuth from '@/stores/authStore'
import { IUser } from '@/types/user.interface'
import { Mulish } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const mulish = Mulish({ subsets: ['cyrillic'] })

interface FormFields extends IUser {
	images: { id: number; image: File }[]
}

const Settings = () => {
	const [images, setImages] = useState<{ id: number; image: File }[]>([])
	const { user, isAuth } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isAuth) {
			router.push('/')
		}
	}, [])

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormFields>()
	const onSubmit = async (form: FormFields) => {
		let avatarPath = ''

		if (form.images.length > 0) {
			const files = await UploadService.upload(getArrayFiles(form.images))
			avatarPath = files[0].filename
		}

		const data = {
			email: form.email,
			name: form.name,
			phone: form.phone,
			avatarPath,
		}

		UserService.update(data)
		reset()
	}

	const getArrayStringImages = (images: { id: number; image: File }[]) => {
		return images.map(image => image.image.name)
	}

	const getArrayFiles = (images: { id: number; image: File }[]) => {
		return images.map(image => image.image)
	}

	// useEffect(() => {
	//     if (user?.avatarPath) {
	//         const file = fs.readFileSync('../uploads/' + user.avatarPath)
	//         console.log(file);

	//         // setImages([{ id: 0, image: user.avatarPath }])
	//     }
	// }, [user])

	return (
		<div className='wrapper flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
			<h2
				className={
					'text-center text-[36px] text-[#555555] mb-8 font-bold' +
					' ' +
					mulish.className
				}
			>
				Настройки
			</h2>
			<SettingsForm
				control={control}
				errors={errors}
				register={register}
				onSubmit={handleSubmit(onSubmit)}
			/>
		</div>
	)
}

export default Settings
