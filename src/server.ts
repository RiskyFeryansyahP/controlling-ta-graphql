import * as express from 'express'
import * as mongoose from 'mongoose'
import * as cors from 'cors'
import * as graphqlHTTP from 'express-graphql'

// import schema graphql
import { schema } from './graphql'

class Server {

    public app : express.Application

    constructor() 
    {
        this.app = express()
        this.config()
        this.routes()
    }

    config()
    {
        const MONGOOSE_URI = 'mongodb://localhost:27017/controllingta'
        mongoose.connect(MONGOOSE_URI || process.env.MONGODB_URI, { useNewUrlParser : true } )
        mongoose.connection.once('open', () => console.log('Connected into Database'))
        this.app.use('*', cors())

        this.app.use('/graphql', graphqlHTTP({
            schema,
            graphiql : true
        }))
    }

    routes()
    {

    }
}

export default new Server().app