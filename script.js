/*
INTEGRANTES:
ROGER ALEJANDRO PACHECO YAMA
JAFET ANDREE MENA SOLÍS
JUAN ENRIQUE AYALA GASPAR
GASPAR ALONSO CARDOS UC
*/ 

// Agoritmo SRTF
// Crea arreglo con los proceos y timepos iniciales
const procesos = [
  { proceso: "p1", tl: 0, tr: 8 },
  { proceso: "p2", tl: 3, tr: 4 },
  { proceso: "p3", tl: 6, tr: 2 },
  { proceso: "p4", tl: 10, tr: 3 },
  { proceso: "p5", tl: 15, tr: 6 },
];

const procesosAntes = procesos.map((objeto) => objeto.proceso);
const segundosLlega = procesos.map((proceso) => proceso.tl.toString());

var orden = [];
var tiempoActual = 0;

// Calcula tiempo total
const tiempoTotal = procesos.reduce((total, proceso) => total + proceso.tr, 0);
let resultado = [];

// Funcion que recibe como parametro un arreglo para aplicarle el algoritmo
function SRTF(procesos = []) {
  let procesoAnterior = null; // Almcena el proceso anteriormente ejecutado

  while (procesos.length > 0) {
    // Añade a la cola procesos que ya hayan llegado
    let colaDeProcesos = procesos.filter(
      (proceso) => proceso.tl <= tiempoActual
    );

    if (colaDeProcesos.length > 0) {
      // Verifica que el proceso actual es menor al entrante
      let procesoActual = colaDeProcesos.reduce((anterior, actual) =>
        actual.tr < anterior.tr ? actual : anterior
      );

      // Verifica si el proceso actual es diferente al proceso anterior
      if (procesoActual !== procesoAnterior) {
        let tiempoEspera = 0;

        if (procesoActual.tl == 0) {
          tiempoEspera += tiempoActual - 3;
        } else {
          tiempoEspera += tiempoActual - procesoActual.tl + 0.2;
        }

        resultado.push({
          p: procesoActual.proceso,
          tiempoLlegada: tiempoActual,
          tiempoEspera,
        }); // Agrega el proceso al arreglo resultado
        orden.push({ p: procesoActual.proceso }); // Agrega el proceso al arreglo orden
        procesoAnterior = procesoActual; // Actualiza el proceso anterior con el proceso actual
      }

      procesoActual.tr--; // tr = tiempo restant

      if (procesoActual.tr === 0) {
        // Si se acabo el tr lo podemos sacar de la cola de procesos
        procesos.splice(procesos.indexOf(procesoActual), 1);
      }
    }

    tiempoActual++;
    // prueba para verificar tiempo actual console.log(tiempoActual);
  }
  // Imprimir por consola los resultados, como una prueba
  console.log("Resultado de la planificación SRTF:", resultado);
  console.log("Tiempo total:", tiempoTotal);

  resultado.splice(0, 1); // Elimina la posición 1
  resultado.splice(2, 1); // Elimina la posición 3
}

// Ejecutamos la funcion pasandole el arreglo de procesos inicial
SRTF(procesos);

// Preparamos los resultados para imprimirlos en HTML
const tiemposDeEspera = resultado.map((objeto) => objeto.tiempoEspera); // Array con tiempos de espera
console.log(tiemposDeEspera);
const sumadeTTE = tiemposDeEspera.reduce(
  (total, tiempos) => (total += tiempos),
  0
);
const TEP = (sumadeTTE / 5).toFixed(2);
console.log("Tiempo de espera promedio " + TEP);

const TTP = tiempoTotal + 1.2;
console.log("Tiempo total de espera de procecamientos " + TTP);

const PTTP = ((TEP / TTP) * 100).toFixed(2);
console.log("Porcentaje " + PTTP + "%");
const soloProcesos = orden.map((objeto) => objeto.p);

// Impresion resultados

// Obtener el contenedor de los elementos gantt
const contenedorGantt = document.querySelector(".gantt");

