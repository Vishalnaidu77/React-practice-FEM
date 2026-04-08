import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url"
import { readFileSync } from "node:fs";
import path, { dirname } from "node:path";
import { renderToString } from 'react-dom/server'
import { createElement as h } from "react";
import App from "./App.js";

const __fileName = fileURLToPath(import.meta.url)
const __dirname = dirname(__fileName)

const shell = readFileSync(path.join(__dirname, "dist", "index.html"), "utf8");

const app = fastify()

app.register(fastifyStatic, {
    root: path.join(__dirname, "dist"),
    prefix: "/"
})

const parts = shell.split("<!--ROOT-->");
app.get("/", (req, reply) => {
    const reactApp = renderToString(h(App))
    const html = `${parts[0]}${reactApp}${parts[1]}`
    return reply.type("text/html; charset=utf-8").send(html)
});

app.listen({
    port: 3000
})