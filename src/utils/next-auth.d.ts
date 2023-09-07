import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
export module "next-auth" {
    interface Session {
        _id?: string;
        error?: string;
        isAdmin?: boolean;
        user?: User;
    }

    interface User {
        name?: string;
        _id?: string;
        email?: string | null;
        error?: string;
        isAdmin?: boolean;
        contactAddress?: {
            id?: string;
        };
    }
}

export module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        _id?: string;
        isAdmin?:boolean;
        exp?: number;
        iat?: number;
        jti?: string;
    }
}