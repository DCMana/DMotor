document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      playSound(sonidoClick);
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Modal functionality
  const modal = document.getElementById("autorModal");
  const closeModalButton = modal.querySelector(".close-button");
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

  if(closeModalButton) {
    closeModalButton.onclick = () => {
        modal.style.display = "none";
        playSound(sonidoClick);
    }
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
      
      document.querySelectorAll('.accordion-content.active').forEach(activeContent => {
          if (activeContent !== content) {
              activeContent.classList.remove('active');
              activeContent.style.maxHeight = null;
              activeContent.style.padding = "0 1rem";
          }
      });

      if (isActive) {
        content.classList.remove('active');
        content.style.maxHeight = null;
        content.style.padding = "0 1rem";
      } else {
        content.classList.add('active');
        content.style.padding = "1rem"; 
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
    header.addEventListener("mouseenter", () => playSound(sonidoHover, 0.3));
  });

  // ESTRUCTURAS DE DATOS PARA EL SIMULADOR
  const hitosPorEdad = {
    "0-6m": {
      descripcionGeneral: "Etapa de reflejos primarios, inicio del control postural y exploración sensorial.",
      hitos: [
        { id: "control_cefalico", nombre: "Control Cefálico (sostener cabeza)", actividadesClave: ["Tiempo boca abajo", "Móviles y sonajeros"], impacto: "Alto" },
        { id: "seguimiento_visual", nombre: "Seguimiento Visual de Objetos", actividadesClave: ["Móviles y sonajeros", "Juegos de manos"], impacto: "Medio" },
        { id: "agarre_reflejo_a_voluntario", nombre: "Agarre (de reflejo a voluntario)", actividadesClave: ["Móviles y sonajeros", "Masajes suaves"], impacto: "Medio" },
        { id: "inicio_rodar", nombre: "Inicio de Giros/Rodar", actividadesClave: ["Tiempo boca abajo", "Masajes suaves"], impacto: "Alto" }
      ],
      actividadesSugeridas: ["Tiempo boca abajo", "Móviles y sonajeros", "Masajes suaves", "Juegos de manos", "Cantar y hablarle"]
    },
    "6-12m": {
      descripcionGeneral: "Gran avance en movilidad (sedestación, gateo) y manipulación fina.",
      hitos: [
        { id: "sedestacion_sin_apoyo", nombre: "Sentarse sin Apoyo", actividadesClave: ["Gateo con obstáculos", "Bloques para apilar"], impacto: "Alto" },
        { id: "gateo", nombre: "Gateo Coordinado", actividadesClave: ["Gateo con obstáculos", "Explorar texturas en suelo"], impacto: "Alto" },
        { id: "pinza_inferior_superior", nombre: "Desarrollo de la Pinza Digital", actividadesClave: ["Bloques para apilar", "Meter/sacar objetos", "Libros de tela"], impacto: "Medio" },
        { id: "ponerse_de_pie_con_apoyo", nombre: "Ponerse de Pie con Apoyo", actividadesClave: ["Gateo con obstáculos"], impacto: "Alto" }
      ],
      actividadesSugeridas: ["Gateo con obstáculos", "Bloques para apilar", "Meter/sacar objetos", "Libros de tela", "Explorar texturas en suelo", "Juegos de 'esconder y encontrar'"]
    },
    "1-2a": {
      descripcionGeneral: "¡La era de los primeros pasos! Aumento de la independencia y exploración del entorno.",
      hitos: [
        { id: "marcha_independiente", nombre: "Caminar de forma Independiente", actividadesClave: ["Caminar por texturas", "Empujar juguetes"], impacto: "Muy Alto" },
        { id: "subir_escalones_gateando", nombre: "Subir Escalones (gateando/con ayuda)", actividadesClave: ["Caminar por texturas"], impacto: "Medio" },
        { id: "lanzar_pelota", nombre: "Lanzar una Pelota (rudimentario)", actividadesClave: ["Empujar juguetes", "Juegos de pelota"], impacto: "Bajo" },
        { id: "torres_cubos", nombre: "Construir Torres (2-4 cubos)", actividadesClave: ["Garabatear", "Encajables simples"], impacto: "Medio" }
      ],
      actividadesSugeridas: ["Caminar por texturas", "Garabatear", "Encajables simples", "Empujar juguetes", "Bailar", "Juegos de pelota", "Juegos de imitación"]
    },
    "2-4a": {
      descripcionGeneral: "Refinamiento de la marcha, inicio de saltos, y mayor destreza fina.",
      hitos: [
        { id: "correr_con_soltura", nombre: "Correr con Mayor Soltura", actividadesClave: ["Correr y saltar", "Triciclo"], impacto: "Alto" },
        { id: "saltar_dos_pies", nombre: "Saltar con Ambos Pies", actividadesClave: ["Correr y saltar", "Circuitos motores simples"], impacto: "Alto" },
        { id: "usar_tijeras_con_ayuda", nombre: "Uso Básico de Tijeras (con supervisión)", actividadesClave: ["Dibujar formas", "Recortar con supervisión"], impacto: "Medio" },
        { id: "pedalear_triciclo", nombre: "Pedalear un Triciclo", actividadesClave: ["Triciclo"], impacto: "Alto" }
      ],
      actividadesSugeridas: ["Correr y saltar", "Triciclo", "Dibujar formas", "Recortar con supervisión", "Plastilina", "Circuitos motores simples"]
    },
    "4-6a": {
      descripcionGeneral: "Mayor coordinación, equilibrio y habilidades motoras finas más complejas.",
      hitos: [
        { id: "saltar_pata_coja", nombre: "Saltar a la Pata Coja", actividadesClave: ["Saltar a la cuerda", "Juegos de equilibrio"], impacto: "Alto" },
        { id: "atrapar_pelota", nombre: "Atrapar una Pelota Mediana", actividadesClave: ["Bicicleta", "Juegos de equilibrio"], impacto: "Medio" },
        { id: "escribir_letras_simples", nombre: "Escribir Algunas Letras/Números", actividadesClave: ["Escribir letras", "Dibujo detallado"], impacto: "Alto" },
        { id: "vestirse_solo", nombre: "Vestirse y Desvestirse Casi Solo", actividadesClave: ["Juegos de mesa"], impacto: "Medio" } 
      ],
      actividadesSugeridas: ["Saltar a la cuerda", "Bicicleta", "Escribir letras", "Juegos de mesa", "Juegos de equilibrio", "Dibujo detallado", "Construcciones complejas"]
    }
  };

  const edadSelect = document.getElementById('sim-edad');
  const actividadesContainer = document.getElementById('sim-actividades-checkboxes');

  function cargarActividadesSimulador() {
    const edadSeleccionada = edadSelect.value;
    const datosEdad = hitosPorEdad[edadSeleccionada];
    actividadesContainer.innerHTML = ''; 

    if (datosEdad && datosEdad.actividadesSugeridas) {
      datosEdad.actividadesSugeridas.forEach((act, index) => {
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
  }
  if(edadSelect) {
    edadSelect.addEventListener('change', cargarActividadesSimulador);
    cargarActividadesSimulador(); 
  }
  

  // Sonidos
  const sonidoExito = document.getElementById('sonidoExito');
  const sonidoClick = document.getElementById('sonidoClick');
  const sonidoHover = document.getElementById('sonidoHover');

  document.querySelectorAll('.action-button, .tab-button').forEach(button => {
      button.addEventListener("mouseenter", () => playSound(sonidoHover, 0.3));
  });

});

let simulacionActual = {}; 

// Funciones globales accesibles desde el HTML
window.iniciarSimulador = function() {
  const resultadoDiv = document.getElementById("resultadoSimulacion");
  const edadSeleccionada = document.getElementById("sim-edad").value;
  const nombreSimulado = "Peque Explorador"; 
  
  const actividadesRealizadas = [];
  document.querySelectorAll('#sim-actividades-checkboxes input[type="checkbox"]:checked').forEach(cb => {
    actividadesRealizadas.push(cb.value);
  });

  const datosEdadActual = hitosPorEdad[edadSeleccionada];
  let mensajeResultado = `<p><strong>Simulación para ${nombreSimulado} (${edadSeleccionada}):</strong></p>`;
  mensajeResultado += `<p class="sim-desc">${datosEdadActual.descripcionGeneral}</p>`;

  if (actividadesRealizadas.length === 0) {
    mensajeResultado += "<p class='sim-warning'>⚠️ No se seleccionaron actividades. ¡La estimulación constante es fundamental para el desarrollo!</p>";
  } else {
    mensajeResultado += `<p><strong>Actividades de estimulación seleccionadas:</strong> ${actividadesRealizadas.join(', ')}.</p>`;
    mensajeResultado += `<h4>Progreso en Hitos Clave:</h4><ul>`;

    let hitosPotenciados = 0;
    let hitosEnDesarrollo = 0;

    datosEdadActual.hitos.forEach(hito => {
      let progresoHito = 0; 
      let actividadesRelevantesRealizadas = [];

      hito.actividadesClave.forEach(actClave => {
        if (actividadesRealizadas.includes(actClave)) {
          progresoHito++;
          actividadesRelevantesRealizadas.push(actClave);
        }
      });

      let iconoProgreso = "⏳"; 
      let textoProgreso = "en desarrollo";

      if (progresoHito === 0 && actividadesRealizadas.length > 2) { 
        iconoProgreso = "🤔";
        textoProgreso = "podría beneficiarse de actividades más específicas";
      } else if (progresoHito === 1 && hito.actividadesClave.length > 1) {
        iconoProgreso = "👍";
        textoProgreso = "buen progreso inicial";
        hitosEnDesarrollo++;
      } else if (progresoHito >= 1 && hito.actividadesClave.length === 1 ) { 
         iconoProgreso = "✅";
         textoProgreso = "bien encaminado / probablemente logrado";
         hitosPotenciados++;
      } else if (progresoHito >= 2) { 
         iconoProgreso = "✅";
         textoProgreso = "excelente progreso / probablemente logrado";
         hitosPotenciados++;
      }
      
      mensajeResultado += `<li>${iconoProgreso} <strong>${hito.nombre}:</strong> ${textoProgreso}. `;
      if(actividadesRelevantesRealizadas.length > 0) {
          mensajeResultado += `<em>(Potenciado por: ${actividadesRelevantesRealizadas.join(', ')})</em>`;
      }
      mensajeResultado += `</li>`;
    });
    mensajeResultado += `</ul>`;

    if (hitosPotenciados > datosEdadActual.hitos.length / 2) {
        mensajeResultado += "<p class='sim-summary good'>¡Excelente! La estimulación parece estar alineada con varios hitos clave para esta edad.</p>";
    } else if (hitosEnDesarrollo > 0 || hitosPotenciados > 0) {
        mensajeResultado += "<p class='sim-summary medium'>¡Buen camino! Se observa progreso. Continuar con la estimulación variada es importante.</p>";
    } else {
        mensajeResultado += "<p class='sim-summary neutral'>La estimulación seleccionada es un buen comienzo. Considera variar las actividades para cubrir más hitos.</p>";
    }
  }
  
  mensajeResultado += "<p class='sim-disclaimer'><em>Recuerda: cada niño/a tiene su propio ritmo. Esta es una simulación generalizada y lúdica. Consulta siempre con profesionales para una evaluación individualizada.</em></p>";

  resultadoDiv.innerHTML = mensajeResultado;
  playSound(document.getElementById('sonidoExito'));
  document.getElementById('btnExportar').style.display = 'inline-block';

  simulacionActual = {
    nombre: nombreSimulado,
    edad: edadSeleccionada,
    actividades: actividadesRealizadas.join('; '),
    resultadoGeneral: (hitosPotenciados > datosEdadActual.hitos.length / 2) ? "Progreso excelente" : (hitosEnDesarrollo > 0 || hitosPotenciados > 0) ? "Buen progreso" : "Estimulación inicial",
    detalleHitos: datosEdadActual.hitos.map(h => {
        let p = 0; h.actividadesClave.forEach(ac => { if(actividadesRealizadas.includes(ac)) p++; });
        return `${h.nombre}: ${p > 1 || (p===1 && h.actividadesClave.length===1) ? 'Logrado/Bien encaminado' : p===1 ? 'Progreso inicial' : 'Necesita estímulo'}`;
    }).join('; ')
  };
}

window.exportarResultados = function() {
  if (!simulacionActual.nombre) {
    alert("Primero debes iniciar una simulación.");
    return;
  }
  playSound(document.getElementById('sonidoClick'));
  const csvHeader = "Nombre,Edad,Actividades Seleccionadas,Resultado General,Detalle Hitos\n";
  const csvRow = `"${simulacionActual.nombre}","${simulacionActual.edad}","${simulacionActual.actividades}","${simulacionActual.resultadoGeneral}","${simulacionActual.detalleHitos}"\n`;
  const csvData = csvHeader + csvRow;
  
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "resultados_simulacion_desarrollo_detallado.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

window.showAgeContent = function(contentId, clickedButton) {
  playSound(document.getElementById('sonidoClick'));
  document.querySelectorAll('.age-content').forEach(content => {
    content.classList.remove('active');
  });
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });

  document.getElementById(contentId).classList.add('active');
  clickedButton.classList.add('active');
}

