import http from 'node:http';
import {readFileSync} from 'node:fs';

const {version} = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));
const port = process.env.PORT || 3001;
http.createServer((_request, response) => {
  response.writeHead(200, {'content-type': 'application/json'});
  response.end(JSON.stringify({status: 'UP', service: 'payment-instrument-service', version, uptimeSeconds: Math.floor(process.uptime())}));
}).listen(port);
