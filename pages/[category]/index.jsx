import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

const Category = () => {
    const router = useRouter()

    const category = router.query.category || []

    return <Layout title={category}>{category}</Layout>
}

export default Category
