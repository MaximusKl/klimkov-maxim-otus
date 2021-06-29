// const { buildSchema } = require('graphql')
import graphql from 'graphql'

const { buildSchema } = graphql

export const schema = buildSchema(`
    type ProductCategory {
        name: String!,
        description: String
    }

    input ProductCategoryInput {
        name: String!
    }

    type Product {
        id: ID!,
        name: String!,
        category: ProductCategory,
        price: Float!,
        description: String
    }

    type ProductInBucket {
        product: Product,
        quantity: Int
    }

    type User {
        login: String!,
        name: String,
        surname: String,
        discount: Float,
    }

    type Bucket {
        products: [ProductInBucket]
        amount: Float
    }

    type Query {
        products(category: ProductCategoryInput): [Product]
        categories: [ProductCategory]
        users: [User]
        user(login: String!): User
        userBucket(login: String!): Bucket
    }

    type Mutation {
        buyProduct(login: String!, productID: ID!, quantity: Int): Bucket
    }
`)
