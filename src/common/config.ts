export const config = {
    API_KEY: process.env.API_KEY || "",
    API_SECRET_KEY: process.env.API_SECRET_KEY || "",
    SHOP: process.env.SHOP || "wembe-test.myshopify.com",
    SCOPES: process.env.SCOPES || "write_products",
    HOST: process.env.HOST || "https://c3df-51-195-44-15.eu.ngrok.io",
    HOST_SCHEME: process.env.HOST_SCHEME || "https",
    NODE_ENV: process.env.NODE_ENV || 'development',
    quable: {
        HOST: process.env.QUABLE_HOST || 'https://test-case.quable.com',
        TOKEN: process.env.QUABLE_TOKEN || ''
    }
}
