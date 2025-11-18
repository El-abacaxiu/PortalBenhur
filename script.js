/* ========== Dados do portal (links, cursos, desafios) ========== */
const PORTAL = {
  nivel1: {
    cursos: [
      {title: "Curso em Vídeo - Python (Playlist)", url: "https://youtube.com/playlist?list=PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6"},
      {title: "freeCodeCamp — Python básico", url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/"},
      {title: "Curso em Vídeo - JavaScript (Playlist)", url: "https://youtube.com/playlist?list=PLHz_AreHm4dkZ9-atkCMLEJR7rYjPZmbx"},
      {title: "freeCodeCamp — JS básico", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"}
    ],
    exercicios: [
      {title:"Exercism - Python", url:"https://exercism.org/tracks/python"},
      {title:"HackerRank - Python", url:"https://www.hackerrank.com/domains/python"},
      {title:"Exercism - JS", url:"https://exercism.org/tracks/javascript"},
      {title:"HackerRank - JS", url:"https://www.hackerrank.com/domains/tutorials/10-days-of-javascript"}
    ],
    desafios: [
      "Calculadora simples (Python)",
      "Tabuada (Python)",
      "Par ou ímpar (Python)",
      "Lista de compras (Python)",
      "Contador +/− (JS)",
      "Botão muda texto (JS)",
      "Tema claro/escuro (JS)",
      "Relógio simples (JS)"
    ]
  },
  nivel2: {
    cursos: [
      {title:"freeCodeCamp — Módulos & Funções", url:"https://www.freecodecamp.org/learn"},
      {title:"Python POO (YouTube)", url:"https://www.youtube.com/watch?v=YSe9K4qYI9I"},
      {title:"Scrimba — JavaScript moderno", url:"https://scrimba.com/learn/learnjavascript"},
      {title:"MDN — Arrays / Objetos", url:"https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"}
    ],
    exercicios: [
      {title:"Codewars", url:"https://www.codewars.com"},
      {title:"Codewars (JS)", url:"https://www.codewars.com"}
    ],
    desafios: [
      "Gerenciador de tarefas (arquivo) - Python",
      "Sistema de login (txt) - Python",
      "Analisador de texto - Python",
      "App de clima (fetch) - JS",
      "Lista de tarefas com LocalStorage - JS",
      "Jogo Adivinhe o Número - JS"
    ]
  },
  nivel3: {
    cursos: [
      {title:"APIs com Flask (YouTube)", url:"https://www.youtube.com/watch?v=Qn3mHNuwmL8"},
      {title:"SQLite + Python (YouTube)", url:"https://www.youtube.com/watch?v=byHcYRpMgI4"},
      {title:"React — Scrimba", url:"https://scrimba.com/learn/learnreact"},
      {title:"Node.js básico (YouTube)", url:"https://www.youtube.com/watch?v=DiXbJL3iWVs"}
    ],
    projetos: [
      "API de usuários (CRUD) - Python/Flask",
      "Bot do Discord - Python",
      "Site completo em React",
      "Dashboard com gráficos (React)",
      "Mini e-commerce (fake) - fullstack"
    ],
    desafios: [
      "API REST completa (CRUD) - Flask",
      "Autenticação JWT - Python",
      "Integração front+back (Node/React)",
      "Deploy full (Railway/Render/GH Pages)",
      "Testes automatizados"
    ]
  },
  cadernos: {
    python: [
      {title:"Replit Python", url:"https://replit.com/languages/python3"},
      {title:"Google Colab", url:"https://colab.research.google.com"},
      {title:"Jupyter (MyBinder)", url:"https://mybinder.org/"}
    ],
    js: [
      {title:"CodePen", url:"https://codepen.io/pen/"},
      {title:"JSFiddle", url:"https://jsfiddle.net"},
      {title:"Replit Node.js", url:"https://replit.com/languages/nodejs"}
    ]
  },
  projetos: [
    {title:"Deploy: Railway", url:"https://railway.app"},
    {title:"Deploy: Render", url:"https://render.com"},
    {title:"GitHub (repositório)", url:"https://github.com"}
  ],
  consultas: [
    {title:"W3Schools — Python", url:"https://www.w3schools.com/python/"},
    {title:"MDN — JavaScript", url:"https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"}
  ],
  cursosAll: [
    // reutiliza os do nível 1/2/3
  ],
  exsPy: [
    {title:"Exercism - Python", url:"https://exercism.org/tracks/python"},
    {title:"HackerRank - Python", url:"https://www.hackerrank.com/domains/python"}
  ],
  exsJs: [
    {title:"Exercism - JS", url:"https://exercism.org/tracks/javascript"},
    {title:"HackerRank - JS", url:"https://www.hackerrank.com/domains/tutorials/10-days-of-javascript"}
  ]
};

/* ========== Utilidades DOM e rota simples ========== */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const pages = $$('.page');
const navlinks = $$('.navlink');

function showPage(id){
  pages.forEach(p => p.classList.remove('active'));
  $(`#${id}`).classList.add('active');
  navlinks.forEach(n => n.classList.remove('active'));
  $$(`.navlink[data-page="${id}"]`).forEach(n => n.classList.add('active'));
  // scroll top
  document.querySelector('.content').scrollTop = 0;
}

/* nav events */
navlinks.forEach(link => {
  link.addEventListener('click', () => {
    const page = link.dataset.page;
    showPage(page);
  });
});

/* SEARCH */
$('#search').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  if(!q){
    // show current page only
    return;
  }
  pages.forEach(p => {
    const text = p.innerText.toLowerCase();
    p.style.display = text.includes(q) ? 'block' : 'none';
  });
});

