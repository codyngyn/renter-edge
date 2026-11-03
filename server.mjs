import http from 'node:http';
import {analyze} from './analyze.mjs';
import {liveEnabled,authorized} from './access.mjs';
let attempts=0, busy=false;
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('./dist/', import.meta.url)));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' };
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if(pathname==='/api/capabilities'){
      res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});
      return res.end(JSON.stringify({liveAnalysis:liveEnabled()}));
    }
    if(pathname==='/api/analyze'){
      const send=(status,payload)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(payload));};
      if(!liveEnabled())return send(403,{error:'Live analysis is private. Explore the saved reports.'});
      if(!authorized(req.headers.authorization))return send(403,{error:'A valid owner demo token is required.'});
      if(req.method!=='POST')return send(405,{error:'Use POST.'});
      if(req.headers.origin!==`http://${req.headers.host}`)return send(403,{error:'Open this app directly to analyze a listing.'});
      if(!req.headers['content-type']?.startsWith('application/json'))return send(415,{error:'JSON required.'});
      if(busy||attempts>=20)return send(429,{error:'Demo request limit reached. Please use the saved reports.'});
      busy=true;
      try{
        let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>30000)throw Error('Request too large.');}
        const input=JSON.parse(body);attempts++;
        const report=await analyze(input);return send(200,{report});
      }catch(error){return send(400,{error:error instanceof SyntaxError?'Invalid request.':error.message});}
      finally{busy=false;}
    }
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep) || !types[path.extname(file)]) {
      res.writeHead(404); return res.end('Not found');
    }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'" });
    res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log(`Renter Edge: http://127.0.0.1:${server.address().port}`));
