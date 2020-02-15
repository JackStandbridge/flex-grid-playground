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
			fs.exists(filePath, exists => {
				if (exists || filePath === './index.html') {
					res(true);
				} else {
					rej(false);
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
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.write('404 Not Found\n');
		res.end();
		return;
	}

});

server.listen(port, hostname, () => {
	console.clear();
	console.log(`Server running at \x1b[32mhttp://${ hostname }:${ port }/\x1b[0m`);
});