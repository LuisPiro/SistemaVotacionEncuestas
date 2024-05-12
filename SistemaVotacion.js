// Clase Encuesta para representar una encuesta
class Encuesta {
    constructor(pregunta, opciones) {
      this.pregunta = pregunta;
      this.opciones = opciones;
      this.votos = new Array(opciones.length).fill(0); // Inicializar el array de votos con ceros
    }
  
    // Método para votar por una opción
    votar(opcionIndex) {
      if (opcionIndex >= 0 && opcionIndex < this.opciones.length) {
        this.votos[opcionIndex]++;
        this.mostrarResultados();
      } else {
        console.log("Opción inválida.");
      }
    }
  
    // Método para mostrar los resultados de la encuesta
    mostrarResultados() {
      console.log("Resultados de la encuesta: ", this.pregunta);
      this.opciones.forEach((opcion, index) => {
        console.log(`${opcion}: ${this.votos[index]} voto(s)`);
      });
      console.log("----------------------------------");
    }
  
    // Método para mostrar las opciones de la encuesta
    mostrarOpciones() {
      console.log("Opciones de la encuesta:", this.pregunta);
      this.opciones.forEach((opcion, index) => {
        console.log(`${index}: ${opcion}`); //
      });
      console.log("----------------------------------");
    }
  }
  
  // Objeto para almacenar las encuestas
  const encuestas = {};
  
  // Función para crear una nueva encuesta
  function crearEncuesta(pregunta, opciones) {
    pregunta = pregunta.toLowerCase(); // Convertir la pregunta a minúsculas
  
    if (!encuestas[pregunta]) {
      const nuevaEncuesta = new Encuesta(pregunta, opciones);
      encuestas[pregunta] = nuevaEncuesta;
      console.log(`Encuesta "${pregunta}" creada con éxito.`);
    } else {
      console.log(`La encuesta "${pregunta}" ya existe.`);
    }
  }
  
  // Función para mostrar todas las encuestas existentes
  function mostrarEncuestas() {
    console.log("Encuestas existentes:");
    for (const pregunta in encuestas) {
      console.log("- " + pregunta);
    }
    console.log("----------------------------------");
  }

  // Función para mostrar las opciones de una encuesta específica
  function mostrarOpcionesEncuesta(pregunta) {
    pregunta = pregunta.toLowerCase();
    const encuesta = encuestas[pregunta];
    if (encuesta) {
      encuesta.mostrarOpciones();
    } else {
      console.log("La encuesta especificada no existe.");
    }
  }

  // Función para votar en una encuesta
  function votarEnEncuesta(pregunta, opcionIndex) {
    pregunta = pregunta.toLowerCase();
    const encuesta = encuestas[pregunta];
    if (encuesta) {
      encuesta.votar(opcionIndex);
    } else {
      console.log("La encuesta especificada no existe.");
    }
  }

  // Función para mostrar los resultados de todas las encuestas existentes
  function mostrarResultadosEncuestas() {
    console.log("Resultados de todas las encuestas:");
    for (const pregunta in encuestas) {
      const encuesta = encuestas[pregunta];
      encuesta.mostrarResultados();
    }
    console.log("----------------------------------");
  }

  // Mostrar todas las encuestas existentes
  mostrarEncuestas();

  // Mostrar los resultados de todas las encuestas cada 5 segundos (5000 milisegundos)
  setInterval(mostrarResultadosEncuestas, 20000);