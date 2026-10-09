import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "./db";
import { user, session, account, verification } from "./schema";

export const auth = betterAuth({
secret: process.env.BETTER_AUTH_SECRET,

baseURL:
process.env.BETTER_AUTH_URL || "http://localhost:3000",

database: drizzleAdapter(db, {
provider: "pg",
schema: {
user,
session,
account,
verification,
},
}),

emailAndPassword: {
enabled: true,
requireEmailVerification: false,
},

socialProviders: {
...(process.env.GOOGLE_CLIENT_ID &&
process.env.GOOGLE_CLIENT_SECRET
? {
google: {
clientId: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET,
prompt: "select_account" as const,
},
}
: {}),


...(process.env.GITHUB_CLIENT_ID &&
process.env.GITHUB_CLIENT_SECRET
  ? {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        scope: ["read:user", "user:email"],
      },
    }
  : {}),


},

account: {
accountLinking: {
enabled: true,
trustedProviders: ["google", "github"],
disableImplicitLinking: false,
},
},
});
