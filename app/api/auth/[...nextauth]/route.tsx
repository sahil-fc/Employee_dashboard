import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"

const handler = NextAuth({
    providers: [
        Google({
          clientId: "597834860139-45dh1rsjqg34d8v30g6m3s26dnqurd4e.apps.googleusercontent.com",
          clientSecret: process.env.google_client_secret!
        }),
        Discord({
            clientId: "1263428252215545866",
            clientSecret: process.env.discord_client_secret!
          })
      ],
})

export { handler as GET, handler as POST }
