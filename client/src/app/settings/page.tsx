'use client'

import { FileFormInput } from '@/components/input/fileFormInput/FileFormInput'
import InputForm from '@/components/input/inputForm/InputForm'
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
			<form
				onSubmit={handleSubmit(onSubmit)}
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
							minLength={3}
							required={false}
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
                <ButtonSubmit>Сохранить изменения</ButtonSubmit>
				{/* <button
					type='submit'
					className='mb-3 flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
				>
					Сохранить изменения
				</button> */}
			</form>
		</div>
	)
}

export default Settings
