import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

type Props = {}

const ProfileScreen = (props: Props) => {
    const { data: session } = useSession()
    console.log(session)
    return (
        <div>
            <form className='mx-auto max-w-screen-md'>
                <div className="mb-4">
                    <label htmlFor={"user"}>Username</label>
                    <input
                        value={session?.user?.name}
                        className="w-full"
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor={"email"}>Email</label>
                    <input
                        className="w-full"
                        value={session?.user?.email as string}
                        disabled
                    />
                </div>
            </form>
        </div>
    )
}

export default ProfileScreen