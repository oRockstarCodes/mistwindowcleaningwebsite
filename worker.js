export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Map pretty URLs to HTML files
    if (path === "/") path = "/index.html";
    else if (path === "/about") path = "/about.html";
    else if (path === "/contact") path = "/contact.html";
    else if (path === "/services") path = "/services.html";
    else if (path.startsWith("/service-") && !path.endsWith(".html")) path += ".html";

    // Try to fetch the static asset from the public directory
    try {
      return await env.ASSETS.fetch(new Request(`https://dummy${path}`, request));
    } catch (e) {
      return new Response("Not found", { status: 404 });
    }
  }
}; 