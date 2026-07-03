import { db } from "@workspace/db"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { openAPI } from "better-auth/plugins"
import { admin } from "better-auth/plugins/admin"
import { emailOTP } from "better-auth/plugins/email-otp"
import { organization } from "better-auth/plugins/organization"
import { twoFactor } from "better-auth/plugins/two-factor"
import "dotenv/config"

export function createAuth() {
  const plugins = [
    organization(),
    admin(),
    emailOTP({
      sendVerificationOnSignUp: true,
      async sendVerificationOTP({ email, otp, type }) {
        console.log("Verification OTP", { email, otp, type })
      },
      generateOTP: () => "123456",
    }),
    twoFactor(),
    openAPI(),
  ]

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
    }),

    trustedOrigins: [...(process.env.CORS_ORIGIN || "").split(",")],
    session: {
      expiresIn: 60 * 20,
      updateAge: 60 * 5,
    },
    emailAndPassword: {
      enabled: true,
    },
    secret: process.env.BETTER_AUTH_SECRET,
    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      },
      database: {
        generateId: false,
      },
    },
    plugins,
  })
}

export const auth = createAuth()

export type AuthType = typeof auth
