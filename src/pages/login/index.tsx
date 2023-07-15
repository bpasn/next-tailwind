import Link from 'next/link'
import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getError } from '@/utils/error'
import { useRouter } from 'next/router'
import { ILoginForm, LoginForm } from '@/utils/form/LoginValid'
type Props = {}

const LoginScreen: React.FC<Props> = ({ }) => {
    const { data: session } = useSession();
    const router = useRouter()
    const { redirect } = router.query
    React.useEffect(() => {
        if (session?.user) {
            router.push(redirect as string || '/')
        }
    }, [router, session, redirect])
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<{ email: string, password: string }>({
        mode: "onChange"
    });

    const submitHandler = async ({ email, password }: { email: string, password: string }) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password
            })
            if (result?.error) {
                toast.error(result.error)
            }
        } catch (error) {
            toast.error(getError(error))
        }
    }
    return (
        <div>
            <form action="" className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
                <h1 className="mb-4 text-xl">Login</h1>
                {/* {LoginForm.map((item: ILoginForm) => (
                    <div className="mb-4">
                        <label htmlFor={item.inputProps?.id}>{item.lable}</label>
                        <input 
                            {...item.inputProps}
                            {...register('email', {...item.option})}
                        />
                        {errors && errors.email && (<div className='text-red-500'>{errors?.email?.message as string}</div>)}
                    </div>
                ))} */}
                <div className="mb-4">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        {...register("email", {
                            required: "Please enter your email",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: "Plase enter valid email"
                            }
                        })}
                        className="w-full"
                        id="email" autoFocus
                    />
                    {errors && errors.email && (<div className='text-red-500'>{errors?.email?.message as string}</div>)}
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        {...register("password", {
                            required: "Please enter password",
                            minLength: { value: 6, message: "password is more than 5 chars" }
                        })}
                        className="w-full" id="password" autoFocus />
                    {errors && errors.password && (<div className='text-red-500'>{errors?.password?.message as string}</div>)}
                </div>
                <div className="mb-4">
                    <button className="primary-button">Login</button>
                </div>
                <div className="mb-4">
                    Don&apos;t have an account?&nbsp;
                    <Link href="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginScreen