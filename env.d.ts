declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    DIRECT_URL: string
    AUTH_SECRET: string
    AUTH_GOOGLE_ID: string
    AUTH_GOOGLE_SECRET: string
    AUTH_GITHUB_ID: string
    AUTH_GITHUB_SECRET: string
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string
    STRIPE_SECRET_KEY: string
    STRIPE_WEBHOOK_SECRET_KEY: string
    HOST_URL: string
  }
}
