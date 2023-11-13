import Contentstack from 'contentstack'

export const Stack = Contentstack.Stack(
    {
        api_key: process.env.API_KEY,
        delivery_token: process.env.DELIVERY_TOKEN,
        environment: 'preview',
    }
)

Stack.setHost("api.contentstack.io")

