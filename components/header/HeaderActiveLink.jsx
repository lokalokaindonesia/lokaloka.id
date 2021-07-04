import Link from 'next/link'
import { withRouter } from 'next/router'

const HeaderActiveLink = ({ router, children, href }) => {
    const isCurrentPath = router.pathname === href || router.asPath === href

    return (
        <Link href={href}>
            <button className={isCurrentPath ? 'font-bold' : ''}>{children}</button>
        </Link>
    )
}

export default withRouter(HeaderActiveLink)
