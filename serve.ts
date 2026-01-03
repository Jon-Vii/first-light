/**
 * Simple static file server for development
 */

const server = Bun.serve({
  port: 3000,
  async fetch(request) {
    const url = new URL(request.url);
    let filepath = url.pathname;

    // Default to index.html
    if (filepath === '/') {
      filepath = '/index.html';
    }

    // Serve from public directory
    const file = Bun.file(`./public${filepath}`);

    if (await file.exists()) {
      return new Response(file);
    }

    // 404
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`🔭 First Light running at http://localhost:${server.port}`);
