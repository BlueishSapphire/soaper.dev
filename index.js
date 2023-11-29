import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path'
import express from 'express';


const port = 443;

const SSL_DIR = "/etc/ssl";
console.log(`getting ssl credentials from ${SSL_DIR}`);
const sslOptions = {
	cert: fs.readFileSync(path.join(SSL_DIR, "certs/soaper.dev.pem")),
	key: fs.readFileSync(path.join(SSL_DIR, "private/soaper.dev.pem")),
};

const app = express();


const PUBLIC = path.join(process.cwd(), "public");
app.use(express.static(PUBLIC));


app.get("/", (req, res) => {
	res.sendFile(path.join(PUBLIC, 'index.html'));
});


const server = https.createServer(sslOptions, app).listen(port, () => {
	console.log(`listening on port ${port}`);
});


process.on("beforeExit", () => {
	console.log("exiting");
	server.close();
});