/* ========== Renderização dinâmica ========== */
function renderList(targetSelector, items){
  const el = $(targetSelector);
  if(!el) return;
  el.innerHTML = '';
  items.forEach(it => {
    const li = document.createElement('li');
    li.innerHTML = it.url ? `<a href="${it.url}" target="_blank">${it.title}</a>` : `${it.title}`;
    el.appendChild(li);
  });
}

/* preencher Nível 1 */
function fillNivel1(){
  renderList('#n1-cursos', PORTAL.nivel1.cursos);
  renderList('#n1-exs', PORTAL.nivel1.exercicios);
  const box = $('#n1-desafios');
  box.innerHTML = '';
  PORTAL.nivel1.desafios.forEach((d,i) => {
    const div = document.createElement('div');
    div.className = 'atividade';
    const id = `n1d${i}`;
    div.innerHTML = `<h4>${i+1}. ${d}</h4>
      <p class="small">Descrição rápida e dicas: comece simples e teste no Replit.</p>
      <label><input type="checkbox" data-key="${id}" /> Marcar concluído</label>`;
    box.appendChild(div);
  });
}

/* preencher Nível 2 */
function fillNivel2(){
  renderList('#n2-cursos', PORTAL.nivel2.cursos);
  renderList('#n2-exs', PORTAL.nivel2.exercicios);
  const box = $('#n2-desafios');
  box.innerHTML = '';
  PORTAL.nivel2.desafios.forEach((d,i) => {
    const div = document.createElement('div');
    div.className = 'atividade';
    const id = `n2d${i}`;
    div.innerHTML = `<h4>${i+1}. ${d}</h4>
      <p class="small">Dica: separa por funções e testes.</p>
      <label><input type="checkbox" data-key="${id}" /> Marcar concluído</label>`;
    box.appendChild(div);
  });
}

/* preencher Nível 3 */
function fillNivel3(){
  renderList('#n3-cursos', PORTAL.nivel3.cursos);
  const box = $('#n3-desafios');
  box.innerHTML = '';
  PORTAL.nivel3.desafios.forEach((d,i) => {
    const div = document.createElement('div');
    div.className = 'atividade';
    const id = `n3d${i}`;
    div.innerHTML = `<h4>${i+1}. ${d}</h4>
      <p class="small">Dica: prepara um repositório no GitHub e documenta o projeto.</p>
      <label><input type="checkbox" data-key="${id}" /> Marcar concluído</label>`;
    box.appendChild(div);
  });

  // projetos
  renderList('#projetos-list', PORTAL.nivel3.projetos.map(p=>({title:p})));
}

