// Writes each icon in src/data/icons.json to public/icons/<name>.svg (Ink stroke)
// for use outside the site: packaging, social posts, design files.
// Run after changing icons.json: node scripts/export-icons.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const icons = JSON.parse(fs.readFileSync(path.join(root, 'src/data/icons.json'), 'utf8'));
const outDir = path.join(root, 'public/icons');
fs.mkdirSync(outDir, { recursive: true });

let count = 0;
for (const [name, icon] of Object.entries(icons)) {
  if (name.startsWith('$')) continue;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#292C27" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${icon.label}">${icon.svg}</svg>\n`;
  fs.writeFileSync(path.join(outDir, `${name}.svg`), svg);
  count++;
}
console.log(`Exported ${count} icons to public/icons/`);
