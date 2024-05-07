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
				destination: "http://127.0.0.1:5000/:path*"
			}
		]
	}

};

export default nextConfig;
