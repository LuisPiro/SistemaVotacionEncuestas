class Encuesta {
  constructor(pregunta, opciones) {
    this.pregunta = pregunta;
    this.opciones = opciones;
    this.votos = new Array(opciones.length).fill(0);
  }

  votar(opcionIndex) {
    if (opcionIndex >= 0 && opcionIndex < this.opciones.length) {
      this.votos[opcionIndex]++;
    } else {
      console.log("Opción inválida.");
    }
  }

  mostrarResultados() {
    console.log("Resultados de la encuesta: ", this.pregunta);
    this.opciones.forEach((opcion, index) => {
      console.log(`${opcion}: ${this.votos[index]} voto(s)`);
    });
    console.log("----------------------------------");
  }

  mostrarOpciones() {
    console.log("Opciones de la encuesta:", this.pregunta);
    this.opciones.forEach((opcion, index) => {
      console.log(`${index}: ${opcion}`);
    });
    console.log("----------------------------------");
  }
}

const encuestas = {};

const crearEncuesta = (pregunta, opciones) => {
  pregunta = pregunta.toLowerCase();
  if (!encuestas[pregunta]) {
    const nuevaEncuesta = new Encuesta(pregunta, opciones.split(',').map(opcion => opcion.trim()));
    encuestas[pregunta] = nuevaEncuesta;
    console.log(`Encuesta "${pregunta}" creada con éxito.`);
    mostrarEncuesta(nuevaEncuesta);
    // Restablecer los campos de entrada a blanco
    document.getElementById('pregunta').value = '';
    document.getElementById('opciones').value = '';
  } else {
    console.log(`La encuesta "${pregunta}" ya existe.`);
  }
};

const mostrarEncuesta = (encuesta) => {
  const encuestaHTML = document.createElement("div");
  encuestaHTML.className = "encuesta";
  
  const pregunta = document.createElement("h3");
  pregunta.textContent = encuesta.pregunta;
  encuestaHTML.appendChild(pregunta);
  
  const opcionesDiv = document.createElement("div");
  opcionesDiv.className = "opciones";
  
  encuesta.opciones.forEach((opcion, index) => {
    const botonVoto = document.createElement("button");
    botonVoto.textContent = opcion;
    botonVoto.onclick = () => votarEnEncuesta(encuesta.pregunta, index);
    opcionesDiv.appendChild(botonVoto);
  });
  
  encuestaHTML.appendChild(opcionesDiv);
  
  document.getElementById("encuestas").appendChild(encuestaHTML);
};

const mostrarEncuestas = () => {
  console.log("Encuestas existentes:");
  for (const pregunta in encuestas) {
    console.log("- " + pregunta);
  }
  console.log("----------------------------------");
};

const mostrarOpcionesEncuesta = (pregunta) => {
  pregunta = pregunta.toLowerCase();
  const encuesta = encuestas[pregunta];
  if (encuesta) {
    encuesta.mostrarOpciones();
  } else {
    console.log("La encuesta especificada no existe.");
  }
};

const votarEnEncuesta = (pregunta, opcionIndex) => {
  pregunta = pregunta.toLowerCase();
  const encuesta = encuestas[pregunta];
  if (encuesta) {
    encuesta.votar(opcionIndex);
    encuesta.mostrarResultados(); // Mostrar los resultados después de votar
  } else {
    console.log("La encuesta especificada no existe.");
  }
};

const mostrarResultadosEncuestas = () => {
  console.log("Resultados de todas las encuestas:");
  for (const pregunta in encuestas) {
    const encuesta = encuestas[pregunta];
    encuesta.mostrarResultados();
  }
  console.log("----------------------------------");
};

mostrarEncuestas();
setInterval(mostrarResultadosEncuestas, 20000);