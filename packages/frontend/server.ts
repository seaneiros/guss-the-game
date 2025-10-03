/* eslint-disable react-hooks/rules-of-hooks */

import express         from 'express';
import path            from 'path';
import ProxyMiddleware from 'proxy-middleware';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const port = process.env.VITE_PORT || '3000';
const clientApiUrl = process.env.VITE_API_ALIAS || '';
const backendApiUrl = process.env.VITE_BASE_API_URL || '';

const App = express();

App.use('/', express.static(path.resolve(__dirname, 'dist')));

// Proxy API calls
App.use(clientApiUrl, ProxyMiddleware(resolve(backendApiUrl, clientApiUrl)));


App.get('/health', (req, res) => {
  res.type('text/plain');
  res.status(200);
  res.send('1');
});

App.get('*splat', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

App.listen(Number(port), '0.0.0.0', function () {
  console.log(`server started on port ${port}`);
});


/* HELPERS */

function resolve(from: string, to: string) {
  const resolvedUrl = new URL(to, new URL(from, 'resolve://'));
  if (resolvedUrl.protocol === 'resolve:') {
    const { pathname, search, hash } = resolvedUrl;
    return pathname + search + hash;
  }
  return resolvedUrl.toString();
}
