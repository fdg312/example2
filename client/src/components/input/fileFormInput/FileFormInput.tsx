import Image from 'next/image'
import { useRef, useState } from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import slugify from 'slugify'
import styles from './fileforminput.module.scss'

type FileFormInputProps = {
	errors: FieldErrors<any>
	control: Control<any>
	label: string
	images: { image: File; id: number }[]
	setImages: React.Dispatch<React.SetStateAction<{ image: File; id: number }[]>>
	maxImages: number
	maxSize?: number
}

export const FileFormInput = ({
	errors,
	control,
	label,
	images,
	setImages,
	maxImages,
	maxSize = 0.001 * 1024 * 1024,
}: FileFormInputProps) => {
	const [previewImages, setPreviewImages] = useState<
		{ image: string; id: number }[]
	>([])
	const fileInputRef = useRef<HTMLInputElement>(null)

	const multiplieChangeImages = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files
		if (files!.length + images.length > maxImages) return

		let imagesArr = images

		if (files) {
			const sizeImages = Array.from(files)?.reduce(
				(total, file) => total + file.size,
				0
			)

			if (sizeImages > maxSize) return

			for (let i = 0; i < files.length; i++) {
				let newId =
					imagesArr.length != 0 ? imagesArr[imagesArr.length - 1]?.id + 1 : 0
				imagesArr.push({ image: files[i], id: newId })
			}

			setPreviewImages(
				imagesArr.map(file => ({
					image: URL.createObjectURL(file.image),
					id: file.id,
				}))
			)
			imagesArr = translateFileToEng(imagesArr)
			setImages(imagesArr)

			return imagesArr
		}
	}

	const removeImage = (index: number) => {
		setImages(images.filter(img => img.id !== index))
		setPreviewImages(previewImages.filter(file => file.id !== index))
	}

	const translateFileToEng = (files: { image: File; id: number }[]) =>
		files.map(file => ({
			image: new File([file.image], slugify(file.image.name)),
			id: file.id,
		}))

	return (
		<div className='file-form-div'>
			<label
				htmlFor='images'
				className='block text-sm font-medium leading-6 text-gray-900'
			>
				{label}
			</label>
			<div className='mt-2'>
				<Controller
					control={control}
					name='images'
					render={({ field: { onChange } }) => (
						<div className={styles['file-form-input']}>
							<input
								style={{ display: 'none' }}
								accept='image/*'
								id='images'
								type='file'
								onChange={newValue => onChange(multiplieChangeImages(newValue))}
								ref={fileInputRef}
								multiple={maxImages == 1 ? false : true}
							/>
							<button
								type='button'
								onClick={() => fileInputRef.current?.click()}
							>
								Выберите файлы ({previewImages.length} из {maxImages})
							</button>
						</div>
					)}
				/>
				{errors.images && (
					<p className='text-red-500 text-sm'>Неккоректные файлы</p>
				)}
				<div className='flex wrap'>
					{previewImages.map(file => (
						<div
							className='relative inline-block w-[120px] h-[120px]'
							key={file.id}
						>
							<Image
								className='mr-2'
								// width={120}
								// height={120}
								src={file.image}
								alt='Image'
								fill
								sizes='(max-width: 120px) 120px, 100vw'
								style={{ objectFit: 'cover' }}
							/>
							<button
								onClick={() => removeImage(file.id)}
								className='absolute text-2xl top-0 right-0 text-red-500'
							>
								X
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
