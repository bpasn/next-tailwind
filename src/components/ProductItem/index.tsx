import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
type Props = {
    product: IProduct,
    addToCartHandler: (event: IProduct) => void
}

const ProductItem: React.FC<Props> = ({ product, addToCartHandler }) => {
    return (
        <div className="card">
            <Link href={`/product/${product.slug}`}>
                <img src={product?.image}
                    alt={product?.name}
                    className="rounded shadow object-cover h-64 w-full" />
            </Link>
            <div className="flex flex-col items-center justifypcenter p-5">
                <Link href={`/product/${product.slug}`}>
                    <h2 className="text-lg">{product.name}</h2>
                </Link>
                <p className="mb-2">{product.brand}</p>
                <p>${product.price}</p>
                <button
                    className="primary-button"
                    type="button"
                    onClick={() => addToCartHandler(product)}
                >
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default ProductItem