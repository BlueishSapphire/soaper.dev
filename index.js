import fs from 'node:fs';
import https from 'node:https';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


process.env.NODE_ENV ??= "production";
console.log(`running in ${process.env.NODE_ENV} environment`);
const isProduction = process.env.NODE_ENV == "production";


const port = 443;

console.log(`getting ssl credentials from ${process.env.SSL_CERT} and ${process.env.SSL_KEY}`);
const sslOptions = isProduction ? {
	cert: fs.readFileSync(process.env.SSL_CERT),
	key: fs.readFileSync(process.env.SSL_KEY),
} : {};

const app = express();

app.get("/", (req, res) => {
	console.log("new request");
	res.writeHead(200);
	res.end("coming soon!\n");
});

const server = https.createServer(app, sslOptions).listen(port, () => {
	console.log(`listening on port ${port}`);
});

process.on("beforeExit", () => {
	server.close();
});

