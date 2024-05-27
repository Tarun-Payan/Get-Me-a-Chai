import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import mongoose from 'mongoose'
import User from '@/models/User'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      const client = await mongoose.connect('mongodb://localhost:27017/chai')
      
      const available = await User.findOne({email: user.email})

      if(!available){
        const newUser = new User({
          email: user.email,
          username: user.name
        })
        await newUser.save()
        return true
      }      
      else{
        return true
      }

    }
  }
})

export { handler as GET, handler as POST }