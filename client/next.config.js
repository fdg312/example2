/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
	env: {
		SERVER_URL: "http://localhost:3000/api"
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	}
}

module.exports = nextConfig