/* cadernos, projetos, consultas, exercícios gerais */
function fillOther(){
  renderList('#projetos-list', PORTAL.projetos);
  renderList('#exs-py', PORTAL.exsPy);
  renderList('#exs-js', PORTAL.exsJs);
  renderList('#cursos-list', [].concat(PORTAL.nivel1.cursos, PORTAL.nivel2.cursos, PORTAL.nivel3.cursos));
  renderList('#consultas-list', PORTAL.consultas);
  renderList('#projetos-list', PORTAL.projetos);
  renderList('#n1-cursos', PORTAL.nivel1.cursos);
}

/* ========== Progresso (localStorage) ========== */
const LS_PROGRESS = 'benhur_progress_v1';
function saveProgress(){
  const checks = {};
  $$('input[type="checkbox"][data-key]').forEach(cb => checks[cb.dataset.key] = cb.checked);
  localStorage.setItem(LS_PROGRESS, JSON.stringify(checks));
}
function loadProgress(){
  const raw = localStorage.getItem(LS_PROGRESS);
  if(!raw) return;
  try{
    const obj = JSON.parse(raw);
    $$('input[type="checkbox"][data-key]').forEach(cb => {
      cb.checked = !!obj[cb.dataset.key];
    });
  }catch(e){}
}
document.addEventListener('change', (e) => {
  if(e.target && e.target.type === 'checkbox' && e.target.dataset.key){
    saveProgress();
  }
});

/* ========== Notas (caderno) ========== */
const LS_NOTES = 'benhur_notes_v1';
const noteArea = $('#noteArea');
function loadNotes(){ noteArea.value = localStorage.getItem(LS_NOTES) || ''; }
function saveNotes(){ localStorage.setItem(LS_NOTES, noteArea.value); }
$('#saveNote').addEventListener('click', () => { saveNotes(); alert('Nota salva!'); });
$('#clearNote').addEventListener('click', () => { if(confirm('Limpar caderno?')){ noteArea.value=''; saveNotes(); }});
$('#downloadNote').addEventListener('click', () => {
  const blob = new Blob([noteArea.value], {type:'text/plain'}); const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'caderno_benhur.txt'; a.click(); URL.revokeObjectURL(url);
});
noteArea.addEventListener('input', () => { saveNotes(); });

/* ========== Copy all links ======== */
$('#copyLinksBtn').addEventListener('click', async () => {
  const anchors = Array.from(document.querySelectorAll('a[href]')).map(a => a.href);
  const text = anchors.filter((v,i,a)=>a.indexOf(v)===i).join('\n');
  try{ await navigator.clipboard.writeText(text); alert('Links copiados!'); }
  catch(e){ prompt('Copiar manualmente:', text); }
});

/* ========== Export / Import JSON (dados locais) ========== */
$('#exportBtn').addEventListener('click', () => {
  const payload = {
    progress: JSON.parse(localStorage.getItem(LS_PROGRESS) || '{}'),
    notes: localStorage.getItem(LS_NOTES) || ''
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'portal_benhur_export.json'; a.click(); URL.revokeObjectURL(url);
});
$('#importBtn').addEventListener('click', () => { $('#importModal').style.display = 'flex'; });
$('#closeImport').addEventListener('click', () => { $('#importModal').style.display = 'none'; });
$('#importFile').addEventListener('change', (e) => {
  const file = e.target.files[0]; if(!file) return;
  const reader = new FileReader(); reader.onload = () => {
    try{
      const obj = JSON.parse(reader.result);
      if(obj.progress) localStorage.setItem(LS_PROGRESS, JSON.stringify(obj.progress));
      if(obj.notes) localStorage.setItem(LS_NOTES, obj.notes);
      loadProgress(); loadNotes();
      alert('Importado com sucesso!');
    }catch(err){ alert('Arquivo inválido'); }
  };
  reader.readAsText(file);
});

/* ========== Inicialização ========== */
fillNivel1();
fillNivel2();
fillNivel3();
fillOther();
loadProgress();
loadNotes();

/* small UX: close import modal on Esc */
document.addEventListener('keydown', e => { if(e.key === 'Escape') $('#importModal').style.display = 'none'; });