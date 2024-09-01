import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app"
import * as tocken from '../../../../../xrscreenxyz-firebase-key.json'

export const authOptions = {
    // Configure one or more authentication providers
    adapter: FirestoreAdapter({
        credential: cert(tocken)
    }),
	providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "", 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        // ...add more providers here
    ],
    secret : process.env.NEXTAUTH_SECRET, // 여기꼭 엔브에 포함해줄것
    // pages: {
    //     signIn: "/signin",
    // },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }

