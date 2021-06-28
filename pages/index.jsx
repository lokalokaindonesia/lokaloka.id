import { getSession, session, signIn, signOut } from 'next-auth/client'
import Hero from '@/components/Hero'
import HighlightedSection from '@/components/HighlightedSection'
import JustForYou from '@/components/JustForYou'
import Layout from '@/components/Layout'

const Home = ({ products }) => {
    const promo = products.filter((item) => item.discount != 0)
    const recommended = products.filter((item) => item.isRecommended == true)
    return (
        <Layout session={session} title='Liburan seru bareng Lokaloka.id'>
            {/* Hero */}
            <Hero />

            {/* Product Section */}
            <HighlightedSection sectionTitle='Promo' href='#' data={promo} />
            <HighlightedSection sectionTitle='Recommended' href='#' data={recommended} />
            <JustForYou sectionTitle='Just For You' href='#' data={products} />
        </Layout>
    )
}

// export const getStaticProps = async () => {
export const getServerSideProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    const data = await res.json()

    if (data.count == 0) {
        return {
            notFound: true,
        }
    }

    return {
        props: { products: data },
        // revalidate: 1
    }
}

export default Home
