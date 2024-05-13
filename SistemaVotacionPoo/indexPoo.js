// se crea la clase Encuesta
class Encuesta {
  constructor(nombre) {
      this.nombre = nombre;
      this.preguntas = [];
  }

  agregarPregunta(pregunta, opciones) {
      this.preguntas.push({ pregunta, opciones, votos: Array(opciones.length).fill(0) });
  }
}

class Menu {
  constructor() {
      this.encuestas = [];
      this.encuestaPredeterminada = new Encuesta("Encuesta Random"); // Creando encuesta predeterminada.
      this.encuestaPredeterminada.agregarPregunta("Cual es tu genero musical favorito?", ["salsa", "metal", "cumbia", "tango"]);
      this.encuestaPredeterminada.agregarPregunta("Cual es tu helado favorito?", ["Vainilla", "Frutilla", "Chocolate", "Mora"]);
      this.encuestaPredeterminada.agregarPregunta("A donde irias si mañana es el fin del mundo?", ["Playa", "Bosque", "Montaña", "Casa"]);
      this.encuestaPredeterminada.agregarPregunta("Tu serie de anime favorita es?", ["Naruto", "Pokemon", "Zoids", "Dragon Ball Z"]);
      this.encuestaPredeterminada.agregarPregunta("Que marca de vehiculos es tu preferida?", ["Chevrolet", "Mazda", "Nissan", "Ford"]);
      this.encuestaPredeterminada.agregarPregunta("En que medio de transporte te gusta viajar?", ["Avion", "Tren", "Bus", "Vehiculo propio"]);
      this.encuestaPredeterminada.agregarPregunta("Cual es tu marca de motocicleta favorita?", ["Honda", "Yamaha", "Kawasaki", "Pulsar"]);
      this.encuestaPredeterminada.agregarPregunta("Cual es tu animal favorito?", ["Perro", "Gato", "León", "Oso"]);

      this.encuestas.push(this.encuestaPredeterminada); // Subiendo encuesta predeterminada.
  }

  crearEncuesta() { // Metodo para crear encuesta.
      let nombreEncuesta = prompt("Ingrese el nombre de la encuesta:");
      let nuevaEncuesta = new Encuesta(nombreEncuesta);

      let cantPreguntas; // Para ingresar la cantidad de preguntas.
      while (true) {
          cantPreguntas = parseInt(prompt("Ingrese la cantidad de preguntas para la nueva encuesta:"));
          if (!isNaN(cantPreguntas) && cantPreguntas > 0) {
              break;
          }
          console.log("Ingrese un numero valido de preguntas.");
      }

      for (let i = 0; i < cantPreguntas; i++) {
          let pregunta; // Para ingresar cada pregunta
          while (true) {
              pregunta = prompt(`Ingrese la pregunta ${i + 1}:`);
              if (pregunta) {
                  break;
              }
              console.log("La pregunta no puede estar vacia.");
          }

          let opciones; // Para ingresar las opciones de cada pregunta.
          while (true) {
              opciones = prompt("Ingrese las opciones separadas por comas:").split(",");
              if (opciones.length >= 2) {
                  break;
              }
              console.log("Debe ingresar al menos dos opciones.");
          }

          nuevaEncuesta.agregarPregunta(pregunta, opciones); // Se guardan las preguntas y opciones de la nueva encuesta
      }

      this.encuestas.push(nuevaEncuesta); // Se sube la nueva encuesta.
      console.log("Encuesta creada exitosamente.");
  }

  mostrarEncuestas() { // Metodo para mostrar las encuestas disponibles.
      if (this.encuestas.length === 0) {
          console.log("No hay encuestas disponibles.");
      } else {
          console.log("Encuestas disponibles:");
          this.encuestas.forEach((encuesta, index) => {
              console.log(`${index + 1}. ${encuesta.nombre}`);
          });
      }
  }