// Obtener los elementos con la clase "gantt-bar"
const barrasGantt = Array.from(document.querySelectorAll(".gantt-bar"));
const lineasGantt = Array.from(document.querySelectorAll(".gantt-linea"));
const valoresGantt = Array.from(document.querySelectorAll(".gantt-valores"));

// Variable para realizar un seguimiento del índice del elemento actual
let indiceElemento = 0;

// Funcion para imprimir una pequena explicacion
function explica() {
  if (indiceElemento == 0) {
    document.getElementById("paso-exp").innerHTML = indiceElemento;
    document.getElementById("exp1").innerHTML =
      "Entra " + soloProcesos[indiceElemento];
    document.getElementById("exp2").innerHTML =
      "Llega " +
      procesosAntes[indiceElemento + 1] +
      " en el segundo " +
      segundosLlega[indiceElemento + 1];
    document.getElementById("exp3").innerHTML =
      "Evalua  ¿" +
      soloProcesos[indiceElemento] +
      " es menor que " +
      procesosAntes[indiceElemento + 1] +
      "?";
  }
  if (indiceElemento == 1) {
    document.getElementById("paso-exp").innerHTML = indiceElemento;
    document.getElementById("exp1").innerHTML =
      "Sale " + soloProcesos[indiceElemento - 1];
    document.getElementById("exp2").innerHTML =
      "Entra " + soloProcesos[indiceElemento];
    document.getElementById("exp3").innerHTML =
      "Llega " +
      procesosAntes[indiceElemento + 1] +
      " en el segundo " +
      segundosLlega[indiceElemento + 1];
    document.getElementById("exp4").innerHTML =
      "Evalua  ¿" +
      soloProcesos[indiceElemento] +
      " es menor que " +
      procesosAntes[indiceElemento + 1] +
      "?";
    document.getElementById("exp5").innerHTML =
      "Continua " + soloProcesos[indiceElemento];
  }
  if (indiceElemento == 2) {
    document.getElementById("paso-exp").innerHTML = indiceElemento;
    document.getElementById("exp1").innerHTML =
      "Termina " + soloProcesos[indiceElemento - 1];
    document.getElementById("exp2").innerHTML =
      "Entra " + soloProcesos[indiceElemento];
    document.getElementById("exp3").innerHTML =
      "Termina " + soloProcesos[indiceElemento];
    document.getElementById("exp4").innerHTML = " ";
    document.getElementById("exp5").innerHTML = " ";
  }

  if (indiceElemento == 3) {
    document.getElementById("paso-exp").innerHTML = indiceElemento;
    document.getElementById("exp1").innerHTML =
      "Entra de nuevo " + soloProcesos[indiceElemento - 3];
    document.getElementById("exp2").innerHTML =
      "Llega " +
      procesosAntes[indiceElemento] +
      " en el segundo " +
      segundosLlega[indiceElemento];
    document.getElementById("exp3").innerHTML =
      "Evalua  ¿" +
      soloProcesos[indiceElemento - 3] +
      " es menor que " +
      procesosAntes[indiceElemento] +
      "?";
  }
  if (indiceElemento == 4) {
    document.getElementById("paso-exp").innerHTML = indiceElemento;
    document.getElementById("exp1").innerHTML =
      "Entra " + soloProcesos[indiceElemento];
    document.getElementById("exp2").innerHTML =
      "Termina " + soloProcesos[indiceElemento];
    document.getElementById("exp3").innerHTML = " ";
    document.getElementById("exp4").innerHTML = " ";
    document.getElementById("exp5").innerHTML = " ";
    document.getElementById("exp6").innerHTML = " ";
    document.getElementById("exp7").innerHTML = " ";
  }
  if (indiceElemento == 5) {
    document.getElementById("paso-exp").innerHTML = indiceElemento;
    document.getElementById("exp1").innerHTML =
      "Entra de nuevo " + soloProcesos[indiceElemento - 5];
    document.getElementById("exp2").innerHTML =
      "Llega " +
      procesosAntes[indiceElemento - 1] +
      " en el segundo " +
      segundosLlega[indiceElemento - 1];
    document.getElementById("exp3").innerHTML =
      "Evalua  ¿" +
      soloProcesos[indiceElemento - 2] +
      " es menor que " +
      procesosAntes[indiceElemento - 2] +
      "?";
    document.getElementById("exp4").innerHTML =
      "Continua " + soloProcesos[indiceElemento - 2];
  }
  if (indiceElemento == 6) {
    document.getElementById("paso-exp").innerHTML = indiceElemento;
    document.getElementById("exp1").innerHTML =
      "Entra " + soloProcesos[indiceElemento];
    document.getElementById("exp2").innerHTML =
      "Termina al segundo " + tiempoActual;
    document.getElementById("exp3").innerHTML = "FINALIZA EL ALGORITMO";
    document.getElementById("exp4").innerHTML = " ";
    mostrarOcultarBoton();
  }
}

