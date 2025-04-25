// scripts/convertAlunoHtmlToEjs.js

const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '../html/aluno');
const ejsDir  = path.join(__dirname, '../src/views/dashboard/aluno');

// garante que o destino existe
dfs = fs;
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
      // CSS
      .replace(/href="(\.\.\/){2}css/g, 'href="/css')
      // JS
      .replace(/src="(\.\.\/){2}js/g,  'src="/js')
      // Images
      .replace(/src="(\.\.\/){2}Images?/g, 'src="/images')
      // links internos html ➔ ejs
      .replace(/href="([^"]+)\.html"/g, 'href="/aluno/$1"');

    fs.writeFileSync(dstPath, content, 'utf-8');
    console.log(`✔  ${file} → dashboard/aluno/${dstName}`);
  });
