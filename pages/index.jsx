import Header from '@/components/layout/header/Header'
import Hero from '@/components/layout/Hero'
import HighlightedSection from '@/components/layout/HighlightedSection'
import JustForYou from '@/components/layout/JustForYou'
import Layout from '@/components/layout/Layout'
import Banner from '@/components/ui/Banner'
import Promo from '@/components/ui/Promo'

const Home = ({ products, promo, recommended }) => {
    return (
        <Layout title='Liburan seru bareng Lokaloka.id'>
            {/* Header - Navbar */}
            <div className='sticky top-0 z-50 filter backdrop-blur-lg bg-opacity-75 bg-white drop-shadow'>
                <Banner />
                <Header />
            </div>

            {/* Hero */}
            <Hero />

            {/* Product Section */}
            <HighlightedSection sectionTitle='Promo' href='#' data={promo} bgColor='bg-white' />
            <HighlightedSection sectionTitle='Recommended' href='#' data={recommended} />
            <Promo />
            <JustForYou sectionTitle='Just For You' href='#' data={products} />
        </Layout>
    )
}

export const getStaticProps = async () => {
    const getProducts = await fetch(`${process.env.NEXT_URL}/api/products`)
    const products = await getProducts.json()

    const promo = await products.filter((item) => item.discount != 0)
    const recommended = await products.filter((item) => item.isRecommended == true)

    if (!products) {
        return {
            notFound: true,
        }
    }

    return {
        props: { products, promo, recommended },
    }
}

export default Home
