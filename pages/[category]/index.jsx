import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

const Category = ({ category }) => {
    const router = useRouter()

    return (
        <Layout title={category.name}>
            <div className='container mx-auto'>{category.name}</div>
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-categories`)
    const categories = await res.json()

    const paths = categories.map((category) => {
        return { params: { category: category.slug } }
    })

    return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-categories?slug_eq=${params.category}`)
    const data = await res.json()

    return {
        props: { category: data[0] },
    }
}

export default Category
