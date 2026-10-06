// Derives the single-colour logo variants from the master logo.
// Master: public/logos/big-jos-primary.svg (Clay wordmark, Ink "BEDS"), Johannes's refined vector
// logo, supplied 6 Oct 2026. It has two groups, #wordmark and #descriptor; the variants only
// change their fills. Run after replacing the master: npm run logos
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'public/logos');
const master = fs.readFileSync(path.join(dir, 'big-jos-primary.svg'), 'utf8');

const colours = { clay: '#A3442F', ink: '#292C27', bone: '#F4F0E7' };
const variants = {
  // Light logo for dark backgrounds (footer).
  bone: { wordmark: colours.bone, descriptor: colours.bone },
  clay: { wordmark: colours.clay, descriptor: colours.clay },
  ink: { wordmark: colours.ink, descriptor: colours.ink },
};

for (const id of ['wordmark', 'descriptor']) {
  if (!new RegExp(`<g id="${id}" fill="#[0-9A-Fa-f]{6}"`).test(master)) {
    throw new Error(`Master logo has no <g id="${id}" fill="#…"> group; update scripts/export-logos.mjs.`);
  }
}

for (const [name, fills] of Object.entries(variants)) {
  let svg = master;
  for (const [id, fill] of Object.entries(fills)) {
    svg = svg.replace(new RegExp(`(<g id="${id}" fill=")#[0-9A-Fa-f]{6}"`), `$1${fill}"`);
  }
  fs.writeFileSync(path.join(dir, `big-jos-${name}.svg`), svg);
}
console.log(`Wrote ${Object.keys(variants).length} logo variants to public/logos/`);
