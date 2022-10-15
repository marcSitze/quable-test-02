export const config = {
    API_KEY: process.env.API_KEY || "20950d0be8666fd55d05670638edc1ac",
    API_SECRET_KEY: process.env.API_SECRET_KEY || "5ebb95e2f52cea1a0b2e1e5562fd5d31",
    SHOP: process.env.SHOP || "wembe-test.myshopify.com",
    SCOPES: process.env.SCOPES || "write_products",
    HOST: process.env.HOST || "https://5ac6-51-195-44-15.eu.ngrok.io",
    HOST_SCHEME: process.env.HOST_SCHEME || "https",
    NODE_ENV: process.env.NODE_ENV || 'development',
    quable: {
        HOST: process.env.QUABLE_HOST || 'https://test-case.quable.com',
        TOKEN: process.env.QUABLE_TOKEN || '055CF6DA40695A92B87396DED02638AA8E2A3D14'
    }
}