// Función para mostrar/ocultar secciones
function mostrar(seccionId) {
  // Ocultar todas las secciones
  document.querySelectorAll('.seccion').forEach(seccion => {
    seccion.classList.add('oculto');
  });
  
  // Mostrar la sección seleccionada
  const seccionSeleccionada = document.getElementById(seccionId);
  if (seccionSeleccionada) {
    seccionSeleccionada.classList.remove('oculto');
  }
}

// Función para reproducir videos de YouTube
function verVideo() {
  const url = document.getElementById('url').value;
  const videoFrame = document.getElementById('video');
  
  if (!url) {
    alert('Por favor, pega un enlace de YouTube');
    return;
  }
  
  // Extraer ID del video de YouTube
  let videoId = '';
  
  // Diferentes formatos de URL de YouTube
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0];
  } else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('/embed/')[1]?.split('?')[0];
  }
  
  if (videoId) {
    videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
    document.getElementById('url').value = '';
  } else {
    alert('Enlace de YouTube no válido. Prueba con un enlace como: https://www.youtube.com/watch?v=...');
  }
}

// Función para reproducir videos de TikTok
function verTikTok() {
  const url = document.getElementById('tiktok-url').value;
  const tiktokPlayer = document.getElementById('tiktok-player');
  
  if (!url) {
    alert('Por favor, pega un enlace de TikTok');
    return;
  }
  
  // Verificar que sea un enlace de TikTok válido
  if (!url.includes('tiktok.com')) {
    alert('Por favor, pega un enlace válido de TikTok');
    return;
  }
  
  // Limpiar la URL y extraer el ID del video
  let cleanUrl = url.split('?')[0]; // Remover parámetros
  
  try {
    // Crear iframe embed de TikTok
    tiktokPlayer.innerHTML = `
      <iframe 
        src="https://www.tiktok.com/embed/v2?url=${encodeURIComponent(cleanUrl)}"
        width="325"
        height="580"
        frameborder="0"
        scrolling="no"
        allowfullscreen>
      </iframe>
      <div style="margin-top: 15px;">
        <button onclick="cerrarTikTok()" style="background: #ff6b6b; padding: 8px 16px; font-size: 0.9rem; border: none; color: white; border-radius: 5px; cursor: pointer;">
          Cerrar Video
        </button>
      </div>
    `;
    
    // Limpiar el input
    document.getElementById('tiktok-url').value = '';
    
  } catch (error) {
    alert('Error al cargar el video de TikTok. Verifica que el enlace sea correcto.');
    console.error('Error:', error);
  }
}

// Función para cerrar el video de TikTok
function cerrarTikTok() {
  const tiktokPlayer = document.getElementById('tiktok-player');
  tiktokPlayer.innerHTML = '<p>Pega un enlace de TikTok para ver el video aquí</p>';
}

// Función para abrir juegos de 1001 Juegos integrados
function abrirJuego1001(categoria) {
  // Juegos en español o con soporte multiidioma
  const juegosEmbebidos = {
    'racing': 'https://www.crazygames.com/es/juego/madalin-stunt-cars-2?iframe=true',
    'soccer': 'https://www.crazygames.com/es/juego/soccer-skills-runner?iframe=true',
    'tetris': 'https://tetris.com/play-tetris?lang=es',
    'bubbles': 'https://www.crazygames.com/es/juego/bubble-shooter?iframe=true',
    'runner': 'https://www.crazygames.com/es/juego/temple-run-2?iframe=true',
    'princess': 'https://juegosfriv.com/embed/juegos-de-princesas',
    'shooter': 'https://www.crazygames.com/es/juego/space-invaders?iframe=true',
    'cooking': 'https://www.crazygames.com/es/juego/papa-pizzeria?iframe=true',
    'arcade': 'https://www.crazygames.com/es/juego/pacman?iframe=true',
    'brain': 'https://www.crazygames.com/es/juego/2048?iframe=true',
    'circus': 'https://juegosfriv.com/embed/juegos-de-circo',
    'casino': 'https://www.crazygames.com/es/juego/governor-of-poker?iframe=true'
  };
  
  const juegoUrl = juegosEmbebidos[categoria];
  if (juegoUrl) {
    // Mostrar el jugador y ocultar el menú
    document.getElementById('juego-player').classList.remove('oculto');
    document.getElementById('juegos-menu').classList.add('oculto');
    
    // Cargar el juego en el iframe
    const iframe = document.getElementById('juego-frame');
    iframe.src = juegoUrl;
    iframe.allow = "autoplay; fullscreen; clipboard-write; gamepad; xr-spatial-tracking; encrypted-media";
  }
}

// Función para abrir juegos antiguos (mantener compatibilidad)
function abrirJuego(categoria) {
  // Si es una URL completa (como el sitio completo), abrir en nueva pestaña
  if (categoria.startsWith('http')) {
    window.open(categoria, '_blank');
    return;
  }
}

// Función para cerrar el juego y volver al menú
function cerrarJuego() {
  document.getElementById('juego-player').classList.add('oculto');
  document.getElementById('juegos-menu').classList.remove('oculto');
  document.getElementById('juego-frame').src = ''; // Limpiar el iframe
}

