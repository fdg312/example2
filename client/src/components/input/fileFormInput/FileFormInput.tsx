import { useRef, useState } from "react"
import { Control, Controller, FieldErrors } from "react-hook-form"
import styles from './fileforminput.module.scss'
import Image from 'next/image'

type FileFormInputProps = {
    errors: FieldErrors<any>
    control: Control<any>
    label: string
    images: { image: File, id: number }[]
    setImages: React.Dispatch<React.SetStateAction<{ image: File, id: number }[]>>
    maxImages: number
}

export const FileFormInput = ({ errors, control, label, images, setImages, maxImages }: FileFormInputProps) => {
    const [previewImages, setPreviewImages] = useState<{ image: string, id: number }[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    console.log(images, 'images');
    
    const multiplieChangeImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const files = event.target.files
        if (files!.length + images.length > maxImages) return
        console.log(files);
        
        let imagesArr = images
        if (files) {
            for (let i = 0; i < files.length; i++) {
                let newId = imagesArr.length != 0 ? imagesArr[imagesArr.length - 1]?.id + 1 : 0
                imagesArr.push({ image: files[i], id: newId })
            }

            setPreviewImages(imagesArr.map(file => ({ image: URL.createObjectURL(file.image), id: file.id })))
            setImages(imagesArr)
            
            return imagesArr
        }
    }

    const removeImage = (index: number) => {        
        setImages(images.filter(img => img.id !== index))
        setPreviewImages(previewImages.filter(file => file.id !== index))
    }
    return (
        <div className="file-form-div">
            <label htmlFor="images" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                <Controller
                    control={control}
                    name="images"
                    render={({ field: { onChange }}) => (
                        <div className={styles['file-form-input']}>
                            <input 
                            style={{ display: 'none' }} 
                            accept="image/*" 
                            id="images" 
                            type="file" 
                            onChange={newValue => onChange(multiplieChangeImages(newValue))} 
                            ref={fileInputRef}
                            multiple={maxImages == 1 ? false : true}/>
                            <button type="button" onClick={() => fileInputRef.current?.click()}>
                                Выберите файлы ({previewImages.length} из {maxImages})
                            </button>
                        </div>                    )}
                />
                {errors.images && <p className="text-red-500 text-sm">Некорректные фото</p>}
                <div className="flex wrap">
                    {previewImages.map((file) => (
                        <div className="relative inline-block" key={file.id}>
                            <Image className="mr-2" width={120} height={120} src={file.image} alt="Image" />
                            <button onClick={() => removeImage(file.id)} className="absolute text-2xl top-0 right-0 text-red-500">X</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}