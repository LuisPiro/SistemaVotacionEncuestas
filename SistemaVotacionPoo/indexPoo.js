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
      this.encuestaPredeterminada = new Encuesta("Encuesta Random");
      this.encuestaPredeterminada.agregarPregunta("Cual es tu genero musical favorito?", ["salsa", "metal", "cumbia", "tango"]);
      this.encuestaPredeterminada.agregarPregunta("Cual es tu helado favorito?", ["Vainilla", "Frutilla", "Chocolate", "Mora"]);
      this.encuestaPredeterminada.agregarPregunta("A donde irias si mañana es el fin del mundo?", ["Playa", "Bosque", "Montaña", "Casa"]);
      this.encuestaPredeterminada.agregarPregunta("Tu serie de anime favorita es?", ["Naruto", "Pokemon", "Zoids", "Dragon Ball Z"]);
      this.encuestaPredeterminada.agregarPregunta("Que marca de vehiculos es tu preferida?", ["Chevrolet", "Mazda", "Nissan", "Ford"]);
      this.encuestaPredeterminada.agregarPregunta("En que medio de transporte te gusta viajar?", ["Avion", "Tren", "Bus", "Vehiculo propio"]);
      this.encuestaPredeterminada.agregarPregunta("Cual es tu marca de motocicleta favorita?", ["Honda", "Yamaha", "Kawasaki", "Pulsar"]);
      this.encuestaPredeterminada.agregarPregunta("Cual es tu animal favorito?", ["Perro", "Gato", "León", "Oso"]);

      this.encuestas.push(this.encuestaPredeterminada);
  }

  crearEncuesta() {
      let nombreEncuesta = prompt("Ingrese el nombre de la encuesta:");
      let nuevaEncuesta = new Encuesta(nombreEncuesta);

      let cantPreguntas;
      while (true) {
          cantPreguntas = parseInt(prompt("Ingrese la cantidad de preguntas para la nueva encuesta:"));
          if (!isNaN(cantPreguntas) && cantPreguntas > 0) {
              break;
          }
          console.log("Ingrese un numero valido de preguntas.");
      }

      for (let i = 0; i < cantPreguntas; i++) {
          let pregunta;
          while (true) {
              pregunta = prompt(`Ingrese la pregunta ${i + 1}:`);
              if (pregunta) {
                  break;
              }
              console.log("La pregunta no puede estar vacia.");
          }

          let opciones;
          while (true) {
              opciones = prompt("Ingrese las opciones separadas por comas:").split(",");
              if (opciones.length >= 2) {
                  break;
              }
              console.log("Debe ingresar al menos dos opciones.");
          }

          nuevaEncuesta.agregarPregunta(pregunta, opciones);
      }

      this.encuestas.push(nuevaEncuesta);
      console.log("Encuesta creada exitosamente.");
  }

  mostrarEncuestas() {
      if (this.encuestas.length === 0) {
          console.log("No hay encuestas disponibles.");
      } else {
          console.log("Encuestas disponibles:");
          this.encuestas.forEach((encuesta, index) => {
              console.log(`${index + 1}. ${encuesta.nombre}`);
          });
      }
  }

  votarEncuesta() {
      if (this.encuestas.length === 0) {
          console.log("No hay encuestas disponibles para votar.");
          return;
      }
      this.mostrarEncuestas();
      let encuestaIndex;
      while (true) {
          encuestaIndex = parseInt(prompt("Ingrese el número de la encuesta en la que desea votar:")) - 1;
          if (!isNaN(encuestaIndex) && encuestaIndex >= 0 && encuestaIndex < this.encuestas.length) {
              break;
          } else {
              console.log("Ingrese un numero valido de encuesta.");
          }
      }
      let encuesta = this.encuestas[encuestaIndex];
      console.log(`Encuesta: ${encuesta.nombre}`);
      console.log("Seleccione sus respuestas (a, b, c, etc.):");
      encuesta.preguntas.forEach((pregunta, index) => {
          console.log(`Pregunta ${index + 1}: ${pregunta.pregunta}`);
          pregunta.opciones.forEach((opcion, index) => {
              console.log(`   ${String.fromCharCode(97 + index)}. ${opcion}`);
          });
          let voto;
          let votoIndex;
          while (true) {
              voto = prompt("Respuesta:");
              voto = voto.toLowerCase(); // Convertir la respuesta a minúsculas
              votoIndex = voto.charCodeAt(0) - 97;
              if (!isNaN(votoIndex) && votoIndex >= 0 && votoIndex < pregunta.opciones.length) {
                  pregunta.votos[votoIndex]++;
                  console.log("Voto registrado correctamente.");
                  break;
              } else {
                  console.log("Respuesta invalida, por favor seleccione una opcion valida.");
              }
          }
      });
  }

  mostrarResultados() {
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

  eliminarEncuesta() {
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
menu.iniciar();