function playSound(audioElement, volume = 0.5) {
  if (audioElement) {
    audioElement.currentTime = 0; 
    audioElement.volume = volume;
    audioElement.play().catch(error => console.log("Error al reproducir sonido:", error));
  }
}

// Variables globales para los elementos de audio (para que playSound las encuentre)
const sonidoExito = document.getElementById('sonidoExito');
const sonidoClick = document.getElementById('sonidoClick');
const sonidoHover = document.getElementById('sonidoHover');
const hitosPorEdad = JSON.parse(JSON.stringify( // Clon profundo para evitar modificar el original en `DOMContentLoaded`
    {
    "0-6m": {
      descripcionGeneral: "Etapa de reflejos primarios, inicio del control postural y exploración sensorial.",
      hitos: [
        { id: "control_cefalico", nombre: "Control Cefálico (sostener cabeza)", actividadesClave: ["Tiempo boca abajo", "Móviles y sonajeros"], impacto: "Alto" },
        { id: "seguimiento_visual", nombre: "Seguimiento Visual de Objetos", actividadesClave: ["Móviles y sonajeros", "Juegos de manos"], impacto: "Medio" },
        { id: "agarre_reflejo_a_voluntario", nombre: "Agarre (de reflejo a voluntario)", actividadesClave: ["Móviles y sonajeros", "Masajes suaves"], impacto: "Medio" },
        { id: "inicio_rodar", nombre: "Inicio de Giros/Rodar", actividadesClave: ["Tiempo boca abajo", "Masajes suaves"], impacto: "Alto" }
      ],
      actividadesSugeridas: ["Tiempo boca abajo", "Móviles y sonajeros", "Masajes suaves", "Juegos de manos", "Cantar y hablarle"]
    },
    "6-12m": {
      descripcionGeneral: "Gran avance en movilidad (sedestación, gateo) y manipulación fina.",
      hitos: [
        { id: "sedestacion_sin_apoyo", nombre: "Sentarse sin Apoyo", actividadesClave: ["Gateo con obstáculos", "Bloques para apilar"], impacto: "Alto" },
        { id: "gateo", nombre: "Gateo Coordinado", actividadesClave: ["Gateo con obstáculos", "Explorar texturas en suelo"], impacto: "Alto" },
        { id: "pinza_inferior_superior", nombre: "Desarrollo de la Pinza Digital", actividadesClave: ["Bloques para apilar", "Meter/sacar objetos", "Libros de tela"], impacto: "Medio" },
        { id: "ponerse_de_pie_con_apoyo", nombre: "Ponerse de Pie con Apoyo", actividadesClave: ["Gateo con obstáculos"], impacto: "Alto" }
      ],
      actividadesSugeridas: ["Gateo con obstáculos", "Bloques para apilar", "Meter/sacar objetos", "Libros de tela", "Explorar texturas en suelo", "Juegos de 'esconder y encontrar'"]
    },
    "1-2a": {
      descripcionGeneral: "¡La era de los primeros pasos! Aumento de la independencia y exploración del entorno.",
      hitos: [
        { id: "marcha_independiente", nombre: "Caminar de forma Independiente", actividadesClave: ["Caminar por texturas", "Empujar juguetes"], impacto: "Muy Alto" },
        { id: "subir_escalones_gateando", nombre: "Subir Escalones (gateando/con ayuda)", actividadesClave: ["Caminar por texturas"], impacto: "Medio" },
        { id: "lanzar_pelota", nombre: "Lanzar una Pelota (rudimentario)", actividadesClave: ["Empujar juguetes", "Juegos de pelota"], impacto: "Bajo" },
        { id: "torres_cubos", nombre: "Construir Torres (2-4 cubos)", actividadesClave: ["Garabatear", "Encajables simples"], impacto: "Medio" }
      ],
      actividadesSugeridas: ["Caminar por texturas", "Garabatear", "Encajables simples", "Empujar juguetes", "Bailar", "Juegos de pelota", "Juegos de imitación"]
    },
    "2-4a": {
      descripcionGeneral: "Refinamiento de la marcha, inicio de saltos, y mayor destreza fina.",
      hitos: [
        { id: "correr_con_soltura", nombre: "Correr con Mayor Soltura", actividadesClave: ["Correr y saltar", "Triciclo"], impacto: "Alto" },
        { id: "saltar_dos_pies", nombre: "Saltar con Ambos Pies", actividadesClave: ["Correr y saltar", "Circuitos motores simples"], impacto: "Alto" },
        { id: "usar_tijeras_con_ayuda", nombre: "Uso Básico de Tijeras (con supervisión)", actividadesClave: ["Dibujar formas", "Recortar con supervisión"], impacto: "Medio" },
        { id: "pedalear_triciclo", nombre: "Pedalear un Triciclo", actividadesClave: ["Triciclo"], impacto: "Alto" }
      ],
      actividadesSugeridas: ["Correr y saltar", "Triciclo", "Dibujar formas", "Recortar con supervisión", "Plastilina", "Circuitos motores simples"]
    },
    "4-6a": {
      descripcionGeneral: "Mayor coordinación, equilibrio y habilidades motoras finas más complejas.",
      hitos: [
        { id: "saltar_pata_coja", nombre: "Saltar a la Pata Coja", actividadesClave: ["Saltar a la cuerda", "Juegos de equilibrio"], impacto: "Alto" },
        { id: "atrapar_pelota", nombre: "Atrapar una Pelota Mediana", actividadesClave: ["Bicicleta", "Juegos de equilibrio"], impacto: "Medio" },
        { id: "escribir_letras_simples", nombre: "Escribir Algunas Letras/Números", actividadesClave: ["Escribir letras", "Dibujo detallado"], impacto: "Alto" },
        { id: "vestirse_solo", nombre: "Vestirse y Desvestirse Casi Solo", actividadesClave: ["Juegos de mesa"], impacto: "Medio" } 
      ],
      actividadesSugeridas: ["Saltar a la cuerda", "Bicicleta", "Escribir letras", "Juegos de mesa", "Juegos de equilibrio", "Dibujo detallado", "Construcciones complejas"]
    }
  }
));

// Modificación para que showAgeContent reciba el elemento botón directamente
// para evitar usar event.currentTarget que puede no estar definido si se llama de otra forma.
document.querySelectorAll('.age-tabs .tab-button').forEach(button => {
    button.addEventListener('click', function() {
        const contentId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        showAgeContent(contentId, this);
    });
});
