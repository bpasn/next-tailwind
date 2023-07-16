import { CheckoutWizard, InputComponent } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hook/useReduxHook';
import useStorage from '@/hook/useStorage';
import { AppDispatch } from '@/utils/Store';
import { saveShippingAddress, selectCart } from '@/utils/slice/cartSlice';
import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form'
type Props = {
}

export default function ShippingScreen() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        getValues
    } = useForm<IShipping>()
    const router = useRouter();
    const {redirect} = router.query
    const dispatch: AppDispatch = useAppDispatch()
    const { cart } = useAppSelector(selectCart)
    const { shippingAddress } = cart;
    React.useEffect(() => {
        setValue("fullName", shippingAddress.fullName);
        setValue("address", shippingAddress.address);
        setValue("city", shippingAddress.city);
        setValue("postalCode", shippingAddress.postalCode);
        setValue("country", shippingAddress.country);
    }, [setValue, shippingAddress.address, shippingAddress.city, shippingAddress.country, shippingAddress.fullName, shippingAddress.postalCode])


    const submitHandler = (shipping: IShipping) => {
        dispatch(saveShippingAddress(shipping))
        useStorage().setItem("cart", JSON.stringify({
            ...cart,
            shippingAddress: {
                ...shipping
            }
        }))
        router.push(redirect ? redirect.toString() : '/payment')
    }
    return (
        <div>
            <CheckoutWizard activeStep={1} />
            <form className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(submitHandler)}
            >
                <h1 className="mb-4 text-xl">Shipping Address</h1>
                <InputComponent
                    inputProps={{
                        className: "w-full",
                        ...register("fullName", {
                            required: "Please enter FullName"
                        }),
                        type: "text",
                        id: "fullName"
                    }}
                    errors={errors.fullName && errors.fullName.message?.toString()}
                    label={'Full Name'} />
                <InputComponent
                    inputProps={{
                        className: "w-full",
                        ...register("address", {
                            required: "Please enter address"
                        }),
                        type: "text",
                        id: "address"
                    }}
                    errors={errors.address && errors.address.message?.toString()}
                    label={'Address'} />
                <InputComponent
                    inputProps={{
                        className: "w-full",
                        ...register("postalCode", {
                            required: "Please enter Post Code"
                        }),
                        type: "text",
                        id: "postalCode"
                    }}
                    errors={errors.postalCode && errors.postalCode.message?.toString()}
                    label={'Post Code'} />

                <InputComponent
                    inputProps={{
                        className: "w-full",
                        ...register("city", {
                            required: "Please enter city"
                        }),
                        type: "text",
                        id: "city"
                    }}
                    errors={errors.city && errors.city.message?.toString()}
                    label={'City'} />
                <InputComponent
                    inputProps={{
                        className: "w-full",
                        ...register("country", {
                            required: "Please enter Country"
                        }),
                        type: "text",
                        id: "country"
                    }}
                    errors={errors.country && errors.country.message?.toString()}
                    label={'Country'} />
                <div className="mb-4 flex justify-between">
                    <button className="primary-button">Next</button>
                </div>
            </form>
        </div>
    )
}

ShippingScreen.auth = true