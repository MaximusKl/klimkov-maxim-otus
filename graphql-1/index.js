import express from 'express'
import expressGraphql from 'express-graphql'
import { schema } from './graphql/schema.js'
import { root } from './graphql/api.js'

const { graphqlHTTP } = expressGraphql

const app = express()
const dev = process.env.NODE_ENV === 'development'

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		rootValue: root,
		graphiql: dev,
	})
)

app.use('/', (req, res) => {
	res.json('Go to /graphql to test your queries and mutations!')
})

const server = app.listen(3000, () => {
	const { port } = server.address()
	console.info(`\nExpress listen at http://localhost:${port}\n`)
})
