import { memo } from 'react'
import { FieldErrors } from 'react-hook-form'

type InputType = {
	type: string
	name: string
	errors: FieldErrors<any>
	register: any
	label: string
	required?: boolean
	pattern?: RegExp
	registerFileds?: object
}

const InputForm = memo(
	({
		type,
		name,
		errors,
		register,
		label,
		required,
		registerFileds,
		pattern,
	}: InputType) => {
		console.log('input rerender')

		return (
			<div className='input-form'>
				<label
					htmlFor={name}
					className='block text-sm font-medium leading-6 text-gray-900'
				>
					{label}
				</label>
				<input
					id={name}
					type={type}
					{...register(name, {
						required: {
							value: required == true,
							message: 'Поле обязательно для заполнения',
						},
						pattern: { value: pattern, message: 'Некорректное значение' },
						registerFileds,
					})}
					className={
						'block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6 ' +
						(errors[name] && 'ring-red-500')
					}
				/>
				{errors && errors[name] && (
					<p className='error text-red-500 text-sm'>
						{errors[name]?.message as string}
					</p>
				)}
			</div>
		)
	}
)

export default InputForm
