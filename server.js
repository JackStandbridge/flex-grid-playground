const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');

const server = http.createServer(async (req, res) => {

	const filePath =
		req.url === '/'
			? './index.html'
			: '.' + req.url

	const type =
		req.url === '/'
			? 'html'
			: req.url.split('.')
				.reverse()[0] // get file extension
				.replace(/^js$/, 'javascript');

	try {

		await new Promise((res, rej) => {
			fs.exists(filePath, fileExists => {
				if (fileExists) {
					res(true);
				} else {
					rej(404);
				}
			});
		});

		res.statusCode = 200;
		res.setHeader('Content-Type', `text/${ type }`);

		fs.readFile(filePath, (error, data) => {
			if (!error) {
				res.end(data);
			}
		});

	} catch (e) {
		if (e === 404) {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.write('404 Not Found\n');
		} else {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.write('500 Internal Server Error');
		}
		res.end();
	}

});

server.listen(port, hostname, () => {
	console.clear();
	console.log(`Server running at \x1b[32mhttp://${ hostname }:${ port }/\x1b[0m`);
});