  votarEncuesta() { // Metodo para votar en la encuesta que tu elijas votar.
      if (this.encuestas.length === 0) {
          console.log("No hay encuestas disponibles para votar.");
          return;
      }
      this.mostrarEncuestas(); // Te muestra las encuestas y tu eliges una para votar.
      let encuestaIndex;
      while (true) {
          encuestaIndex = parseInt(prompt("Ingrese el número de la encuesta en la que desea votar:")) - 1;
          if (!isNaN(encuestaIndex) && encuestaIndex >= 0 && encuestaIndex < this.encuestas.length) {
              break;
          } else { // Si no eliges un numero valido de encuestas disponibles.
              console.log("Ingrese un numero valido de encuesta.");
          }
      }
      let encuesta = this.encuestas[encuestaIndex];
      console.log(`Encuesta: ${encuesta.nombre}`);
      console.log("Seleccione sus respuestas (a, b, c, etc.):");
      encuesta.preguntas.forEach((pregunta, index) => {
          console.log(`Pregunta ${index + 1}: ${pregunta.pregunta}`);
          pregunta.opciones.forEach((opcion, index) => {
              console.log(`   ${String.fromCharCode(97 + index)}. ${opcion}`); // 97 es el valor de codigo unicode para la letra "a" de opciones.
          });
          let voto;
          let votoIndex;
          while (true) {
              voto = prompt("Respuesta:");
              voto = voto.toLowerCase(); // Convertir la respuesta a minusculas
              votoIndex = voto.charCodeAt(0) - 97; // 97 es el valor de codigo unicode para la letra "a" de opciones.
              if (!isNaN(votoIndex) && votoIndex >= 0 && votoIndex < pregunta.opciones.length) {
                  pregunta.votos[votoIndex]++; // Suma uno mas a la opcion que votaste.
                  console.log("Voto registrado correctamente.");
                  break;
              } else {
                  console.log("Respuesta invalida, por favor seleccione una opcion valida.");
              }
          }
      });
  }

  mostrarResultados() { // Muestra los votos que lleva la encuesta que tu elijas si esta disponible.
      if (this.encuestas.length === 0) {
          console.log("No hay encuestas disponibles para mostrar resultados.");
          return;
      }
      this.mostrarEncuestas();
      let encuestaIndex;
      while (true) {
          encuestaIndex = parseInt(prompt("Ingrese el numero de la encuesta de la que desea ver los resultados:")) - 1;
          if (!isNaN(encuestaIndex) && encuestaIndex >= 0 && encuestaIndex < this.encuestas.length) {
              break;
          } else {
              console.log("Ingrese un numero valido de encuesta.");
          }
      }
      let encuesta = this.encuestas[encuestaIndex];
      console.log(`Resultados de la encuesta "${encuesta.nombre}":`);
      encuesta.preguntas.forEach((pregunta, index) => {
          console.log(`Pregunta ${index + 1}: ${pregunta.pregunta}`);
          pregunta.opciones.forEach((opcion, index) => {
              console.log(`   ${opcion}: ${pregunta.votos[index]} voto(s)`);
          });
          console.log("\n");
      });
  }

  eliminarEncuesta() { // Elimina la encuesta que tu elijas, siempre que sea un numero valido.
      if (this.encuestas.length === 0) {
          console.log("No hay encuestas disponibles para eliminar.");
          return;
      }
      this.mostrarEncuestas();
      let encuestaIndex;
      while (true) {
          encuestaIndex = parseInt(prompt("Ingrese el numero de la encuesta que desea eliminar:")) - 1;
          if (!isNaN(encuestaIndex) && encuestaIndex >= 0 && encuestaIndex < this.encuestas.length) {
              break;
          } else {
              console.log("Ingrese un numero valido de encuesta.");
          }
      }
      this.encuestas.splice(encuestaIndex, 1);
      console.log("Encuesta eliminada correctamente.");
  }

  iniciar() {
      let opcion;
      do {
          console.log("----- Menu -----");
          console.log("1. Crear encuesta");
          console.log("2. Mostrar encuestas");
          console.log("3. Votar en una encuesta");
          console.log("4. Mostrar resultados de una encuesta");
          console.log("5. Eliminar encuesta");
          console.log("6. Salir del programa");

          opcion = parseInt(prompt("Seleccione una opcion del menu:"));
          switch (opcion) {
              case 1:
                  this.crearEncuesta();
                  break;
              case 2:
                  this.mostrarEncuestas();
                  break;
              case 3:
                  this.votarEncuesta();
                  break;
              case 4:
                  this.mostrarResultados();
                  break;
              case 5:
                  this.eliminarEncuesta();
                  break;
              case 6:
                  console.log("Saliendo del programa...");
                  break;
              default:
                  console.log("Opcion no valida. Por favor, seleccione una opcion valida.");
          }
          console.log("<======================================>"); // Define el termino del proceso
      } while (opcion !== 6); // mientras la opcion elegida no sea 6, continua en el menu principal
  }
}

let menu = new Menu();
menu.iniciar(); // Para ejecutar el programa si saliste de el.