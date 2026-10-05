// Renders the app to static HTML and injects it into dist/index.html so
// search engines and link-preview bots see the full page content without JS.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templatePath = path.join(root, 'dist/index.html');
const ssrDir = path.join(root, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const template = await readFile(templatePath, 'utf8');
const marker = '<div id="root"></div>';

if (!template.includes(marker)) {
  throw new Error(`prerender: "${marker}" not found in dist/index.html`);
}

await writeFile(templatePath, template.replace(marker, `<div id="root">${render()}</div>`));
await rm(ssrDir, { recursive: true, force: true });
console.log('prerender: wrote dist/index.html');
