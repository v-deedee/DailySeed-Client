import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import dotenv from 'dotenv';
import sequelize from "../config/database.js";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs, resolvers } from "./schema/index.js";

// Load env variables
dotenv.config();
const PORT = process.env.PORT || 5050;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

// Connect to Database
try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Init Epxress App
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use((err, req, res, next) => {
    const {
        status = 404, message = "Error"
    } = err;
    res.status(status).json({
        message
    });
});

// Init GraphQL Server
const httpServer = http.createServer(app);

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await apolloServer.start();

app.use('/', expressMiddleware(apolloServer, {
    context: async ({ req }) => ({ token: req.headers.token }),
}));

httpServer.listen(PORT, HOSTNAME, () => {
    console.log(`Server started running at ${HOSTNAME}:${PORT}`);
});