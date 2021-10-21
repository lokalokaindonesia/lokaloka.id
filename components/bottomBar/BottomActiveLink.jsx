import Link from 'next/link'
import { withRouter } from 'next/router'

const HeaderActiveLink = ({ router, children, href }) => {
    const isCurrentPath = router.pathname === href || router.asPath === href

    return (
        <Link href={href}>
            <button className={isCurrentPath ? 'font-bold text-orange-500' : 'text-blueGray-500'}>
                <span className='hover:font-bold'>{children}</span>
            </button>
        </Link>
    )
}

export default withRouter(HeaderActiveLink)
