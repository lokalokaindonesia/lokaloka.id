import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import { ChevronRightIcon, ChevronLeftIcon, LinkIcon } from '@heroicons/react/solid'
import { FaInstagram, FaFacebookSquare, FaWhatsapp, FaHeart, FaCheckCircle } from 'react-icons/fa'
import moment from 'moment'
import { useState, useEffect, useRef, Fragment } from 'react'
import NumberFormat from 'react-number-format'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import Layout from '@/components/layout/Layout'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import dynamic from 'next/dynamic'
const ProductCard = dynamic(() => import('@/components/product/ProductCard'))
import FancySectionTitle from '@/components/ui/FancySectionTitle'
import { setOrder } from '@/redux/orderSlice'
import { useDispatch } from 'react-redux'
import { setFavorite } from '@/redux/favoriteSlice'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationCircleIcon, ExclamationIcon } from '@heroicons/react/outline'

const Product = ({ product, similarProducts, reviews, baseLink }) => {
    console.log(product)
    return <div>Mboh wes</div>
}

export const getServerSideProps = async ({ params }) => {
    const getProduct = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.product}`)
    const data = await getProduct.data

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            product: data,
        },
    }
}

export default Product
