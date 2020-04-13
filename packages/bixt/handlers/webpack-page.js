const Route = require('bono/route');

module.exports = function () {
  return function webpackPage (ctx) {
    const { chunk } = ctx;

    if (chunk.ext !== '.js' && !chunk.jsExported) {
      return;
    }

    const { file, uri } = chunk;
    const name = `bixt-${ctx.webpackPages.length}-view`;
    const route = new Route(uri);
    const loader = `
{
  test: view => view === '${name}',
  load: async view => customElements.define(view, (await import('${file}')).default),
}
    `.trim();
    ctx.webpackPages.push({ name, uri, loader, route });
    return true;
  };
};
