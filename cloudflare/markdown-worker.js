// Optional: Cloudflare Worker (free plan) in front of ducklin.de (GitHub Pages).
// Agents that send "Accept: text/markdown" get the matching .md file, everyone else gets the normal page.
// Same content, only another format. Deploy: Workers & Pages > Create > paste > route ducklin.de/*
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const wantsMd = (request.headers.get('Accept') || '').includes('text/markdown');
    let path = url.pathname;
    if (wantsMd && request.method === 'GET') {
      if (path === '/') path = '/index.md';
      else if (path.endsWith('.html')) path = path.replace(/\.html$/, '.md');
      else path = null;
      if (path) {
        const md = await fetch(new URL(path, url.origin), { headers: { Accept: '*/*' } });
        if (md.ok) {
          const res = new Response(md.body, md);
          res.headers.set('Content-Type', 'text/markdown; charset=utf-8');
          res.headers.set('Vary', 'Accept');
          return res;
        }
      }
    }
    const res = await fetch(request);
    const out = new Response(res.body, res);
    out.headers.set('Vary', 'Accept');
    out.headers.append('Link', '</llms.txt>; rel="describedby"; type="text/plain"');
    return out;
  },
};
