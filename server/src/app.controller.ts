import {
	Controller,
	HttpCode,
	Post,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { AppService } from './app.service'
import { getSlugify } from './config/slugify'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post('upload')
	@HttpCode(200)
	@UseInterceptors(
		FilesInterceptor('image', 10, {
			storage: diskStorage({
				destination: '/tmp/uploads',
				filename: (req, file, cb) => {
					const uniqueSuffix =
						Date.now() + '-' + Math.round(Math.random() * 1e9)
					const ext = extname(file.originalname)
					const filename = `${getSlugify(
						file.originalname.split('.')[0]
					)}-${uniqueSuffix}${ext}`
					console.log(
						getSlugify(file.originalname.split('.')[0]),
						file.originalname
					)

					cb(null, filename)
				},
			}),
		})
	)
	async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
		console.log(files)

		return files
	}
}
