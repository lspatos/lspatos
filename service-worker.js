/**
 * LS Mapas - Service Worker
 * Cache do "esqueleto" do site (HTML/CSS/JS/ícones) + cache dos dados
 * lidos do Worker, pra funcionar mesmo com sinal fraco ou instável.
 */

const CACHE_ESTATICO = 'ls-mapas-estatico-v4';
const CACHE_DADOS = 'ls-mapas-dados-v4';

const ARQUIVOS_ESTATICOS = [
  './',
  './mapa.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './ilustracao_hero.svg',
  './map_card_logo.svg',
  './home.png',
  './fav_icon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_ESTATICO)
      .then(cache => cache.addAll(ARQUIVOS_ESTATICOS))
      .catch(err => console.warn('Falha ao pré-carregar cache estático:', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(nomes =>
      Promise.all(
        nomes
          .filter(n => n !== CACHE_ESTATICO && n !== CACHE_DADOS)
          .map(n => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

// Páginas de administração (não usadas em campo, não precisam de cache offline).
// Ficar de fora do cache evita o problema recorrente de ver dados/código desatualizado
// nelas depois de uma atualização.
const PAGINAS_SEM_CACHE = ['/admin.html', '/painel.html', '/relatorio.html', '/s13.html'];

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Só cuida de leituras (GET). Envios (POST) ficam por conta da fila do app.
  if (req.method !== 'GET') return;

  // Páginas de admin: sempre busca da rede, nunca cacheia (nem serve cache em caso de falha)
  if (PAGINAS_SEM_CACHE.some(p => url.pathname.endsWith(p))) {
    event.respondWith(fetch(req, { cache: 'no-store' }));
    return;
  }

  // Dados do Worker (endereços / respostas): network-first, cai pro cache se não houver sinal
  if (url.hostname.includes('workers.dev')) {
    event.respondWith(
      fetch(req)
        .then(resp => {
          try {
            if (resp && resp.ok) {
              const copia = resp.clone();
              caches.open(CACHE_DADOS).then(cache => cache.put(req, copia)).catch(() => {});
            }
          } catch (e) { /* cache é só otimização, nunca deve quebrar a resposta real */ }
          return resp;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Arquivos do próprio site: cache-first, atualizando em segundo plano
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(cached => {
        const buscaRede = fetch(req)
          .then(resp => {
            try {
              if (resp && resp.ok) {
                const copia = resp.clone();
                caches.open(CACHE_ESTATICO).then(cache => cache.put(req, copia)).catch(() => {});
              }
            } catch (e) { /* cache é só otimização, nunca deve quebrar a resposta real */ }
            return resp;
          })
          .catch(() => cached);
        return cached || buscaRede;
      })
    );
  }
});
