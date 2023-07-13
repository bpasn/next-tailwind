import UserModel from "@/modelSchema/User.schema";
import db from "@/utils/db";
import bcryptjs from 'bcryptjs'
import { JWT } from "next-auth/jwt";
import { User, Session } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from "next-auth/next";
console.log(process.env.AUTH_SECRET)
export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 1000 * 60 * 60 / 1000 // 1 hour
    },
    jwt:{
        maxAge: 1000 * 60 * 60 / 1000 // 1 hour
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin
            return { ...token, user };
        },
        async session({ session, token }: { session: Session, token: JWT }) {

            if (token?._id && session.user) session.user._id = token._id;
            if (token?.isAdmin && session.user) session.user.isAdmin = token.isAdmin
            return Promise.resolve({ ...session, token });
        }
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                await db.connect();
                const user = await UserModel.findOne({
                    email: credentials?.email
                });
                await db.disconnect();
                if (user && bcryptjs.compareSync(credentials?.password as string, user.password)) {
                    return user
                }
                throw new Error("Invalid Email or password")
            }
        })
    ]
})