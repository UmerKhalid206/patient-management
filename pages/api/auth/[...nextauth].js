import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { getServerSession } from "next-auth"
const adminEmails = ['umerk1060@gmail.com'];

// console.log(getServerSession())

export default NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET
        }),
      ],
      adapter: MongoDBAdapter(clientPromise),
      callbacks: {
        session: ({session,token,user}) => {
          if (adminEmails.includes(session?.user?.email)) {
            session.isAdmin=true
            return session;
          } else {
            return false;
          }
        },
      },
})


export async function isAdminRequest(req,res) {
  const session = await getServerSession(req,res);
  console.log('session', session)
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}