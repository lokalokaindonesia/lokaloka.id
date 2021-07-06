import Hero from '@/components/layout/Hero'
import HighlightedSection from '@/components/layout/HighlightedSection'
import JustForYou from '@/components/layout/JustForYou'
import Layout from '@/components/layout/Layout'

const Home = ({ products }) => {
    const promo = products.filter((item) => item.discount != 0)
    const recommended = products.filter((item) => item.isRecommended == true)
    return (
        <Layout title='Liburan seru bareng Lokaloka.id'>
            {/* Hero */}
            <Hero />

            {/* Product Section */}
            <HighlightedSection sectionTitle='Promo' href='#' data={promo} />
            <HighlightedSection sectionTitle='Recommended' href='#' data={recommended} />
            <JustForYou sectionTitle='Just For You' href='#' data={products} />
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const getProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    const products = await getProducts.json()

    if (!products) {
        return {
            notFound: true,
        }
    }

    return {
        props: { products },
    }
}

export default Home
