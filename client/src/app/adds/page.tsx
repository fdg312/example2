'use client'

import { AddService } from "@/services/add"
import { CategoryService } from "@/services/category"
import { UploadService } from "@/services/upload"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import data from '../../constants/russia.json'
import InputForm from "@/components/input/inputForm/InputForm"
import { CategorySelect } from "@/components/select/categoryselect/CategorySelect"
import { ICategory } from "@/types/category.interface"
import { FileFormInput } from "@/components/input/fileFormInput/FileFormInput"

type FormFields = {
    images: {id: number, image: File}[]
    phone: string
    title: string
    text: string
    address: string
    city: string
    price: number
    subcategory: string
}

type category = {
    name: string
    subcategories: { name: string }[]
}

const CreateAdd = () => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [images, setImages] = useState<{id: number, image: File}[]>([])
    const [cities, setCities] = useState<{ region: string; city: string; }[]>([])
	const [city, setCity] = useState('')
    const [isEditCity, setIsEditCity] = useState(false)
    

    const {
		register,
		handleSubmit,
        control,
        reset,
		formState: { errors }
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
            price: +form.price
        }
        
        AddService.create(data)
        reset()
	}

    useEffect(() => {
		if (!city && isEditCity) return;
		setCities(data.filter(obj => obj.city.toLowerCase().includes(city.toLowerCase())).slice(0, 3))
	}, [city])

    const handleClickChangeCity = (target: string) => {
        setIsEditCity(false)
        setCity(target)
        setCities([])
    }

    const checkCityIncluding = (target: string) => {
        return data.filter(obj => obj.city.toLowerCase().includes(city.toLowerCase())).length == 1
    }

    const getCategory = (subcategory: string) => {
        return categories.find((category) => category.subcategories.find((c) => c.slug === subcategory))
    }

    const getArrayStringImages = (images: {id: number, image: File}[]) => {
        return images.map((image) => image.image.name)
    }

    const getArrayFiles = (images: {id: number, image: File}[]) => {
        return images.map((image) => image.image)
    }

    useEffect(() => {
        async function fetchData () {
            const categories = await CategoryService.getAll()

            setCategories(categories)
        }

        fetchData()
    }, [])

    return (
        <div className="wrapper flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Создание объявления</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                <div className="flex">
                    <div className="w-1/2 mr-2">
                        <InputForm type="text" name="title" label="Заголовок" register={register} errors={errors} minLength={3} required={true} />
                    </div>
                    <div className="w-1/2">
                        <InputForm type="phone" name="phone" label="Телефон" register={register} errors={errors} minLength={3} required={true} />
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/2 mr-2">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">Город</label>
                        <div className="mt-2 relative">
                            <input id="city" type="text"
								{...register("city", {
									required: true,
								})}
                                onChange={e => {
                                    setIsEditCity(true)
                                    setCity(e.target.value)
                                }}
                                value={city}
                                className={'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6 ' + (errors.city?.type === "pattern" || errors.city?.type === "required" && "ring-red-500")}/>
							{errors.city && <p className="text-red-500 text-sm">Некорректный город</p>}
                            {isEditCity &&
									<div className="absolute top-[28px] w-full left-0 ps-3 bg-white">
									{
										cities?.map((obj) => (
											<p onClick={() => handleClickChangeCity(obj.city)} key={obj.city} className="cursor-pointer border-[#555555] border-b-2 block">{obj.city}</p>

											))
									}
							</div>}
                        </div>
                    </div>
                    <div className="w-1/2">
                        <InputForm type="text" name="address" label="Адрес" register={register} errors={errors} minLength={3} required={true} />
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/2 mr-2">
                        <InputForm type="text" name="price" label="Цена" register={register} errors={errors} required={true} />
                    </div>
                </div>
                <div>
                        <label htmlFor="subcategory" className="block text-sm font-medium leading-6 text-gray-900">Категория</label>
                        <div className="mt-2">
                            <Controller
                                control={control}
                                name="subcategory"
                                rules={{ required: true }}
                                render={({ field: { onChange, value }}) => (
                                    <CategorySelect id="subcategory" categories={categories} value={value} styles="w-full" onChange={onChange} />
                                )}
                            />
                            {errors.subcategory && <p className="text-red-500 text-sm">Неправильная категория</p>}
                        </div>
                </div>
                <FileFormInput errors={errors} control={control} label="Фото" images={images} setImages={setImages} maxImages={8} />
                <div>
                    <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Описание</label>
                    <div className="mt-2">
                        <textarea id="text"
							{...register("text", {
								required: true,
							})}className={'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6 ' + (errors.text?.type === "pattern" || errors.text?.type === "required" && "ring-red-500")}/>
						{errors.text && <p className="text-red-500 text-sm">Некорректное описание</p>}
                    </div>
                </div>
                <button type="submit" className="mb-3 flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Создать объявление</button>
            </form>
        </div>
    )
}


export default CreateAdd