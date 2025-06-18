import { jsx, jsxs } from 'react/jsx-runtime';
import * as fs from 'node:fs';
import { useRouter } from '@tanstack/react-router';
import { R as Route$1, c as createServerFn, a as createServerRpc } from './ssr.mjs';
import '@tanstack/react-router-with-query';
import '@tanstack/react-query';
import 'wagmi';
import '@tanstack/react-router-devtools';
import '@tanstack/react-query-devtools';
import 'tiny-invariant';
import 'tiny-warning';
import '@tanstack/router-core';
import '@reown/appkit/react';
import '@reown/appkit/networks';
import '@reown/appkit-adapter-wagmi';
import '@tanstack/history';
import 'node:async_hooks';
import 'jsesc';
import 'node:stream';
import 'isbot';
import 'react-dom/server';
import 'node:stream/web';

const filePath = "count.txt";
async function readCount() {
  return parseInt(await fs.promises.readFile(filePath, "utf-8").catch(() => "0"));
}
const updateCount_createServerFn_handler = createServerRpc("src_routes_demo_start_server-funcs_tsx--updateCount_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return updateCount.__executeServer(opts, signal);
});
const updateCount = createServerFn({
  method: "POST"
}).validator((d) => d).handler(updateCount_createServerFn_handler, async ({
  data
}) => {
  const count = await readCount();
  await fs.promises.writeFile(filePath, `${count + data}`);
});
const SplitComponent = function Home() {
  const router = useRouter();
  const state = Route$1.useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => {
    updateCount({
      data: 1
    }).then(() => {
      router.invalidate();
    });
  }, className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded", children: [
    "Add 1 to ",
    state,
    "?"
  ] }) });
};

export { SplitComponent as component };
//# sourceMappingURL=demo.start.server-funcs-Df1TZ65F.mjs.map
