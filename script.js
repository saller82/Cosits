// Funciones de interacción
function ocultarTodas(){
  document.querySelectorAll('.seccion').forEach(s => s.classList.add('oculto'));
}
function mostrar(id){
  ocultarTodas();
  const el = document.getElementById(id);
  if(el) el.classList.remove('oculto');
  // cerrar player de juegos si está abierto
  document.getElementById('juego-player')?.classList.add('oculto');
  document.getElementById('juego-frame') && (document.getElementById('juego-frame').src = '');
}
function manejarEnter(e, fn){
  if(e.key === 'Enter') fn();
}

/* YouTube */
function extraerYouTubeId(url){
  try{
    const u = new URL(url);
    if(u.hostname.includes('youtube.com')){
      return u.searchParams.get('v');
    } else if(u.hostname === 'youtu.be'){
      return u.pathname.slice(1);
    }
  }catch(e){}
  return null;
}
function verVideo(){
  const url = document.getElementById('url').value.trim();
  const id = extraerYouTubeId(url);
  const iframe = document.getElementById('video');
  if(id){
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  } else {
    alert('URL de YouTube no válida. Pega el enlace completo (ej. https://www.youtube.com/watch?v=ID) o la versión short (youtu.be/ID).');
  }
}

/* TikTok (embedding variable) */
function verTikTok(){
  const url = document.getElementById('tiktok-url').value.trim();
  const cont = document.getElementById('tiktok-player');
  if(!url){ alert('Pega el enlace de TikTok'); return; }
  // intento de embed: muchos enlaces bloquean iframe, así que usamos un iframe directo y si no carga, se verá un error.
  cont.innerHTML = `<iframe src="${url}" frameborder="0" style="width:100%;height:520px;border:0;border-radius:6px;"></iframe>`;
}

/* Buscador Google (su búsqueda en iframe suele bloquearse) */
function buscarEnGoogle(){
  const q = document.getElementById('google-search').value.trim();
  if(!q){ alert('Escribe algo para buscar'); return; }
  const target = document.getElementById('google-player');
  target.innerHTML = `<iframe src="https://www.google.com/search?q=${encodeURIComponent(q)}" frameborder="0" style="width:100%;height:520px;border:0;border-radius:6px;"></iframe>`;
}

/* Juegos: abrir en overlay player */
function abrirJuego(url){
  const player = document.getElementById('juego-player');
  const frame = document.getElementById('juego-frame');
  frame.src = url;
  player.classList.remove('oculto');
  // ocultar menu principal para mejor experiencia
  window.scrollTo({top:0,behavior:'smooth'});
}
function cerrarJuego(){
  const player = document.getElementById('juego-player');
  const frame = document.getElementById('juego-frame');
  frame.src = '';
  player.classList.add('oculto');
}

/* IA */
function cambiarIA(name){
  document.getElementById('chatgpt-player').classList.toggle('oculto', name !== 'chatgpt');
  document.getElementById('gemini-player').classList.toggle('oculto', name !== 'gemini');
}

/* Escritorio simulado */
function cambiarEscritorio(name){
  document.getElementById('browser-player').classList.toggle('oculto', name !== 'browser');
  document.getElementById('desktop-player').classList.toggle('oculto', name !== 'desktop');
  document.getElementById('os-player').classList.toggle('oculto', name !== 'os');
  document.getElementById('code-player').classList.toggle('oculto', name !== 'code');
}

// Mostrar la sección principal al cargar
document.addEventListener('DOMContentLoaded', ()=> mostrar('juegos'));