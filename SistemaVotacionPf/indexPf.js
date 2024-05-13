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

encuestas.push(encuestaPredeterminada);

//Function para crear encuesta
function crearEncuesta() {
    let nombreEncuesta = prompt("Ingrese el nombre de la encuesta:");
    let nuevaEncuesta = {
        nombre: nombreEncuesta,
        preguntas: []
    };

    let cantPreguntas;
    while (true) {
        cantPreguntas = parseInt(prompt("Ingrese la cantidad de preguntas para la nueva encuesta:"));
        if (!isNaN(cantPreguntas) && cantPreguntas > 0) {
            break;
        }
        console.log("Ingrese un número válido de preguntas.");
    }

    for (let i = 0; i < cantPreguntas; i++) {
        let pregunta;
        while (true) {
            pregunta = prompt(`Ingrese la pregunta ${i + 1}:`);
            if (pregunta) {
                break;
            }
            console.log("La pregunta no puede estar vacía.");
        }

        let opciones;
        while (true) {
            opciones = prompt("Ingrese las opciones separadas por comas:").split(",");
            if (opciones.length >= 2) {
                break;
            }
            console.log("Debe ingresar al menos dos opciones.");
        }

        nuevaEncuesta.preguntas.push({ pregunta, opciones, votos: Array(opciones.length).fill(0) });
    }

    encuestas.push(nuevaEncuesta);
    console.log("Encuesta creada exitosamente.");
}

// Function para mostrar todas las encuestas.
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
  mostrarEncuestas();
  let encuestaIndex = parseInt(prompt("Ingrese el número de la encuesta en la que desea votar:")) - 1;
  if (isNaN(encuestaIndex) || encuestaIndex < 0 || encuestaIndex >= encuestas.length) {
      console.log("Ingrese un número válido de encuesta.");
      return;
  }
  let encuesta = encuestas[encuestaIndex];
  console.log(`Encuesta: ${encuesta.nombre}`);
  console.log("Seleccione sus respuestas (a, b, c, etc.):");
  encuesta.preguntas.forEach((pregunta, index) => {
      console.log(`Pregunta ${index + 1}: ${pregunta.pregunta}`);
      pregunta.opciones.forEach((opcion, index) => {
          console.log(`   ${String.fromCharCode(97 + index)}. ${opcion}`);
      });
      let voto = prompt("Respuesta:");
      let votoIndex = voto.charCodeAt(0) - 97;
      if (!isNaN(votoIndex) && votoIndex >= 0 && votoIndex < pregunta.opciones.length) {
          pregunta.votos[votoIndex]++;
          console.log("Voto registrado correctamente.");
      } else {
          console.log("Respuesta inválida, voto no registrado.");
      }
  });
}

// Function para mostrar los resultados de una encuesta
function mostrarResultados() {
  if (encuestas.length === 0) {
      console.log("No hay encuestas disponibles para mostrar resultados.");
      return;
  }
  mostrarEncuestas();
  let encuestaIndex = parseInt(prompt("Ingrese el número de la encuesta de la que desea ver los resultados:")) - 1;
  if (isNaN(encuestaIndex) || encuestaIndex < 0 || encuestaIndex >= encuestas.length) {
      console.log("Ingrese un número válido de encuesta.");
      return;
  }
  let encuesta = encuestas[encuestaIndex];
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
  mostrarEncuestas();
  let encuestaIndex = parseInt(prompt("Ingrese el número de la encuesta que desea eliminar:")) - 1;
  if (isNaN(encuestaIndex) || encuestaIndex < 0 || encuestaIndex >= encuestas.length) {
      console.log("Ingrese un número válido de encuesta.");
      return;
  }
  encuestas.splice(encuestaIndex, 1);
  console.log("Encuesta eliminada correctamente.");
}

function main() { // menu principal
    let opcion;
    do {
        console.log("----- Menú -----");
        console.log("1. Crear encuesta");
        console.log("2. Mostrar encuestas");
        console.log("3. Votar en una encuesta");
        console.log("4. Mostrar resultados de una encuesta");
        console.log("5. Eliminar encuesta");
        console.log("6. Salir del programa");

        opcion = parseInt(prompt("Seleccione una opción:"));
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
                console.log("Opción no válida. Por favor, seleccione una opción válida.");
        }
        console.log("<======================================>"); // Define el termino del proceso
    } while (opcion !== 6); //mientras la opcion elegida no sea 6, continua en el menu principal
}

main(); // vuelve al menu principal a menos que la eleccion sea salir del progrma