// Función para buscar en Google
function buscarEnGoogle() {
  const busqueda = document.getElementById('google-search').value.trim();
  const googlePlayer = document.getElementById('google-player');
  
  if (!busqueda) {
    alert('Por favor, escribe algo para buscar en Google');
    return;
  }
  
  // Crear el iframe de Google con la búsqueda
  const urlBusqueda = encodeURIComponent(busqueda);
  googlePlayer.innerHTML = `
    <iframe 
      src="https://www.google.com/search?q=${urlBusqueda}&igu=1"
      width="100%"
      height="700"
      frameborder="0"
      allowfullscreen>
    </iframe>
    <div style="margin-top: 15px;">
      <button onclick="limpiarGoogle()" style="background: #ff6b6b; padding: 8px 16px; font-size: 0.9rem; border: none; color: white; border-radius: 5px; cursor: pointer;">
        Nueva Búsqueda
      </button>
    </div>
  `;
  
  // Limpiar el input
  document.getElementById('google-search').value = '';
}

// Función para limpiar la búsqueda de Google
function limpiarGoogle() {
  const googlePlayer = document.getElementById('google-player');
  googlePlayer.innerHTML = '<p>Escribe algo en el buscador para ver los resultados de Google aquí</p>';
}

// Función para cambiar entre ChatGPT y Gemini
function cambiarIA(tipo) {
  const chatgptPlayer = document.getElementById('chatgpt-player');
  const geminiPlayer = document.getElementById('gemini-player');
  const btnChatgpt = document.getElementById('btn-chatgpt');
  const btnGemini = document.getElementById('btn-gemini');
  
  if (tipo === 'chatgpt') {
    chatgptPlayer.classList.remove('oculto');
    geminiPlayer.classList.add('oculto');
    btnChatgpt.classList.add('active');
    btnGemini.classList.remove('active');
  } else if (tipo === 'gemini') {
    chatgptPlayer.classList.add('oculto');
    geminiPlayer.classList.remove('oculto');
    btnChatgpt.classList.remove('active');
    btnGemini.classList.add('active');
  }
}

// Función para cambiar entre opciones de escritorio
function cambiarEscritorio(tipo) {
  const browserPlayer = document.getElementById('browser-player');
  const desktopPlayer = document.getElementById('desktop-player');
  const osPlayer = document.getElementById('os-player');
  const codePlayer = document.getElementById('code-player');
  const btnBrowser = document.getElementById('btn-browser');
  const btnDesktop = document.getElementById('btn-desktop');
  const btnOs = document.getElementById('btn-os');
  const btnCode = document.getElementById('btn-code');
  
  // Ocultar todos
  browserPlayer.classList.add('oculto');
  desktopPlayer.classList.add('oculto');
  osPlayer.classList.add('oculto');
  codePlayer.classList.add('oculto');
  btnBrowser.classList.remove('active');
  btnDesktop.classList.remove('active');
  btnOs.classList.remove('active');
  btnCode.classList.remove('active');
  
  // Mostrar el seleccionado
  if (tipo === 'browser') {
    browserPlayer.classList.remove('oculto');
    btnBrowser.classList.add('active');
  } else if (tipo === 'desktop') {
    desktopPlayer.classList.remove('oculto');
    btnDesktop.classList.add('active');
  } else if (tipo === 'os') {
    osPlayer.classList.remove('oculto');
    btnOs.classList.add('active');
  } else if (tipo === 'code') {
    codePlayer.classList.remove('oculto');
    btnCode.classList.add('active');
  }
}

// Función para manejar Enter en los inputs
function manejarEnter(event, funcion) {
  if (event.key === 'Enter') {
    funcion();
  }
}

// Añadir funciones globales inmediatamente
window.mostrar = mostrar;
window.verVideo = verVideo;
window.verTikTok = verTikTok;
window.cerrarTikTok = cerrarTikTok;
window.abrirJuego = abrirJuego;
window.abrirJuego1001 = abrirJuego1001;
window.cerrarJuego = cerrarJuego;
window.buscarEnGoogle = buscarEnGoogle;
window.limpiarGoogle = limpiarGoogle;
window.cambiarIA = cambiarIA;
window.cambiarEscritorio = cambiarEscritorio;

// Inicializar la página cuando se carga
document.addEventListener('DOMContentLoaded', function() {
  // Mostrar la sección de juegos por defecto
  mostrar('juegos');
  
  // Agregar event listeners para Enter en los inputs
  const urlInput = document.getElementById('url');
  const tiktokInput = document.getElementById('tiktok-url');
  
  if (urlInput) {
    urlInput.addEventListener('keypress', function(e) {
      manejarEnter(e, verVideo);
    });
  }
  
  if (tiktokInput) {
    tiktokInput.addEventListener('keypress', function(e) {
      manejarEnter(e, verTikTok);
    });
  }
  
  // Agregar event listener para Google
  const googleInput = document.getElementById('google-search');
  if (googleInput) {
    googleInput.addEventListener('keypress', function(e) {
      manejarEnter(e, buscarEnGoogle);
    });
  }
});