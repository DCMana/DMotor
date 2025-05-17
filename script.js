document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      playSound(sonidoClick);
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Modal functionality
  const modal = document.getElementById("autorModal");
  const closeModalButton = document.querySelector(".modal .close-button");
  const autorCards = document.querySelectorAll(".card[data-autor]");

  const autoresInfo = {
    gesell: {
      nombre: "Arnold Gesell",
      teoria: "Teoría de la Maduración.",
      aportes: "Gesell propuso que el desarrollo motor sigue una secuencia fija y predecible, determinada en gran medida por factores biológicos y genéticos (un 'reloj biológico'). Enfatizó la importancia de las normas de desarrollo, observando patrones céfalo-caudal (de la cabeza a los pies) y próximo-distal (del centro a la periferia). Si bien reconoció la influencia del ambiente, consideró la maduración interna como el motor principal. Históricamente, su teoría sugería que la estimulación temprana no aceleraba significativamente el desarrollo si el niño no estaba madurativamente preparado."
    },
    zelazo: {
      nombre: "Zelazo y Collins",
      teoria: "Estimulación y Aprendizaje Activo.",
      aportes: "En contraste con Gesell, Zelazo y Collins investigaron cómo la estimulación temprana y la práctica activa podían influir y acelerar la adquisición de habilidades motrices. Sus estudios sugirieron que el sistema nervioso es más plástico y que la intervención adecuada puede forzar una maduración más rápida de ciertas destrezas, permitiendo a los niños alcanzar hitos antes de lo esperado por su 'ritmo biológico natural'. Destacan el papel activo del niño y del entorno en el aprendizaje motor."
    },
    coghill: {
      nombre: "George E. Coghill",
      teoria: "Leyes del Desarrollo Motor.",
      aportes: "Coghill es conocido por sus estudios sobre el desarrollo embrionario y postuló dos leyes fundamentales que rigen el desarrollo motor: la Ley Céfalo-Caudal (el control motor progresa desde la cabeza hacia los pies, ej: el bebé controla la cabeza antes que las piernas) y la Ley Próximo-Distal (el control motor avanza desde el centro del cuerpo hacia las extremidades, ej: controla los hombros antes que los dedos). Estas leyes ayudan a entender la secuencia de adquisición de habilidades."
    },
    solomons: {
      nombre: "G. Solomons",
      teoria: "Influencia Cultural en el Desarrollo Motor.",
      aportes: "Solomons destacó el importante papel de los factores culturales en el desarrollo motor. Su estudio comparativo (ej: bebés en Yucatán vs. EEUU en 1978) mostró cómo las prácticas de crianza, las costumbres y las creencias de una cultura pueden acelerar, retrasar o moldear el desarrollo de habilidades motoras específicas. Lo que se considera 'normal' en una cultura puede ser diferente en otra, evidenciando que el desarrollo no es puramente biológico, sino también un constructo socio-cultural."
    }
  };

  autorCards.forEach(card => {
    card.addEventListener("click", () => {
      const autorKey = card.dataset.autor;
      const info = autoresInfo[autorKey];
      if (info) {
        document.getElementById("modalAutorNombre").textContent = info.nombre;
        document.getElementById("modalAutorTeoria").textContent = info.teoria;
        document.getElementById("modalAutorAportes").textContent = info.aportes;
        modal.style.display = "block";
        playSound(sonidoClick);
      }
    });
    card.addEventListener("mouseenter", () => playSound(sonidoHover, 0.3));
  });

  closeModalButton.onclick = () => {
    modal.style.display = "none";
    playSound(sonidoClick);
  }
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Accordion functionality for stimulation section
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      playSound(sonidoClick);
      const content = header.nextElementSibling;
      const isActive = content.classList.contains('active');
      
      // Close all other accordions
      document.querySelectorAll('.accordion-content.active').forEach(activeContent => {
          if (activeContent !== content) {
              activeContent.classList.remove('active');
              activeContent.style.maxHeight = null;
              activeContent.style.padding = "0 1rem";
          }
      });

      // Toggle current accordion
      if (isActive) {
        content.classList.remove('active');
        content.style.maxHeight = null;
        content.style.padding = "0 1rem";
      } else {
        content.classList.add('active');
        content.style.padding = "1rem"; // Add padding before calculating scrollHeight
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
    header.addEventListener("mouseenter", () => playSound(sonidoHover, 0.3));
  });

  // Simulador: Cargar actividades según edad
  const edadSelect = document.getElementById('sim-edad');
  const actividadesContainer = document.getElementById('sim-actividades-checkboxes');
  
  const actividadesPorEdad = {
    "0-6m": ["Tiempo boca abajo", "Móviles y sonajeros", "Masajes suaves", "Juegos de manos"],
    "6-12m": ["Gateo con obstáculos", "Bloques para apilar", "Meter/sacar objetos", "Libros de tela"],
    "1-2a": ["Caminar por texturas", "Garabatear", "Encajables simples", "Empujar juguetes"],
    "2-4a": ["Correr y saltar", "Triciclo", "Dibujar formas", "Recortar con supervisión"],
    "4-6a": ["Saltar a la cuerda", "Bicicleta", "Escribir letras", "Juegos de mesa"]
  };

  function cargarActividadesSimulador() {
    const edadSeleccionada = edadSelect.value;
    actividadesContainer.innerHTML = ''; // Limpiar anteriores
    actividadesPorEdad[edadSeleccionada].forEach((act, index) => {
      const checkboxId = `act-${index}`;
      const label = document.createElement('label');
      label.htmlFor = checkboxId;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = checkboxId;
      checkbox.value = act;
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` ${act}`));
      actividadesContainer.appendChild(label);
    });
  }
  edadSelect.addEventListener('change', cargarActividadesSimulador);
  cargarActividadesSimulador(); // Carga inicial

  // Sonidos
  const sonidoExito = document.getElementById('sonidoExito');
  const sonidoClick = document.getElementById('sonidoClick');
  const sonidoHover = document.getElementById('sonidoHover');

  // Inicializar botones de acción con sonido de hover
  document.querySelectorAll('.action-button, .tab-button').forEach(button => {
      button.addEventListener("mouseenter", () => playSound(sonidoHover, 0.3));
  });

});

