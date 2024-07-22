import { AddService } from '@/services/add'
import { CategoryService } from '@/services/category'
import { IAddResponse } from '@/types/add.interface'
import { ICategory } from '@/types/category.interface'
import { create } from 'zustand'

type SessionState = {
	city: string
	adds: Array<IAddResponse>
	categories: Array<ICategory>
	previousPage: Array<string>
	setCity: (city: string) => void
	setAdds: (adds: Array<IAddResponse>) => void
	setPreviousPage: (previousPage: Array<string>) => void
}

const useSessionStore = create<SessionState>(set => {
	// const fetchData = async () => {
	// 	const categories = await CategoryService.getAll()
	// 	const adds = await AddService.getAll(10)

	// 	set({ categories })
	// 	set({ adds })
	// }

	// fetchData()

	return {
		city: 'Россия',
		adds: [],
		categories: [],
		previousPage: [],
		setCity: (city: string) => {
			set({ city })
			localStorage.setItem('city', city)
		},
		setAdds: (adds: Array<IAddResponse>) => set({ adds }),
		setCategories: (categories: Array<ICategory>) => set({ categories }),
		setPreviousPage: (previousPage: Array<string>) => set({ previousPage }),
	}
})

export default useSessionStore
