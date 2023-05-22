//algoritmo
const procesos = [
  { proceso: "p1", tl: 0, tr: 8 },
  { proceso: "p2", tl: 3, tr: 4 },
  { proceso: "p3", tl: 6, tr: 2 },
  { proceso: "p4", tl: 10, tr: 3 },
  { proceso: "p5", tl: 15, tr: 6 },
];

var orden = [];
// Calcula tiempo total
const tiempoTotal = procesos.reduce((total, proceso) => total + proceso.tr, 0);

function SRTF(procesos = []) {
  let tiempoActual = 0;
  let resultado = [];
  let procesoAnterior = null; // Almcena el proceso anteriormente ejecutado

  while (procesos.length > 0) {
    // Añade a la cola procesos que ya hayan llegado
    let colaDeProcesos = procesos.filter(
      (proceso) => proceso.tl <= tiempoActual
    );

    if (colaDeProcesos.length > 0) {
        //verifica que el proceso actual es menor al entrante
      let procesoActual = colaDeProcesos.reduce((anterior, actual) =>
        actual.tr < anterior.tr ? actual : anterior
      );

      // Verifica si el proceso actual es diferente al proceso anterior
      if (procesoActual !== procesoAnterior) {
        resultado.push({
          p: procesoActual.proceso,
          tiempoLlegada: tiempoActual,
        }); // Agrega el proceso al arreglo resultado
        orden.push({ p: procesoActual.proceso }); // Agrega el proceso al arreglo orden
        procesoAnterior = procesoActual; // Actualiza el proceso anterior con el proceso actual
      }

      procesoActual.tr--; // Reudicemos tr = tiempo restant

      if (procesoActual.tr === 0) {
        // Si se acabo el tr lo podemos sacar de la cola de procesos
        procesos.splice(procesos.indexOf(procesoActual), 1);
      }
    }

    tiempoActual++;
    // console.log(tiempoActual);
  }

  console.log("Resultado de la planificación SRTF:", resultado);
  console.log("Tiempo total:", tiempoTotal);
}

SRTF(procesos);
const soloProcesos = orden.map((objeto) => objeto.p);
const procesosAntes = procesos.map((objeto) => objeto.p);

//impresion resultados

// Obtener el contenedor de los elementos gantt
const contenedorGantt = document.querySelector(".gantt");

// Obtener los elementos con la clase "gantt-bar"
const barrasGantt = Array.from(document.querySelectorAll(".gantt-bar"));

// Variable para realizar un seguimiento del índice del elemento actual
let indiceElemento = 0;

// Función para mostrar el siguiente elemento
function mostrarSiguienteElemento() {
  if (indiceElemento < barrasGantt.length) {
    const elementoActual = barrasGantt[indiceElemento];
      elementoActual.style.display = "block";
    document.getElementById("paso").innerHTML = indiceElemento;
    indiceElemento++;
  } else {
    alert("¡Todos los elementos han sido mostrados!");
    botonActualizar.disabled = true;
  }
  switch (indiceElemento) {
    case 0:
      document.getElementById("P1").innerHTML = soloProcesos[indiceElemento];
      document.getElementById("exp1").innerHTML = soloProcesos[indiceElemento]
      
      break;
    case 1:
      document.getElementById("P2").innerHTML = soloProcesos[indiceElemento];
      break;
    case 2:
      document.getElementById("P3").innerHTML = soloProcesos[indiceElemento];
      break;
    case 3:
      document.getElementById("P4").innerHTML = soloProcesos[indiceElemento];
      break;
    case 4:
      document.getElementById("P5").innerHTML = soloProcesos[indiceElemento];
      break;
    case 5:
      document.getElementById("P6").innerHTML = soloProcesos[indiceElemento];
      break;
    case 6:
      document.getElementById("P7").innerHTML = soloProcesos[indiceElemento];
      break;
  }
  
}

// Obtener el botón
const botonActualizar = document.getElementById("boton-actualizar");

// Agregar un event listener al botón para llamar a la función cuando se presione
botonActualizar.addEventListener("click", mostrarSiguienteElemento);
