// Clase Encuesta
class Encuesta {
    constructor(pregunta, opciones) {
      this.pregunta = pregunta.toLowerCase();
      this.opciones = opciones.map(opcion => opcion.trim());
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
  
  // Clase EncuestaManager
  class EncuestaManager {
    constructor() {
      this.encuestas = {};
    }
  
    crearEncuesta(pregunta, opciones) {
      pregunta = pregunta.toLowerCase();
      if (!this.encuestas[pregunta]) {
        const nuevaEncuesta = new Encuesta(pregunta, opciones.split(','));
        this.encuestas[pregunta] = nuevaEncuesta;
        console.log(`Encuesta "${pregunta}" creada con éxito.`);
        this.mostrarEncuesta(nuevaEncuesta);
        // Limpiar campos de entrada
        document.getElementById('pregunta').value = '';
        document.getElementById('opciones').value = '';
      } else {
        console.log(`La encuesta "${pregunta}" ya existe.`);
      }
    }
  
    mostrarEncuesta(encuesta) {
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
        botonVoto.onclick = () => this.votarEnEncuesta(encuesta.pregunta, index);
        opcionesDiv.appendChild(botonVoto);
      });
    
      encuestaHTML.appendChild(opcionesDiv);
    
      document.getElementById("encuestas").appendChild(encuestaHTML);
    }
  
    votarEnEncuesta(pregunta, opcionIndex) {
      pregunta = pregunta.toLowerCase();
      const encuesta = this.encuestas[pregunta];
      if (encuesta) {
        encuesta.votar(opcionIndex);
        this.mostrarResultadosEncuestas(); // Mostrar los resultados después de votar
      } else {
        console.log("La encuesta especificada no existe.");
      }
    }
  
    mostrarResultadosEncuestas() {
      console.log("Resultados de todas las encuestas:");
      for (const pregunta in this.encuestas) {
        const encuesta = this.encuestas[pregunta];
        encuesta.mostrarResultados();
      }
      console.log("----------------------------------");
    }
  }
  
  // Instancia de EncuestaManager
  const encuestaManager = new EncuestaManager();
  
  // Evento click para crear una encuesta
  document.getElementById("crear-encuesta").addEventListener("click", () => {
    const pregunta = document.getElementById('pregunta').value;
    const opciones = document.getElementById('opciones').value;
    encuestaManager.crearEncuesta(pregunta, opciones);
  });