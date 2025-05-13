

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/prisma/lib/prisma"
import CredentialsProvider  from "next-auth/providers/credentials"
import bcrypt from "bcrypt"




export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({name:'Credentials',
            credentials:{
                email:{label:'email',type:'text', placeholder:'email'},
                password:{label:'password',type:'password',placeholder:'password'}
            },
            async authorize(credentials,req){
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Please enter email and password')
                }
                const user = await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                })
                if(!user){
                    throw new Error('No user found')
                }

                const isValidPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword!
                )

                if(!isValidPassword){
                    throw new Error('Invalid password')
                }
                return user
                

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ],session: {
        strategy: "jwt",
    }
}
const handler = NextAuth(authOptions)


export { handler as GET, handler as POST }








// File: app/api/auth/[...nextauth]/route.ts

// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import { PrismaClient } from "@/app/generated/prisma"

// // Create a direct instance of PrismaClient for the adapter
// const prismaClientForAdapter = new PrismaClient()

// console.log("🔄 Direct PrismaClient instance created:", {
//   isDefined: Boolean(prismaClientForAdapter),
//   hasFindUnique: Boolean(prismaClientForAdapter?.user?.findUnique),
//   clientMethods: Object.keys(prismaClientForAdapter || {})
// })

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prismaClientForAdapter),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
//     })
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       console.log("✅ [signIn callback] User:", user);
//       console.log("✅ [signIn callback] Account:", account);
      
//       // This is a failsafe - if adapter isn't working, manually create user
//       try {
//         const existingUser = await prismaClientForAdapter.user.findUnique({
//           where: { email: user.email ?? undefined },
//           include: { accounts: true }
//         });
        
//         console.log("🔎 Manual user lookup result:", existingUser ? "Found user" : "User not found");
        
//         if (!existingUser) {
//           console.log("🔨 Creating user manually as adapter may be failing");
//           await prismaClientForAdapter.user.create({
//             data: {
//               name: user.name,
//               email: user.email,
//               image: user.image,
//               accounts: {
//                 create: {
//                   provider: account.provider,
//                   providerAccountId: account.providerAccountId,
//                   type: account.type,
//                   access_token: account.access_token,
//                   token_type: account.token_type,
//                   scope: account.scope,
//                   id_token: account.id_token,
//                   expires_at: account.expires_at
//                 }
//               }
//             }
//           });
//           console.log("✓ User created manually");
//         } else if (!existingUser.accounts.some(acc => 
//           acc.provider === account.provider && 
//           acc.providerAccountId === account.providerAccountId)) {
//           console.log("🔨 Linking account to existing user");
//           await prismaClientForAdapter.account.create({
//             data: {
//               userId: existingUser.id,
//               provider: account.provider,
//               providerAccountId: account.providerAccountId,
//               type: account.type,
//               access_token: account.access_token,
//               token_type: account.token_type,
//               scope: account.scope,
//               id_token: account.id_token,
//               expires_at: account.expires_at
//             }
//           });
//           console.log("✓ Account linked manually");
//         }
//       } catch (error) {
//         console.error("❌ Manual creation error:", error);
//       }
      
//       return true;
//     },
//     async session({ session, token }) {
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     }
//   },
//   debug: true,
//   events: {
//     async signIn(message) {
//       console.log("🎉 [Event: signIn]", message);
//     },
//     async createUser(message) {
//       console.log("👤 [Event: createUser]", message);
//     },
//     async linkAccount(message) {
//       console.log("🔗 [Event: linkAccount]", message);
//     },
//     // Removed the invalid 'error' event handler as it is not supported by NextAuth
//   }
// }

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }