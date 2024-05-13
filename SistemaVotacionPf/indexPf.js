let encuestas = []; // Array para almacenar multiples encuestas

// Encuesta "demo" con 8 preguntas y 4 opciones para votar en cada pregunta
let encuestaPredeterminada = {
    nombre: "Encuesta Random",
    preguntas: [
        { pregunta: "Cual es tu genero musical favorito?", opciones: ["salsa", "metal", "cumbia", "tango"], votos: [0, 0, 0, 0] },
        { pregunta: "Cual es tu helado favorito?", opciones: ["Vainilla", "Frutilla", "Chocolate", "Mora"], votos: [0, 0, 0, 0] },
        { pregunta: "A donde irias si maniana es el fin del mundo?", opciones: ["Playa", "Bosque", "Montania", "Casa"], votos: [0, 0, 0, 0] },
        { pregunta: "Tu serie de anime favorita es?", opciones: ["Naruto", "Pokemon", "Zoids", "Dragon Ball Z"], votos: [0, 0, 0, 0] },
        { pregunta: "Que marca de vehiculos es tu preferida?", opciones: ["Chovrolet", "Mazda", "Nissan", "Ford"], votos: [0, 0, 0, 0] },
        { pregunta: "En que medio de transporte te gusta viajar?", opciones: ["Avion", "Tren", "Bus", "Vehiculo propio"], votos: [0, 0, 0, 0] },
        { pregunta: "Cual es tu marca de motocicleta favorita?", opciones: ["Honda", "Yamaha", "Kawasaki", "Pulsar"], votos: [0, 0, 0, 0] },
        { pregunta: "Cual es tu animal favorito?", opciones: ["Perro", "Gato", "Leon", "Oso"], votos: [0, 0, 0, 0] }
    ]
};

encuestas.push(encuestaPredeterminada); // Subir la encuesta predeterminada.

//Function para crear encuesta
function crearEncuesta() { // Crear una nueva encuesta desde 0.
    let nombreEncuesta = prompt("Ingrese el nombre de la encuesta:");
    let nuevaEncuesta = { // Almacena la encuesta con su nombre y las preguntas.
        nombre: nombreEncuesta,
        preguntas: []
    };

    let cantPreguntas; // Para ingresar la cantidad de preguntas que tiene tu nueva encuesta.
    while (true) {
        cantPreguntas = parseInt(prompt("Ingrese la cantidad de preguntas para la nueva encuesta:"));
        if (!isNaN(cantPreguntas) && cantPreguntas > 0) {
            break;
        }
        console.log("Ingrese un numero valido de preguntas.");
    }

    for (let i = 0; i < cantPreguntas; i++) {
        let pregunta; // Ingresar cada pregunta.
        while (true) {
            pregunta = prompt(`Ingrese la pregunta ${i + 1}:`);
            if (pregunta) {
                break;
            }
            console.log("La pregunta no puede estar vacía.");
        }

        let opciones; // Ingresar las opciones para cada pregunta.
        while (true) {
            opciones = prompt("Ingrese las opciones separadas por comas:").split(",");
            if (opciones.length >= 2) { // No pueden ser menos de 2 opciones.
                break;
            }
            console.log("Debe ingresar al menos dos opciones.");
        }

        nuevaEncuesta.preguntas.push({ pregunta, opciones, votos: Array(opciones.length).fill(0) }); // Subir los datos de la nueva encuesta.
    }

    encuestas.push(nuevaEncuesta); // Subir la encuesta completa.
    console.log("Encuesta creada exitosamente.");
}

// Function para mostrar todas las encuestas, siempre que hayan encuestas disponibles.
function mostrarEncuestas() {
  if (encuestas.length === 0) {
      console.log("No hay encuestas disponibles.");
  } else {
      console.log("Encuestas disponibles:");
      encuestas.forEach((encuesta, index) => {
          console.log(`${index + 1}. ${encuesta.nombre}`);
      });
  }
}

// Function para permitir votar en una encuesta
function votarEncuesta() {
  if (encuestas.length === 0) {
      console.log("No hay encuestas disponibles para votar.");
      return;
  }
  mostrarEncuestas(); // Te muestra las encuestas disponibles para elegir en cual quieres votar.
  let encuestaIndex = parseInt(prompt("Ingrese el numero de la encuesta en la que desea votar:")) - 1;
  if (isNaN(encuestaIndex) || encuestaIndex < 0 || encuestaIndex >= encuestas.length) {
      console.log("Ingrese un numero valido de encuesta.");
      return;
  }
  let encuesta = encuestas[encuestaIndex]; // muestra la encuesta que eliges y las opciones para votar en cada pregunta.
  console.log(`Encuesta: ${encuesta.nombre}`);
  console.log("Seleccione sus respuestas (a, b, c, etc.):");
  encuesta.preguntas.forEach((pregunta, index) => {
      console.log(`Pregunta ${index + 1}: ${pregunta.pregunta}`);
      pregunta.opciones.forEach((opcion, index) => {
          console.log(`   ${String.fromCharCode(97 + index)}. ${opcion}`); // 97 es el valor de codigo unicode para la letra "a".
      });
      let voto = prompt("Respuesta:");
      let votoIndex = voto.charCodeAt(0) - 97; // 97 es el valor de codigo unicode para la letra "a".
      if (!isNaN(votoIndex) && votoIndex >= 0 && votoIndex < pregunta.opciones.length) {
          pregunta.votos[votoIndex]++; // Registra tu voto agregando 1 a la opcion elegida.
          console.log("Voto registrado correctamente.");
      } else {
          console.log("Respuesta invalida, voto no registrado.");
      }
  });
}

// Function para mostrar los resultados de una encuesta
function mostrarResultados() {
  if (encuestas.length === 0) {
      console.log("No hay encuestas disponibles para mostrar resultados.");
      return;
  }
  mostrarEncuestas(); // Te muestra todas las encuestas para que elijas de cual quieres sus resultados.
  let encuestaIndex = parseInt(prompt("Ingrese el numero de la encuesta de la que desea ver los resultados:")) - 1;
  if (isNaN(encuestaIndex) || encuestaIndex < 0 || encuestaIndex >= encuestas.length) {
      console.log("Ingrese un numero valido de encuesta.");
      return;
  }
  let encuesta = encuestas[encuestaIndex]; // Encuentra la encuesta y te muestra los resultados.
  console.log(`Resultados de la encuesta "${encuesta.nombre}":`);
  encuesta.preguntas.forEach((pregunta, index) => {
      console.log(`Pregunta ${index + 1}: ${pregunta.pregunta}`);
      pregunta.opciones.forEach((opcion, index) => {
          console.log(`   ${opcion}: ${pregunta.votos[index]} voto(s)`);
      });
      console.log("\n");
  });
}

// Function para eliminar una encuesta
function eliminarEncuesta() {
  if (encuestas.length === 0) {
      console.log("No hay encuestas disponibles para eliminar.");
      return;
  }
  mostrarEncuestas(); // Te muestra las encuestas disponibles para que elijas cual quieres eliminar.
  let encuestaIndex = parseInt(prompt("Ingrese el numero de la encuesta que desea eliminar:")) - 1;
  if (isNaN(encuestaIndex) || encuestaIndex < 0 || encuestaIndex >= encuestas.length) {
      console.log("Ingrese un numero valido de encuesta.");
      return;
  }
  encuestas.splice(encuestaIndex, 1); // Elimina la encuesta que elegiste del array.
  console.log("Encuesta eliminada correctamente.");
}

function main() { // menu principal
    let opcion;
    do {
        console.log("----- Menu -----");
        console.log("1. Crear encuesta");
        console.log("2. Mostrar encuestas");
        console.log("3. Votar en una encuesta");
        console.log("4. Mostrar resultados de una encuesta");
        console.log("5. Eliminar encuesta");
        console.log("6. Salir del programa");

        opcion = parseInt(prompt("Seleccione una opcion:"));
        switch (opcion) {
            case 1:
                crearEncuesta();
                break;
            case 2:
                mostrarEncuestas();
                break;
            case 3:
                votarEncuesta();
                break;
            case 4:
                mostrarResultados();
                break;
            case 5:
                eliminarEncuesta();
                break;
            case 6:
                console.log("Saliendo del programa...");
                break;
            default:
                console.log("Opcion no valida. Por favor, seleccione una opcion valida.");
        }
        console.log("<======================================>"); // Define el termino del proceso
    } while (opcion !== 6); //mientras la opcion elegida no sea 6, continua en el menu principal
}

main(); // vuelve al menu principal a menos que la eleccion sea salir del programa