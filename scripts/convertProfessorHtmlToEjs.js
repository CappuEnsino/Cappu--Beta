// scripts/convertProfessorHtmlToEjs.js
// Converte HTMLs de html/professor para EJS em src/views/dashboard/professor

const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '../html/professor');
const ejsDir  = path.join(__dirname, '../src/views/dashboard/professor');

if (!fs.existsSync(ejsDir)) {
  fs.mkdirSync(ejsDir, { recursive: true });
}

fs.readdirSync(htmlDir)
  .filter(f => f.endsWith('.html'))
  .forEach(file => {
    const srcPath = path.join(htmlDir, file);
    const dstName = file.replace(/\.html$/, '.ejs');
    const dstPath = path.join(ejsDir, dstName);
    // não sobrescreve existentes
    if (fs.existsSync(dstPath)) {
      console.log(`⚠ skipped existing: ${dstName}`);
      return;
    }
    let content = fs.readFileSync(srcPath, 'utf-8');
    // ajustes de caminhos
    content = content
      .replace(/href="(\.\.\/){2}css/g, 'href="/css')
      .replace(/href="(\.\.\/){2}js/g,  'href="/js')
      .replace(/src="(\.\.\/){2}Images?/g, 'src="/images')
      // links internos HTML → rota EJS
      .replace(/href="[^"]*p-config\.html"/g, 'href="/dashboard/professor/config"')
      .replace(/href="[^"]*p-professor\.html"/g, 'href="/dashboard/professor"')
      .replace(/href="[^"]*p-curso_prof\.html"/g,'href="/dashboard/professor/curso"')
      .replace(/href="[^"]*p-minha-rotina\.html"/g,'href="/dashboard/professor/rotina"')
      // outros .html → /dashboard/professor/<nome>
      .replace(/href="([^"]+)\.html"/g, 'href="/dashboard/professor/$1"');
    fs.writeFileSync(dstPath, content, 'utf-8');
    console.log(`✔ created: ${dstName}`);
  });
