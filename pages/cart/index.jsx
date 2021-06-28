import { getSession } from 'next-auth/client'

const index = ({ session }) => {
    return <Layout title='Cart'></Layout>
}

export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    return {
        props: { session },
    }
}

export default index
