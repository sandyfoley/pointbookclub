import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Bn3lUNUI.mjs';
import { manifest } from './manifest_Bm4fVRXu.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/books.astro.mjs');
const _page2 = () => import('./pages/api/events.astro.mjs');
const _page3 = () => import('./pages/api/member-invites.astro.mjs');
const _page4 = () => import('./pages/api/member-signups.astro.mjs');
const _page5 = () => import('./pages/calendar.astro.mjs');
const _page6 = () => import('./pages/events/_id_.astro.mjs');
const _page7 = () => import('./pages/events.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/api/books.ts", _page1],
    ["src/pages/api/events.ts", _page2],
    ["src/pages/api/member-invites.ts", _page3],
    ["src/pages/api/member-signups.ts", _page4],
    ["src/pages/calendar.astro", _page5],
    ["src/pages/events/[id].astro", _page6],
    ["src/pages/events.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///C:/Projects/git/calendar/dist/client/",
    "server": "file:///C:/Projects/git/calendar/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