let simulacionActual = {}; // Para guardar los datos de la simulación actual

function iniciarSimulador() {
  const resultadoDiv = document.getElementById("resultadoSimulacion");
  const edad = document.getElementById("sim-edad").value;
  const nombreSimulado = "Peque Explorador"; // Nombre genérico
  
  const actividadesSeleccionadas = [];
  document.querySelectorAll('#sim-actividades-checkboxes input[type="checkbox"]:checked').forEach(cb => {
    actividadesSeleccionadas.push(cb.value);
  });

  let mensajeResultado = `<p><strong>Simulación para ${nombreSimulado} (${edad}):</strong></p>`;
  
  if (actividadesSeleccionadas.length === 0) {
    mensajeResultado += "<p>No se seleccionaron actividades. ¡La estimulación es clave!</p>";
  } else {
    mensajeResultado += "<p>Con la estimulación mediante: " + actividadesSeleccionadas.join(', ') + "...</p>";
    // Lógica de simulación (simplificada)
    if (edad === "0-6m" && actividadesSeleccionadas.includes("Tiempo boca abajo")) {
      mensajeResultado += "<p>✅ Fortalecimiento del cuello y espalda, preparando para el gateo.</p>";
    } else if (edad === "1-2a" && actividadesSeleccionadas.includes("Caminar por texturas")) {
      mensajeResultado += "<p>✅ Mejora del equilibrio y la propiocepción al caminar.</p>";
    } else if (edad === "4-6a" && actividadesSeleccionadas.includes("Escribir letras")) {
      mensajeResultado += "<p>✅ Desarrollo de la motricidad fina y preparación para la lectoescritura.</p>";
    } else {
      mensajeResultado += "<p>👍 Se observa un progreso adecuado en las habilidades motoras correspondientes a su edad y las actividades realizadas.</p>";
    }
    mensajeResultado += "<p><em>Recuerda: cada niño tiene su propio ritmo. Esta es una simulación general.</em></p>";
  }

  resultadoDiv.innerHTML = mensajeResultado;
  playSound(sonidoExito);
  document.getElementById('btnExportar').style.display = 'inline-block';

  simulacionActual = {
    nombre: nombreSimulado,
    edad: edad,
    actividades: actividadesSeleccionadas.join('; '), // Usar ; para CSV si las actividades tienen comas
    resultado: mensajeResultado.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() // Limpiar HTML para CSV
  };
}

function exportarResultados() {
  if (!simulacionActual.nombre) {
    alert("Primero debes iniciar una simulación.");
    return;
  }
  playSound(sonidoClick);
  const csvHeader = "Nombre,Edad,Actividades Seleccionadas,Resultado Simulado\n";
  const csvRow = `"${simulacionActual.nombre}","${simulacionActual.edad}","${simulacionActual.actividades}","${simulacionActual.resultado}"\n`;
  const csvData = csvHeader + csvRow;
  
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "resultados_simulacion_desarrollo.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// Funciones para Hitos Motores (Tabs)
function showAgeContent(contentId) {
  playSound(sonidoClick);
  // Ocultar todos los contenidos
  document.querySelectorAll('.age-content').forEach(content => {
    content.classList.remove('active');
  });
  // Desactivar todos los botones
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });

  // Mostrar el contenido seleccionado y activar su botón
  document.getElementById(contentId).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Función para reproducir sonidos
function playSound(audioElement, volume = 0.5) {
  if (audioElement) {
    audioElement.currentTime = 0; // Reiniciar por si se llama rápido
    audioElement.volume = volume;
    audioElement.play().catch(error => console.log("Error al reproducir sonido:", error));
  }
}