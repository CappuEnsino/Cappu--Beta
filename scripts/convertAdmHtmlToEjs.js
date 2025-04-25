// scripts/convertAdmHtmlToEjs.js
// Converte HTMLs de html/adm para EJS em src/views/dashboard/adm

const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '../html/adm');
const ejsDir  = path.join(__dirname, '../src/views/dashboard/adm');

// garante que o destino existe
if (!fs.existsSync(ejsDir)) {
  fs.mkdirSync(ejsDir, { recursive: true });
}

fs.readdirSync(htmlDir)
  .filter(f => f.endsWith('.html'))
  .forEach(file => {
    const srcPath  = path.join(htmlDir, file);
    const dstName  = file.replace(/\.html$/, '.ejs');
    const dstPath  = path.join(ejsDir, dstName);
    let content    = fs.readFileSync(srcPath, 'utf-8');

    // ajustes básicos de paths
    content = content
      .replace(/href="(\.\.\/){2}css/g,   'href="/css')
      .replace(/href="(\.\.\/){2}js/g,    'href="/js')
      .replace(/src="(\.\.\/){2}Images?/g,'src="/images')
      // links internos HTML ➔ ejs
      .replace(/href="([^\"]+)\.html"/g, 'href="/adm/$1"');

    fs.writeFileSync(dstPath, content, 'utf-8');
    console.log(`✔  ${file} → dashboard/adm/${dstName}`);
  });
