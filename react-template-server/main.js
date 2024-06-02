import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { serveStatic } from '@hono/node-server/serve-static';
const app = new Hono();
const html = (renderedToString, clientScript) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Template</title>
</head>
<body>
    <div id="root">${renderedToString}</div>
    <script type="importmap">
        {
            "imports": {
                "react": "https://esm.sh/react@18.3.1",
                "react-dom/client": "https://esm.sh/react-dom@18.3.1/client"
            }
        }
    </script>
    <script type="module">${clientScript}</script>
</body>
</html>`;
const clientScript = (PageName, props) => `
    import React from "react";
    import { hydrateRoot } from "react-dom/client";
    import App from "/templates/${PageName}.js";
    hydrateRoot(document.getElementById('root'), React.createElement(App, ${JSON.stringify(props)}));
`;
app.use("/templates/*", serveStatic({
  root: "./public"
}));
app.post('/template/:name', async c => {
  try {
    const name = c.req.param('name');
    const props = await c.req.json();
    const filePath = new URL(`./public/templates/${name}.js`, import.meta.url);
    const {
      default: App
    } = await import(filePath);
    return c.html(html(renderToString( /*#__PURE__*/React.createElement(App, props)), clientScript(name, props)));
  } catch (err) {
    console.error("Error reading template", err);
    return c.text(err);
  }
});
serve({
  fetch: app.fetch,
  port: 3001
}, info => console.log("Start listening on port", info.port));
