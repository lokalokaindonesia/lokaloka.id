import axios from 'axios'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'

const Category = ({ category }) => {
    const router = useRouter()

    return (
        <Layout title={category.name}>
            <div className='container mx-auto'>{category.name}</div>
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const res = await axios.get(`${process.env.NEXT_URL}/api/product-categories`)
    const categories = await res.data

    const paths = categories.map((category) => {
        return { params: { category: category.slug } }
    })

    return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
    const res = await axios.get(`${process.env.NEXT_URL}/api/product-categories/${params.category}`)
    const data = await res.data

    console.log(data)

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { category: data },
    }
}

export default Category
