// Cold-cache, gzip local server used for comparable Lighthouse audits.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib');
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.svg':'image/svg+xml','.avif':'image/avif'};
for(const [port,root] of [[Number(process.argv[3] || 4173), path.resolve(process.argv[2] || 'dist')]]){
 const cache=new Map();http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');const file=path.join(root,decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));if(!file.startsWith(root+'/')){res.writeHead(403).end();return;}
 try{let data=cache.get(file);if(!data){const body=fs.readFileSync(file);const type=mime[path.extname(file)]||'application/octet-stream';data={body,type,gzip:/javascript|text\//.test(type)?zlib.gzipSync(body):null};cache.set(file,data);}const useGzip=data.gzip&&req.headers['accept-encoding']?.includes('gzip');res.writeHead(200,{'Content-Type':data.type,'Cache-Control':'no-store',...(useGzip?{'Content-Encoding':'gzip'}:{})});res.end(useGzip?data.gzip:data.body);}catch{res.writeHead(404).end('Not found');}
 }).listen(port,'127.0.0.1',()=>console.log('Build preview '+port));
}
