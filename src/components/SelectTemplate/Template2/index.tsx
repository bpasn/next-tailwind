import { Banner } from '@/components'
import ProductsComponent from '@/components/Products'
import axios from 'axios'
import { GetServerSideProps, Metadata } from 'next'
import React from 'react'

type Props = {
    products: ProductProps[]
}
export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
  }
const TemplateTwo = ({ products }: Props) => {
    return (
            <div className="max-w-screen-2xl mx-auto">
                <Banner />
                <div className="relative -mt-10 z-20 mb-10">
                    <div className='w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
                        {products.map(product => (
                            <ProductsComponent key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
    )
}


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { data: products } = await axios.get<ProductProps[]>("https://fakestoreapiserver.reactbd.com/tech")
    return {
        props: {
            products
        }
    }
}
export default TemplateTwo