// Función para mostrar el siguiente elemento
function mostrarSiguienteElemento() {
  if (indiceElemento < barrasGantt.length) {
    const elementoActual = barrasGantt[indiceElemento];
    const elementoActual2 = lineasGantt[indiceElemento];
    const elementoActual3 = valoresGantt[indiceElemento];

    elementoActual.style.display = "block";
    elementoActual2.style.display = "block";
    elementoActual3.style.display = "block";
    elementoActual.backgroundColor = "red";

    if (indiceElemento == 6) {
      document.getElementById("paso").innerHTML = "FIN DE LA SIMULACION";
    } else {
      document.getElementById("paso").innerHTML = indiceElemento;
    }

    //imprime explicacion
    explica();

    indiceElemento++;
  } else {
    alert(
      "FIN. PRESIONE EN EL BOTON MOSTRAR RESULTADOS. LUEGO PRESIONE EN EL BOTON =REINICIAR= QUE SE ENCUENTRA AL FINAL PARA REPETIR."
    );
    botonActualizar.disabled = true;
  }
  switch (indiceElemento) {
    case 0:
      document.getElementById("P1").innerHTML = soloProcesos[indiceElemento];
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

// Boton finalizar
function mostrarOcultarBoton() {
  var botonOculto = document.getElementById("botonOculto");

  if (botonOculto.style.display === "none") {
    botonOculto.style.display = "block";
  } else {
    botonOculto.style.display = "none";
  }
}

// Boton Reiniciar
function mostrarOcultarBotonReiniciar() {
  var botonOculto2 = document.getElementById("boton-reiniciar");

  if (botonOculto2.style.display === "none") {
    botonOculto2.style.display = "block";
  } else {
    botonOculto2.style.display = "none";
  }

  calculos();
}

// Funcion para boton reiniciar
function recargarPagina() {
  location.reload();
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Desplazamiento suave
  });
}

// Impresion final de los calculos a HTML
function calculos() {
  document.getElementById("t-1").innerHTML += ` ${tiemposDeEspera[3]}`;
  document.getElementById("t-2").innerHTML += ` ${tiemposDeEspera[2]}`;
  document.getElementById("t-3").innerHTML += ` ${tiemposDeEspera[1]}`;
  document.getElementById("t-4").innerHTML += ` ${tiemposDeEspera[0]}`;
  document.getElementById("t-5").innerHTML += ` ${tiemposDeEspera[4]}`;
  document.getElementById("TEP").innerHTML += " 13.8 / 5 = " + ` ${TEP}`;
  document.getElementById("TTP").innerHTML += ` ${tiemposDeEspera[3]}` + " + "+ ` ${tiemposDeEspera[2]}` + "+" + ` ${tiemposDeEspera[1]}` + " + "+ ` ${tiemposDeEspera[0]}` + "+" + ` ${tiemposDeEspera[4]}`+ " + 1.2 (6 cambios de contexto de 0.2) =" + ` ${TTP}`;
  document.getElementById("PTTP").innerHTML += ` ${TEP}` + " / " + ` ${TTP}` + " * 100 = " + ` ${PTTP}% `;
  botonOculto.disabled = true;
}
