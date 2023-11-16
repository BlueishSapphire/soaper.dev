import fs from 'node:fs';
import https from 'node:https';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });


console.log(`running in ${process.env.NODE_ENV} environment`);

const isProduction = process.env.NODE_ENV == "production";


const port = 3000;

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
	console.log(`Listening on port ${port}`);
});


process.on("beforeExit", () => {
	server.close();
});

