/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/gitImg/**',
			},

		],
	},
	async rewrites() {
		return [
			{
				// source: '/api/:path*',
				source: '/backEndApi/:path*',
				destination: `${process.env.BACKEND_API_URL}/:path*`
			}
		]
	}

};

export default nextConfig;
