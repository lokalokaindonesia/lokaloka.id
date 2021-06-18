import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import HighlightedSection from '../components/HighlightedSection'
import JustForYou from '../components/JustForYou'
import Footer from '../components/Footer'

const Home = ({ products }) => {
    const promo = products.filter((item) => item.discount != 0)
    const recommended = products.filter((item) => item.isRecommended == true)
    return (
        <div>
            <Head>
                <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/plus-jakarta-display.min.css' />
                <title>Liburan seru bareng Lokaloka.id</title>
            </Head>

            {/* Header - Navbar */}
            <Header />

            {/* Hero */}
            <Hero />

            {/* Product Section */}
            <HighlightedSection sectionTitle='Promo' href='#' data={promo} />
            <HighlightedSection sectionTitle='Recommended' href='#' data={recommended} />
            <JustForYou sectionTitle='Just For You' href='#' data={products} />

            {/* Footer */}
            <Footer />
        </div>
    )
}

// export const getStaticProps = async () => {
export const getServerSideProps = async () => {
    const res = await fetch(`${process.env.API_URL}/products`)
    const data = await res.json()

    if (data.count == 0) {
        return {
            notFound: true,
        }
    }

    return {
        props: { products: data.product },
        // revalidate: 1
    }
}

export default Home
