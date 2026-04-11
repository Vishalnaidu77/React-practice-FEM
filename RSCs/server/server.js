import path, { dirname } from "node:path"
import { readFileSync } from 'node:fs'
import Fastify from "fastify"
import fastifyStaticPlugin from "@fastify/static"
import React from "react"
import { renderToPipeableStream } from 'react-server-dom-webpack/server'
import App from '../src/App.jsx'
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MANIFEST = readFileSync(
    path.resolve(__dirname, "../dist/react-client-manifest.json"),
    "utf8"
);

const MODULE_MAP = JSON.parse(MANIFEST);
const PORT = process.env.PORT || 3000;

const fastify = Fastify({
    logger: {
        transport: {
            target: "pino-pretty"
        }
    }
})

fastify.register(fastifyStaticPlugin, {
    root: path.join(__dirname, "../dist"),
    prefix: "/assets/",
})

fastify.register(fastifyStaticPlugin, {
    root: path.join(__dirname, "../public"),
    decorateReply: false
})

fastify.get("/", async function rootHandler(request, reply){
    return reply.sendFile("index.html");
})

fastify.get("/react-flight", function reactFlightHandler(request, reply){
    try {
        const stream = renderToPipeableStream(React.createElement(App), MODULE_MAP)
        reply.hijack()
        reply.raw.setHeader("Content-Type", "application/octet-stream")
        stream.pipe(reply.raw)
    } catch (err) {
        request.log.error("react-flight err", err)
        throw err;
    }
})

export async function start() {
    try {
        await fastify.listen({ port: PORT })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}