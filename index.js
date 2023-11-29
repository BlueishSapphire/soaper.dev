import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path'
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


process.env.NODE_ENV ??= "production";
console.log(`running in ${process.env.NODE_ENV} environment`);
const isProduction = process.env.NODE_ENV == "production";


const port = 443;

const SSL_DIR = "/etc/ssl";
console.log(`getting ssl credentials from ${SSL_DIR}`);
const sslOptions = isProduction ? {
	cert: fs.readFileSync(path.join(SSL_DIR, "certs/soaper.dev.pem")),
	key: fs.readFileSync(path.join(SSL_DIR, "private/soaper.dev.pem")),
} : {};

const app = express();

app.get("/", (req, res) => {
	console.log("new request");
	res.writeHead(200);
	res.end("coming soon!\n");
});


app.listen(port);
const server = https.createServer(sslOptions, app).listen(port, () => {
	console.log(`listening on port ${port}`);
});


process.on("beforeExit", () => {
	server.close();
});

