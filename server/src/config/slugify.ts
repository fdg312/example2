import slugify from 'slugify'

export const getSlugify = (text: string) => {
	return slugify(text, { lower: true, replacement: '_' })
}
