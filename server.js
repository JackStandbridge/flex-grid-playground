const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');

const server = http.createServer((req, res) => {

	const path = req.url === '/' ? './index.html' : '.' + req.url
	const type = req.url === '/' ? 'html' : req.url.split('.').reverse()[0].replace(/^js$/, 'javascript');

	res.statusCode = 200;
	res.setHeader('Content-Type', `text/${type}`);
	fs.readFile(path, (error, data) => {
		if (!error) {
			res.end(data);
		}
	});
});

server.listen(port, hostname, () => {
	console.clear();
	console.log(`Server running at \x1b[32mhttp://${ hostname }:${ port }/\x1b[0m`);
});