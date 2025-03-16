/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
  },
  future: { webpack5: true },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: [
        'raw-loader',
        {
          loader: "glslify-loader",
        },
      ],
    });
    return config
  },
  async rewrites() {

		return [
			{
				source: '/api/:path*',
				destination: `http://localhost:5000/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `http://localhost:5000/uploads/:path*`,
			},
     
      
		]
	},

};
module.exports = nextConfig;
