module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://api.rajaongkir.com/starter/:path*',
            },
        ]
    },
    images: {
        domains: ['api.lokaloka.id', 'source.unsplash.com', 'res.cloudinary.com', 'tailwindui.com', 'lh3.googleusercontent.com'],
    },
}