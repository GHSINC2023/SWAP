import { ApolloServer } from "@apollo/server"
import { makeSchema } from 'nexus'
import { createServer } from "http"
import { WebSocketServer } from 'ws'
import { useServer } from "graphql-ws/lib/use/ws"
import { expressjwt } from 'express-jwt'
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { join } from 'path'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import authorization from 'nexus';
const { declarativeWrappingPlugin } = authorization;
import { PrismaClient } from '@prisma/client'
import { PubSub } from "graphql-subscriptions/dist/pubsub.js"
import { expressMiddleware } from "@apollo/server/express4"
import express from 'express'
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
export const prisma = new PrismaClient()
export const pubsub = new PubSub()
import cors from 'cors'
import pgk from 'body-parser'
const { json } = pgk
dotenv.config()


import * as User from './src/api/schema/User/user.js'
import * as Application from './src/api/schema/Applicants/applicant.js'
import * as OTP from './src/api/schema/OTP/otp.js'
import * as Archive from './src/api/schema/Archive/archive.js'

export const startApolloServer = async () => {
    const app = express()
    const httpServer = createServer(app)

    app.use(cookieParser())
    app.use(expressjwt({
        algorithms: [ "HS512" ],
        secret: "HeadStart",
        credentialsRequired: false,
    }))

    app.use(graphqlUploadExpress())

    const schema = makeSchema({
        types: [ User, Application, OTP, Archive ],
        outputs: {
            schema: join(process.cwd(), "/src/api/generated/system.graphql"),
            typegen: join(process.cwd(), "/src/api/generated/system.ts"),
        },
        plugins: [ declarativeWrappingPlugin() ]
    })

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql'
    })
    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        introspection: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ]
    })

    await server.start()

    app.use("/graphql", cors<cors.CorsRequest>({
        origin: [ "http://localhost:3000", "https://studio.apollographql.com" ],
        credentials: true,
    }), json(), expressMiddleware(server, {
        context: async ({ req, res }) => ({ req, res })
    }))

    await new Promise<void>((resolve) => {
        httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
        console.log(`Relaunching Server... Listening on port 4000`)
    })
}

startApolloServer()
