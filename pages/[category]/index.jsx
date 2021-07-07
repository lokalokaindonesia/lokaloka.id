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

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(`${process.env.NEXT_URL}/api/product-categories/${params.category}`)
    const data = await res.json()

    return {
        props: { category: data },
    }
}

export default Category
