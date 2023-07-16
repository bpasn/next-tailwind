import { CheckoutWizard } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hook/useReduxHook';
import useStorage from '@/hook/useStorage';
import { savePaymentMethod, selectCart } from '@/utils/slice/cartSlice';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';

type Props = {
}

const PaymentScreen: React.FunctionComponent<Props> & { auth?: boolean } = (props: Props) => {
    const router = useRouter();
    const {redirect} = router.query
    const dispatch = useAppDispatch();
    const [selectedPaymentMethod, setSelectPaymentMethod] = React.useState<string>();
    const { cart } = useAppSelector(selectCart)
    const { shippingAddress, paymentMethod } = cart
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!selectedPaymentMethod) {
            return toast.error("Payment method is required")
        }
        dispatch(savePaymentMethod(selectedPaymentMethod))

        useStorage().setItem("cart", JSON.stringify({
            ...cart,
            paymentMethod: selectedPaymentMethod
        }), 'session')
        router.push("/placeorder")
    }
    useEffect(() => {
        if (!shippingAddress.address) {
            router.push("/shipping");
            return
        }
        setSelectPaymentMethod(paymentMethod || '')
    }, [paymentMethod, router, shippingAddress.address])
    return (
        <div>
            <CheckoutWizard activeStep={2} />
            <form className="mx-auto mx-w-screen-md" onSubmit={submitHandler}>
                {
                    ['PayPal', 'Stripe', 'CashOnDelivery'].map(payment => (
                        <div key={payment} className="mb-4">
                            <input
                                type="radio"
                                name="paymentMethod"
                                className="p-2 outline-none focus:ring-0"
                                id={payment}
                                checked={selectedPaymentMethod === payment}
                                onChange={() => (setSelectPaymentMethod(payment))}
                            />
                            <label className='p-2' htmlFor={payment}>{payment}</label>
                        </div>
                    ))
                }
                <div className="mb-4 flex justify-between">
                    <button className="default-button"
                        onClick={() => router.push(redirect ? redirect.toString() : '/shipping')}
                        type='button'
                    >
                        Back
                    </button>
                    <button className="primary-button">Next</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentScreen

PaymentScreen.auth = true;