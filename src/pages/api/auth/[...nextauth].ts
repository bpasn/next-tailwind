import UserModel from "@/modelSchema/User.schema";
import db from "@/utils/db";
import bcryptjs from 'bcryptjs'
import { JWT } from "next-auth/jwt";
import { User, Session } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from "next-auth/next";
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
export default NextAuth({
    pages: {
        error:"/api/auth/signin"
    },
    session: {
        strategy: "jwt",
        maxAge: 1000 * 60 * 60 / 1000 // 1 hour
    },
    jwt: {
        maxAge: 1000 * 60 * 60 / 1000 // 1 hour
    },

    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            console.log(token, user)
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin
            return { ...token, user };
        },
        async session({ session, token }: { session: Session, token: JWT }) {

            if (token?._id && session.user) session.user._id = token._id;
            if (token?.isAdmin && session.user) session.user.isAdmin = token.isAdmin
            return Promise.resolve({ ...session, token });
        },

    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {

                },
                password: {}
            },
            async authorize(credentials, req) {
                if(!credentials?.email){
                    throw new Error("Plase Enter your Email")
                }
                if(!credentials?.password){
                    throw new Error("Password field is required!")
                }
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
        }),
        GitHubProvider({
            name: "github",
            profile(profile, tokens) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    gh_username: profile.login,
                    email: profile.email,
                    image: profile.avatar_url
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ]
})