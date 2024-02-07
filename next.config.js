/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `https://vitrima-backend-production.up.railway.app/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `https://vitrima-backend-production.up.railway.app/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig
