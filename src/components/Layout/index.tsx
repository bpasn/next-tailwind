'use client';
import { useAppSelector } from '@/hook/useReduxHook'
import { selectCart } from '@/utils/slice/cartSlice'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { JsxElement } from 'typescript';
import { useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css'
type Props = {
    children: React.ReactNode
}

const LayOut: React.FC<Props> = ({ children }) => {
    const { cart: { cartItems } } = useSelector(selectCart)
    const { status, data: session } = useSession()
    return (

        <div className="flex min-h-screen flex-col justify-between">
            <ToastContainer position='bottom-center' limit={1} />
            <header>
                <nav className="flex h12 items-center px-4 justify-between shadow-md">
                    <Link href={"/"} className='text-lg font-bold'>amazona</Link>
                    <div className='flex items-center z-10'>
                        <Link href="/cart" className="p-2">
                            Cart
                            {cartItems && cartItems.length ? <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                {cartItems.reduce((a, c) => a + c.quantity, 0)}
                            </span> : ''}
                        </Link>

                        {status === 'loading' ? ("Loading") : (session?.user ? session.user.name : (
                            <Link href="/login" className="p-2">
                                Login</Link>

                        ))}

                    </div >
                </nav >
            </header >
            <main className="container m-auto mt-4 px-4">{children}</main>
            <footer className="flex h-10 justify-center items-center shadow-inner">
                <p>Copyright © 2022 Amazona</p>
            </footer>
        </div >

    )
}

export default LayOut