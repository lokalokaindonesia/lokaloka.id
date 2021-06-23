import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

const Category = () => {
    const router = useRouter()

    const category = router.query.category || []

    return <Layout title={category}>{category}</Layout>
}

export const getServerSideProps = async ({ query }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-categories`)
    const data = await res.json()

    return {
        props: { categories: data },
    }
}

export default Category
