// Static package check. Run with Node: node scripts/check.mjs
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const files=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);entry.isDirectory()?walk(p):files.push(p)}}
walk(root);
const errors=[];
for(const file of files){
 const ext=path.extname(file);
 if(ext==='.json'){try{JSON.parse(fs.readFileSync(file,'utf8'))}catch(e){errors.push(`${file}: invalid JSON`)}}
 if(ext==='.html'||ext==='.css'){
  const text=fs.readFileSync(file,'utf8');
  const refs=ext==='.html'?[...text.matchAll(/(?:src|href)="([^"#]+)"/g)].map(x=>x[1]):[...text.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)].map(x=>x[1]);
  for(let ref of refs){if(/^(https?:|data:|mailto:|tel:)/.test(ref))continue;ref=ref.split(/[?#]/)[0];if(ref&&!fs.existsSync(path.resolve(path.dirname(file),ref)))errors.push(`${file}: missing ${ref}`)}
  if(ext==='.html'){for(const script of text.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){if(script[1].trim()){try{new vm.Script(script[1])}catch(e){errors.push(`${file}: inline JS ${e.message}`)}}}}
 }
 if(ext==='.js'){try{new vm.Script(fs.readFileSync(file,'utf8'))}catch(e){errors.push(`${file}: ${e.message}`)}}
}
const tokens=JSON.parse(fs.readFileSync(path.join(root,'tokens/tokens.json'),'utf8'));
const css=fs.readFileSync(path.join(root,'tokens/tokens.css'),'utf8');
for(const [key,value] of Object.entries(tokens.color)){if(!css.includes(`--bj-${key}: ${value};`))errors.push(`Token mismatch: ${key}`)}
const contrast=JSON.parse(fs.readFileSync(path.join(root,'tokens/contrast-report.json'),'utf8'));
for(const pair of contrast){const target=pair.foreground==='control-border'?3:4.5;if(pair.ratio<target)errors.push(`Contrast below target: ${pair.foreground}/${pair.background}`)}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}else{console.log(`PASS: ${files.length} files; local HTML/CSS references, JSON, script syntax, palette consistency and documented contrast pairs.`)}
console.log('This is a static check. Complete browser, responsive, keyboard and integration checks before publishing.');
